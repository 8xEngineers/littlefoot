// Function to toggle between color and black & white
function toggleBW(): void {
    document.body.classList.toggle('bw-mode');

    // Save user preference to localStorage
    if (document.body.classList.contains('bw-mode')) {
        localStorage.setItem('theme', 'bw');
    } else {
        localStorage.removeItem('theme');
    }
}

// Function to set the theme based on user preference
function setBWTheme(): void {
    if (localStorage.getItem('theme') === 'bw') {
        document.body.classList.add('bw-mode');
    }
}

// Call the setBWTheme function on page load
setBWTheme();

// Create and add the toggle button to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton: HTMLButtonElement = document.createElement('button');
    toggleButton.id = 'bw-toggle';
    toggleButton.textContent = 'Toggle Black & White';
    document.body.insertBefore(toggleButton, document.body.firstChild); // Insert button at the top of the body

    toggleButton.addEventListener('click', toggleBW);
});
