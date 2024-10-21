// bw-toggle.ts

// Function to toggle black & white mode for footnotes only
function toggleFootnoteBW(): void {
    const footnotes = document.querySelectorAll('.tinyfoot-footnote');

    footnotes.forEach((footnote) => {
        footnote.classList.toggle('bw-mode'); // Toggle bw-mode class on footnotes
    });
}

// Function to set the initial state of the footnote theme based on user preference
function setFootnoteBWTheme(): void {
    if (localStorage.getItem('footnoteTheme') === 'bw') {
        const footnotes = document.querySelectorAll('.tinyfoot-footnote');
        footnotes.forEach((footnote) => {
            footnote.classList.add('bw-mode'); // Add bw-mode class to footnotes
        });
    }
}

// Call the setFootnoteBWTheme function on page load
setFootnoteBWTheme();

// Create and add the toggle button to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton: HTMLButtonElement = document.createElement('button');
    toggleButton.id = 'bw-toggle';
    toggleButton.textContent = 'Toggle Footnote Black & White';
    document.body.insertBefore(toggleButton, document.body.firstChild); // Insert button at the top of the body

    toggleButton.addEventListener('click', () => {
        toggleFootnoteBW();
        const isBWMode = Array.from(document.querySelectorAll('.tinyfoot-footnote')).some(footnote => footnote.classList.contains('bw-mode'));

        // Save user preference to localStorage
        if (isBWMode) {
            localStorage.setItem('footnoteTheme', 'bw');
        } else {
            localStorage.removeItem('footnoteTheme');
        }
    });
});
