document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbersContainer = document.getElementById('line-numbers-container');
    const lineNumbersDiv = document.querySelector('.line-numbers'); // Renamed for clarity
    const collapseButton = document.getElementById('collapse-output');
    const outputAreaContainer = document.getElementById('output-area-container');
    const outputTextArea = document.getElementById('output-area');
    const clearButton = document.querySelector('.clear-button');
    const runButton = document.querySelector('.run-button'); // Get run button if needed later

    const LINE_HEIGHT = parseFloat(getComputedStyle(codeEditor).lineHeight); // Get line height

    const updateLineNumbers = () => {
        const lines = codeEditor.value.split('\n');
        const lineCount = lines.length || 1; // Ensure at least 1 line number

        let lineNumbersHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            // Use span for better styling control if needed later
            lineNumbersHTML += `<span class="line-number">${i}</span>`;
        }
        lineNumbersContainer.innerHTML = lineNumbersHTML;

        // Adjust line numbers container height dynamically (optional but good)
        // lineNumbersDiv.style.height = `${codeEditor.scrollHeight}px`;
    };

    // Sync scrolling
    codeEditor.addEventListener('scroll', () => {
        lineNumbersDiv.scrollTop = codeEditor.scrollTop;
    });

    // Update line numbers on input
    codeEditor.addEventListener('input', updateLineNumbers);

    // --- Collapse/Expand Logic ---
    let isCollapsed = false;
    const compressIconSrc = 'icons/compress.png'; // Path to your compress icon
    const expandIconSrc = 'icons/expand.png';     // Path to your expand icon

    const updateCollapseButton = () => {
        if (isCollapsed) {
            collapseButton.innerHTML = `<img src="${expandIconSrc}" alt="Expand">`;
            collapseButton.title = "Expand Output";
        } else {
            collapseButton.innerHTML = `<img src="${compressIconSrc}" alt="Collapse">`;
            collapseButton.title = "Collapse Output";
        }
    };

    collapseButton.addEventListener('click', () => {
        isCollapsed = !isCollapsed; // Toggle the state
        if (isCollapsed) {
            outputAreaContainer.classList.add('collapsed');
            // Hide the textarea itself for better performance/visuals
            outputTextArea.style.display = 'none';
            collapseButton.style.position = 'relative'; // Change position when collapsed
            collapseButton.style.top = 'auto';
            collapseButton.style.left = 'auto';
             // Optional: Move button to be visible if container is truly 0px
            outputAreaContainer.parentNode.insertBefore(collapseButton, outputAreaContainer.nextSibling); // Move button outside briefly if needed


        } else {
            outputAreaContainer.classList.remove('collapsed');
            outputTextArea.style.display = 'block'; // Restore textarea display
            // Move button back inside
            outputAreaContainer.insertBefore(collapseButton, outputAreaContainer.firstChild);
            collapseButton.style.position = 'absolute'; // Restore absolute position
            collapseButton.style.top = '10px';
            collapseButton.style.left = '10px';
        }
        updateCollapseButton(); // Update the button image/icon
    });

    // --- Tab Key Handling ---
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault(); // Prevent default tab behavior (focus change)

            const start = this.selectionStart;
            const end = this.selectionEnd;
            const text = this.value;
            const tab = "\t"; // Or use spaces: "    "

            // Insert tab character (or spaces)
            this.value = text.substring(0, start) + tab + text.substring(end);

            // Move cursor position
            this.selectionStart = this.selectionEnd = start + tab.length;

            // Update line numbers as content changed
            updateLineNumbers();
            // Trigger scroll sync manually if needed after programmatic change
            lineNumbersDiv.scrollTop = this.scrollTop;
        }
    });

    // --- Clear Button Logic ---
    clearButton.addEventListener('click', () => {
        outputTextArea.value = ''; // Clear the output textarea
    });

    // --- Initial Setup ---
    updateLineNumbers();
    updateCollapseButton(); // Set initial collapse button state/icon
     // Set initial placeholder in code editor properly with newlines
    codeEditor.value = `; Online MASM compiler...

.MODEL SMALL
.STACK 100h

.CODE
MAIN PROC
    ; Your code here
    MOV AH, 4Ch ; Exit program
    INT 21h
MAIN ENDP
END MAIN`;
    updateLineNumbers(); // Update line numbers after setting initial code

});
