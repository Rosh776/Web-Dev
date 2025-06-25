// App State
const state = {
    currentView: 'home',
    currentCategory: '',
    currentImageIndex: 0,
    images: {
        macro: Array(9).fill().map((_, i) => `https://picsum.photos/id/30${i}/600/600`),
        nature: Array(9).fill().map((_, i) => `https://picsum.photos/id/2${i}/600/600`),
        animals: Array(9).fill().map((_, i) => `https://picsum.photos/id/23${i}/600/600`),
        vehicles: Array(9).fill().map((_, i) => `https://picsum.photos/id/107${i}/600/600`),
        portrait: Array(9).fill().map((_, i) => `https://picsum.photos/id/100${i}/600/600`),
        sunset: Array(9).fill().map((_, i) => `https://picsum.photos/id/1${i}/600/600`),
        ocean: Array(9).fill().map((_, i) => `https://picsum.photos/id/101${i}/600/600`),
        urban: Array(9).fill().map((_, i) => `https://picsum.photos/id/102${i}/600/600`),
        wildlife: Array(9).fill().map((_, i) => `https://picsum.photos/id/10${i}/600/600`),
        random: Array(9).fill().map((_, i) => `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/600/600`)
    },
    captions: {
        macro: ["Close-up of dewdrops", "Insect on a leaf", "Flower petal texture", "Eye of a fly", "Water droplets", "Sand grains", "Snow crystals", "Leaf veins", "Spider web"],
        nature: ["Mountain landscape", "Forest path", "Waterfall", "Autumn trees", "Desert dunes", "Misty valley", "Rock formation", "Bamboo forest", "Frozen lake"],
        animals: ["Sleeping puppy", "Curious cat", "Elephant herd", "Flying eagle", "Swimming turtle", "Running deer", "Resting lion", "Colorful parrot", "Playful dolphins"],
        vehicles: ["Vintage car", "Modern sports car", "Classic motorcycle", "Sailboat at sea", "City bus", "Mountain bike", "Aerial drone", "Train crossing", "Hot air balloon"],
        portrait: ["Smiling woman", "Thoughtful man", "Laughing child", "Elderly couple", "Artist at work", "Musician playing", "Dancer in motion", "Chef cooking", "Athlete running"],
        sunset: ["Beach sunset", "Mountain sunset", "Desert sunset", "Ocean horizon", "City skyline", "Lake reflection", "Palm tree silhouette", "Fields at dusk", "Cloudy sky"],
        ocean: ["Waves crashing", "Coral reef", "Sandy beach", "Cliffside ocean", "Boat on water", "Underwater scene", "Lighthouse view", "Tropical island", "Whale breaching"],
        urban: ["City street", "Skyscrapers", "Neon signs", "Subway station", "Bridge at night", "Market scene", "Park fountain", "Historic building", "Rooftop view"],
        wildlife: ["Bear fishing", "Wolf pack", "Tiger resting", "Giraffes eating", "Penguins huddling", "Kangaroo jumping", "Zebra herd", "Panda eating", "Peacock displaying"],
        random: ["Surprise image 1", "Surprise image 2", "Surprise image 3", "Surprise image 4", "Surprise image 5", "Surprise image 6", "Surprise image 7", "Surprise image 8", "Surprise image 9"]
    },
    themes: [
        { name: 'dark', bgColor: '#121212', textColor: '#f5f5f5', headerBg: '#1e1e1e' },
        { name: 'light', bgColor: '#fafafa', textColor: '#333', headerBg: '#ffffff' },
        { name: 'gradient', bgColor: 'linear-gradient(-45deg, #121212, #1a1a2e, #16213e, #0f3460)', textColor: '#f5f5f5', headerBg: 'rgba(30, 30, 30, 0.8)' }
    ],
    currentTheme: 0,
    lastScrollPosition: 0,
    scrollingDown: false,
    chatMessages: [
        { sender: 'bot', text: 'Hello! I\'m ShutR Assistant. How can I help you with your photography needs today?' }
    ],
    notificationItems: [
        "New camera technology announced at Photokina",
        "Nikon releases firmware update for Z series",
        "Upcoming photography workshop in your area",
        "Canon announces new mirrorless lineup",
        "Photography contest submissions now open"
    ]
};

