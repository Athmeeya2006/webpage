// Load handler - Hide loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-screen');
    if (loader) {
        loader.style.opacity = 0;
        loader.style.visibility = 'hidden';
    }
});

// Theme Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });

        // Load Saved Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        } else {
            document.body.classList.add('light-theme');
        }
    }
    
    // Custom cursor (define elements before using them)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    if (cursorDot && cursorCircle) {
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.pageX}px`;
            cursorDot.style.top = `${e.pageY}px`;
            cursorCircle.style.left = `${e.pageX}px`;
            cursorCircle.style.top = `${e.pageY}px`;
        });
    }
    
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Initialize AOS for scroll animations if AOS is available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out'
        });
    }

    // Enhanced typing effect with error handling
    const typingText = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingText && cursor) {
        const phrases = ["Web Developer", "AI Enthusiast", "Competitive Programmer", "Speedcuber", "Swimmer"];
        let phraseIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        let typingTimeout;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
                letterIndex--;
                
                if (letterIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typingTimeout = setTimeout(type, 500);
                } else {
                    typingTimeout = setTimeout(type, 100);
                }
            } else {
                typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
                letterIndex++;
                
                if (letterIndex === currentPhrase.length) {
                    isDeleting = true;
                    typingTimeout = setTimeout(type, 300);
                } else {
                    typingTimeout = setTimeout(type, 50);
                }
            }
        }

        // Start the typing effect
        type();
        
        // Make the cursor blink
        setInterval(() => {
            cursor.classList.toggle('blink');
        }, 500);
    } else {
        console.error("Typing elements not found: Make sure you have elements with ID 'typing-text' and class 'cursor'");
    }
});
// Define regex patterns for pronouns, prepositions, and indefinite articles
const pronouns = ['I', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'under', 'over', 'through', 'between'];
const indefiniteArticles = ['a', 'an'];

// Text Analysis function
function analyzeText() {
    const inputText = document.getElementById('input-text').value || '';
    
    // Basic Metrics
    const words = inputText.match(/\b\w+\b/g) || [];  // Tokenize words
    const sentences = inputText.split(/[.!?]+/).filter(Boolean);  // Split sentences
    const paragraphs = inputText.split(/\n+/).filter(Boolean);  // Split paragraphs
    const spaces = inputText.split(' ').length - 1;  // Count spaces
    const symbols = inputText.match(/[^\w\s]/g) || [];  // Special symbols

    // Displaying basic metrics
    document.getElementById('letter-count').textContent = inputText.replace(/\s/g, '').length;
    document.getElementById('word-count').textContent = words.length;
    document.getElementById('sentence-count').textContent = sentences.length;
    document.getElementById('paragraph-count').textContent = paragraphs.length;
    document.getElementById('space-count').textContent = spaces;
    document.getElementById('symbol-count').textContent = symbols.length;

    // Tokenize the text and count pronouns, prepositions, and articles
    const pronounCounts = countSpecificOccurrences(words, pronouns);
    const prepositionCounts = countSpecificOccurrences(words, prepositions);
    const articleCounts = countSpecificOccurrences(words, indefiniteArticles);

    // Display results for pronouns, prepositions, and articles
    displayPronounCounts(pronounCounts);
    displayPrepositionCounts(prepositionCounts);
    displayArticleCounts(articleCounts);
}

// Count occurrences of words from a list in the input text
function countOccurrences(words, list) {
    let count = 0;
    // Normalize the input words to lowercase and compare
    const lowerCaseWords = words.map(word => word.toLowerCase());
    
    list.forEach(item => {
        count += lowerCaseWords.filter(word => word === item.toLowerCase()).length;
    });
    return count;
}

// Count specific occurrences of each word in a list
function countSpecificOccurrences(words, list) {
    const counts = {};
    const lowerCaseWords = words.map(word => word.toLowerCase());

    list.forEach(item => {
        counts[item] = lowerCaseWords.filter(word => word === item.toLowerCase()).length;
    });

    return counts;
}

// Display the counts of each pronoun
function displayPronounCounts(pronounCounts) {
    let pronounText = '';
    Object.keys(pronounCounts).forEach(pronoun => {
        pronounText += `${pronoun}: ${pronounCounts[pronoun]}<br>`;
    });
    document.getElementById('pronoun-count').innerHTML = pronounText || '0';
}

// Display the counts of each preposition
function displayPrepositionCounts(prepositionCounts) {
    let prepositionText = '';
    Object.keys(prepositionCounts).forEach(preposition => {
        prepositionText += `${preposition}: ${prepositionCounts[preposition]}<br>`;
    });
    document.getElementById('preposition-count').innerHTML = prepositionText || '0';
}

// Display the counts of each indefinite article
function displayArticleCounts(articleCounts) {
    let articleText = '';
    Object.keys(articleCounts).forEach(article => {
        articleText += `${article}: ${articleCounts[article]}<br>`;
    });
    document.getElementById('article-count').innerHTML = articleText || '0';
}

// Format the count to display details (Optional, for general usage)
function formatCount(count, list, words) {
    return `${count}`;
}

// Generate Random Stars
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars'); // Add class to container
    document.querySelector('#hero').appendChild(starsContainer); // Append stars container to hero section

    // Number of stars to generate
    const numStars = 150; // Adjust this value for more/less stars

    // Loop to create individual stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random size for stars
        const size = Math.random() * 3 + 1 + 'px'; // Size between 1px and 4px
        star.style.width = size;
        star.style.height = size;

        // Random position for stars
        const x = Math.random() * 100 + '%'; // Random x position (percentage)
        const y = Math.random() * 100 + '%'; // Random y position (percentage)
        star.style.left = x;
        star.style.top = y;

        // Append each star to the stars container
        starsContainer.appendChild(star);
    }
}

// Call function to create stars
createStars();
