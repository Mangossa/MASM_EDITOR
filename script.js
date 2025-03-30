document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbersContainer = document.getElementById('line-numbers-container');
    const lineNumbers = document.querySelector('.line-numbers'); // Select the line numbers container

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

    // Initial update when the page loads
    updateLineNumbers();
});