// DOM Elements
const homeView = document.getElementById('homeView');
const galleryView = document.getElementById('galleryView');
const galleryContainer = document.getElementById('galleryContainer');
const galleryTitle = document.getElementById('galleryTitle');
const imageViewer = document.getElementById('imageViewer');
const viewerImage = document.querySelector('.viewer-image');
const imageCaption = document.getElementById('imageCaption');
const profilePicture = document.getElementById('profilePicture');
const homeButton = document.getElementById('homeButton');
const backButton = document.querySelector('.back-button');
const closeViewer = document.querySelector('.close-viewer');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const themeToggle = document.getElementById('themeToggle');
const categoryCards = document.querySelectorAll('.category-card');
const header = document.querySelector('header');
const bgMusic = document.getElementById('bgMusic');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchError = document.getElementById('searchError');
const searchFeedback = document.getElementById('searchFeedback');
const navHome = document.getElementById('navHome');
const navExplore = document.getElementById('navExplore');
const navChat = document.getElementById('navChat');
const navNotifications = document.getElementById('navNotifications');
const navProfile = document.getElementById('navProfile');
const notificationsDropdown = document.getElementById('notificationsDropdown');
const userIp = document.getElementById('userIp');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotClose = document.querySelector('.chatbot-close');
const animatedBg = document.getElementById('animatedBg');
const particlesContainer = document.getElementById('particles');

// Initialize the app
function init() {
    // Event listeners
    profilePicture.addEventListener('click', redirectToProfile);
    homeButton.addEventListener('click', redirectToMainLanding);
    backButton.addEventListener('click', showHomeView);
    closeViewer.addEventListener('click', closeImageViewer);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);
    themeToggle.addEventListener('click', toggleTheme);
    searchButton.addEventListener('click', handleSearch);
    
    // Navigation icons
    navHome.addEventListener('click', redirectToMainLanding);
    navExplore.addEventListener('click', redirectToRandomPhotos);
    navChat.addEventListener('click', toggleChatbot);
    navNotifications.addEventListener('click', toggleNotifications);
    navProfile.addEventListener('click', redirectToProfile);
    
    // Chatbot events
    chatbotSend.addEventListener('click', sendChatMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    chatbotClose.addEventListener('click', toggleChatbot);
    
    // Search input events
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    searchInput.addEventListener('input', (e) => {
        if (searchInput.value.trim() !== '') {
            searchFeedback.textContent = `Searching for: ${searchInput.value}`;
        } else {
            searchFeedback.textContent = '';
        }
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() !== '') {
            searchFeedback.textContent = `Searching for: ${searchInput.value}`;
        }
    });
    
    searchInput.addEventListener('blur', () => {
        searchFeedback.textContent = '';
    });
    
    // Category card clicks
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.dataset.link;
            window.location.href = link;
        });
    });
    
    // Apply initial theme
    applyTheme();
    
    // Start background music
    playBackgroundMusic();
    
    // Set up scroll handler for header
    window.addEventListener('scroll', handleScroll);
    
    // Generate random IP for demo purposes
    generateRandomIp();
    
    // Load initial chat messages
    renderChatMessages();
    
    // Create particles
    createParticles();
}

// Navigation functions
function redirectToMainLanding(e) {
    e.preventDefault();
    window.location.href = "https://rosh776.github.io/Main-Landing/";
}

function redirectToRandomPhotos(e) {
    e.preventDefault();
    window.location.href = "https://picsum.photos/";
}

function redirectToProfile(e) {
    e.preventDefault();
    window.location.href = "https://rosh776.github.io/Web-Profile/";
}

