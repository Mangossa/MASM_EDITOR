document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbersContainer = document.getElementById('line-numbers-container');
    const lineNumbers = document.querySelector('.line-numbers');
    const collapseButton = document.getElementById('collapse-output'); // Get collapse button
    const outputAreaContainer = document.getElementById('output-area-container'); // Get output container

    const updateLineNumbers = () => {
        const code = codeEditor.value;
        const lines = code.split('\n');

        let lineNumbersHTML = '';
        // Ensure at least one line number exists, even if code is empty
        if (lines.length === 0) {
            lineNumbersHTML = `<div class="line-number">${String(1).padStart(4, ' ')}</div>`;
        } else {
            for (let i = 1; i <= lines.length; i++) {
                const lineNumber = String(i).padStart(4, ' ');
                lineNumbersHTML += `<div class="line-number">${lineNumber}</div>`;
            }
        }
        lineNumbersContainer.innerHTML = lineNumbersHTML;
    };

    codeEditor.addEventListener('input', updateLineNumbers);

    // Synchronize the scrolling of the textarea and the line numbers
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Collapse/Expand output area
    let isCollapsed = false; // Track collapse state

    const updateCollapseButton = () => {
        collapseButton.innerHTML = isCollapsed ? '<i class="fas fa-expand"></i>' : '<i class="fas fa-compress"></i>';
    };

    collapseButton.addEventListener('click', () => {
        isCollapsed = !isCollapsed; // Toggle the state
        if (isCollapsed) {
            outputAreaContainer.style.flex = "0"; // Collapse

        } else {
            outputAreaContainer.style.flex = "1"; // Expand

        }
        updateCollapseButton();
    });

    // Handle Tab key in textarea
    codeEditor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') { // Use e.key instead of e.keyCode
            e.preventDefault(); // Prevent default tab behavior

            const start = this.selectionStart;
            const end = this.selectionEnd;

            // Insert tab character
            this.value = this.value.substring(0, start) +
                "\t" +
                this.value.substring(end);

            // Move cursor to the right spot
            this.selectionStart =
                this.selectionEnd = start + 1;

            updateLineNumbers(); // Update line numbers after tab insertion
        }
    });

    // Initial update when the page loads
    updateLineNumbers();
    updateCollapseButton()
});
