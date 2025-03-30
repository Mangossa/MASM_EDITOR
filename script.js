document.addEventListener('DOMContentLoaded', () => {
    const codeEditor = document.getElementById('code-editor');
    const lineNumbersContainer = document.getElementById('line-numbers-container');

    const updateLineNumbers = () => {
        const code = codeEditor.value;
        const lines = code.split('\n'); // Split code into lines

        let lineNumbersHTML = '';  // Use HTML to preserve line breaks
        for (let i = 1; i <= lines.length; i++) {
            const lineNumber = String(i).padStart(3, ' ');
            lineNumbersHTML += `<div class="line-number">${lineNumber}</div>`; // Add div for each line
        }

        lineNumbersContainer.innerHTML = lineNumbersHTML; // Use innerHTML
    };

    codeEditor.addEventListener('input', updateLineNumbers); // Listen for input

    // Initial update when the page loads
    updateLineNumbers();

     // Trigger a manual resize event to ensure proper initial synchronization
    window.dispatchEvent(new Event('resize'));
});