function toggleChatbot(e) {
    e.preventDefault();
    if (chatbotContainer.classList.contains('active')) {
        chatbotContainer.classList.remove('active');
        setTimeout(() => {
            chatbotContainer.style.display = 'none';
        }, 300);
    } else {
        chatbotContainer.style.display = 'flex';
        setTimeout(() => {
            chatbotContainer.classList.add('active');
            // Auto-scroll to bottom of chat
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 10);
    }
}

function toggleNotifications(e) {
    e.preventDefault();
    if (notificationsDropdown.classList.contains('active')) {
        notificationsDropdown.classList.remove('active');
        setTimeout(() => {
            notificationsDropdown.style.display = 'none';
        }, 300);
    } else {
        notificationsDropdown.style.display = 'block';
        setTimeout(() => {
            notificationsDropdown.classList.add('active');
        }, 10);
    }
}

// Chatbot functions
function sendChatMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        state.chatMessages.push({ sender: 'user', text: message });
        chatbotInput.value = '';
        
        // Add bot response
        const botResponse = getBotResponse(message);
        setTimeout(() => {
            state.chatMessages.push({ sender: 'bot', text: botResponse });
            renderChatMessages();
        }, 1000);
        
        renderChatMessages();
    }
}

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        return "Hello there! How can I assist you with your photography journey today?";
    } else if (lowerMsg.includes('camera') || lowerMsg.includes('equipment')) {
        return "For camera recommendations, I'd suggest considering your budget and photography style. DSLRs are great for beginners, while mirrorless cameras offer portability.";
    } else if (lowerMsg.includes('edit') || lowerMsg.includes('photoshop')) {
        return "For photo editing, Adobe Lightroom is excellent for beginners, while Photoshop offers more advanced tools. Free alternatives include GIMP and Darktable.";
    } else if (lowerMsg.includes('tips') || lowerMsg.includes('advice')) {
        return "Here's a quick tip: Always pay attention to lighting. The golden hour (just after sunrise or before sunset) provides the most flattering natural light for photography.";
    } else if (lowerMsg.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else {
        return "I'm still learning about photography. Could you ask me something more specific about cameras, techniques, or editing?";
    }
}

function renderChatMessages() {
    chatbotMessages.innerHTML = '';
    state.chatMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender}-message`;
        messageDiv.textContent = msg.text;
        chatbotMessages.appendChild(messageDiv);
    });
    // Auto-scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Generate random IP for demo
function generateRandomIp() {
    const ipParts = Array(4).fill().map(() => Math.floor(Math.random() * 255));
    userIp.textContent = ipParts.join('.');
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    searchError.style.display = 'none';
    
    if (!searchTerm) {
        showHomeView();
        return;
    }
    
    // Create a temporary container for search results
    galleryContainer.innerHTML = '';
    
    // Search through all images in all categories
    let hasResults = false;
    
    Object.keys(state.images).forEach(category => {
        state.images[category].forEach((imgSrc, index) => {
            const caption = state.captions[category][index].toLowerCase();
            if (caption.includes(searchTerm)) {
                hasResults = true;
                const imgContainer = document.createElement('div');
                imgContainer.className = 'gallery-item';
                imgContainer.innerHTML = `
                    <img src="${imgSrc}" class="gallery-image" alt="${caption}">
                    <div class="pin-overlay">
                        <div class="pin-info">
                            <div class="pin-title">${state.captions[category][index]}</div>
                            <div class="pin-user">From: ${category}</div>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(imgContainer);
            }
        });
    });
    
    if (hasResults) {
        galleryTitle.textContent = `Search: ${searchTerm}`;
        homeView.style.display = 'none';
        galleryView.style.display = 'block';
    } else {
        searchError.textContent = `"${searchTerm}" not found. Try another search term.`;
        searchError.style.display = 'block';
    }
}

// View management
function showHomeView() {
    homeView.style.display = 'block';
    galleryView.style.display = 'none';
    state.currentView = 'home';
}

