// Function to update the favicon based on the current theme
function favicon() {
    const favicon = document.getElementById('favicon');
    const darkmode = window.matchMedia('(prefers-color-scheme: dark)');

    // Check if dark mode is enabled
    if (darkmode.matches) {
        // Set the dark mode favicon
        favicon.setAttribute('href', '../img/favicon-darkmode.png');
    } else {
        // Set the light mode favicon
        favicon.setAttribute('href', '../img/favicon-lightlight.png');
    }
}

// Call the function to set the initial favicon
favicon();

// Add a listener to update the favicon if the theme preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', favicon);
