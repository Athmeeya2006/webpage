// track.js

// Function to determine the type of object
function getObjectType(element) {
    if (element.tagName === 'IMG') return 'image';
    if (element.tagName === 'P') return 'text';
    if (element.tagName === 'A' && element.href.endsWith('.pdf')) return 'CV link';
    if (element.tagName === 'SELECT' || element.tagName === 'OPTION') return 'drop-down';
    if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') return 'heading';
    if (element.tagName === 'DIV') return 'container';
    return element.tagName.toLowerCase();
}

// Function to log events
function logEvent(type, element) {
    const timestamp = new Date().toLocaleString();
    const objectType = getObjectType(element);
    console.log(`${timestamp} , ${type} , ${objectType}`);
}

// Log page view once when the page loads
window.addEventListener('DOMContentLoaded', () => {
    logEvent('view', document.body);
});

// Log all click events
document.addEventListener('click', (e) => {
    logEvent('click', e.target);
});