function showGalleryView(category) {
    galleryContainer.innerHTML = '';
    state.currentCategory = category;
    galleryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    
    state.images[category].forEach((imgSrc, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        imgContainer.innerHTML = `
            <img src="${imgSrc}" class="gallery-image" alt="${state.captions[category][index]}">
            <div class="pin-overlay">
                <div class="pin-info">
                    <div class="pin-title">${state.captions[category][index]}</div>
                    <div class="pin-user">From: ${category}</div>
                </div>
            </div>
        `;
        
        imgContainer.addEventListener('click', () => {
            state.currentImageIndex = index;
            showImageViewer();
        });
        
        galleryContainer.appendChild(imgContainer);
    });
    
    homeView.style.display = 'none';
    galleryView.style.display = 'block';
    state.currentView = 'gallery';
}

// Image viewer functions
function showImageViewer() {
    const category = state.currentCategory;
    const index = state.currentImageIndex;
    
    viewerImage.src = state.images[category][index];
    imageCaption.textContent = state.captions[category][index];
    imageViewer.style.display = 'flex';
    
    // Prevent scrolling when viewer is open
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        imageViewer.classList.add('active');
    }, 10);
}

function closeImageViewer() {
    imageViewer.classList.remove('active');
    setTimeout(() => {
        imageViewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function showPrevImage() {
    const category = state.currentCategory;
    state.currentImageIndex = (state.currentImageIndex - 1 + state.images[category].length) % state.images[category].length;
    viewerImage.src = state.images[category][state.currentImageIndex];
    imageCaption.textContent = state.captions[category][state.currentImageIndex];
}

function showNextImage() {
    const category = state.currentCategory;
    state.currentImageIndex = (state.currentImageIndex + 1) % state.images[category].length;
    viewerImage.src = state.images[category][state.currentImageIndex];
    imageCaption.textContent = state.captions[category][state.currentImageIndex];
}

// Theme management
function toggleTheme() {
    state.currentTheme = (state.currentTheme + 1) % state.themes.length;
    applyTheme();
}

function applyTheme() {
    const theme = state.themes[state.currentTheme];
    
    // Update body styles
    document.body.style.backgroundColor = theme.bgColor;
    document.body.style.color = theme.textColor;
    
    // Update header
    header.style.backgroundColor = theme.headerBg;
    
    // Update search bar
    const searchBar = document.querySelector('.search-bar input');
    if (theme.name === 'light') {
        searchBar.style.backgroundColor = '#efefef';
        searchBar.style.color = '#333';
        header.classList.remove('dark-header');
        header.classList.add('light-header');
    } else {
        searchBar.style.backgroundColor = '#333';
        searchBar.style.color = '#f5f5f5';
        header.classList.remove('light-header');
        header.classList.add('dark-header');
    }
    
    // Toggle animated background
    if (theme.name === 'gradient') {
        animatedBg.classList.add('active');
    } else {
        animatedBg.classList.remove('active');
    }
}

// Background music
function playBackgroundMusic() {
    try {
        bgMusic.volume = 0.2;
        bgMusic.play().catch(e => console.log("Autoplay prevented:", e));
    } catch (e) {
        console.log("Audio error:", e);
    }
}

// Scroll handler for header
function handleScroll() {
    const currentScrollPosition = window.pageYOffset;
    
    if (currentScrollPosition > state.lastScrollPosition && currentScrollPosition > 100) {
        if (!state.scrollingDown) {
            header.style.transform = 'translateY(-100%)';
            state.scrollingDown = true;
        }
    } else {
        if (state.scrollingDown) {
            header.style.transform = 'translateY(0)';
            state.scrollingDown = false;
        }
    }
    
    state.lastScrollPosition = currentScrollPosition;
}

// Create particles animation
function createParticles() {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('#navNotifications') && notificationsDropdown.style.display === 'block') {
        notificationsDropdown.classList.remove('active');
        setTimeout(() => {
            notificationsDropdown.style.display = 'none';
        }, 300);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (imageViewer.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeImageViewer();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});
