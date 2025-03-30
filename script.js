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
        for (let i = 1; i <= lines.length; i++) {
            const lineNumber = String(i).padStart(4, ' ');
            lineNumbersHTML += `<div class="line-number">${lineNumber}</div>`;
        }

        lineNumbersContainer.innerHTML = lineNumbersHTML;
    };

    codeEditor.addEventListener('input', updateLineNumbers);

    // Synchronize the scrolling of the textarea and the line numbers
    codeEditor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeEditor.scrollTop;
    });

    // Collapse/Expand output area
    collapseButton.addEventListener('click', () => {
        if (outputAreaContainer.style.flex === "0") {
            outputAreaContainer.style.flex = "1"; // Expand
            collapseButton.textContent = "Collapse";
        } else {
            outputAreaContainer.style.flex = "0"; // Collapse
            collapseButton.textContent = "Expand";
        }
    });

    // Initial update when the page loads
    updateLineNumbers();
});
