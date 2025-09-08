// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Tab Switching Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Like Button Functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCountSpan = this.querySelector('.like-count');
            const currentLikes = parseInt(this.getAttribute('data-likes'));
            
            if (this.classList.contains('liked')) {
                // Unlike
                this.classList.remove('liked');
                const newCount = currentLikes - 1;
                this.setAttribute('data-likes', newCount);
                likeCountSpan.textContent = newCount;
            } else {
                // Like
                this.classList.add('liked');
                const newCount = currentLikes + 1;
                this.setAttribute('data-likes', newCount);
                likeCountSpan.textContent = newCount;
            }
        });
    });

    // Book Now Button Functionality
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('h4').textContent;
            const packagePrice = packageCard.querySelector('.package-price').textContent;
            
            alert(`Thank you for your interest in the ${packageName} (${packagePrice})! Sarah will contact you soon to discuss your special day.`);
        });
    });

    // Search Functionality
    const searchButton = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm) {
            alert(`Searching for: "${searchTerm}". This would typically redirect to search results.`);
        }
    });

    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                alert(`Searching for: "${searchTerm}". This would typically redirect to search results.`);
            }
        }
    });

    // Profile and Heart Icon Functionality
    const profileIcon = document.querySelector('.profile-icon');
    const heartIcon = document.querySelector('.heart-icon');
    
    profileIcon.addEventListener('click', function() {
        alert('This would typically open the user profile menu.');
    });
    
    heartIcon.addEventListener('click', function() {
        alert('This would typically show your saved/favorited photographers.');
    });

    // Gallery Image Hover Effects (Enhanced)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Since these are placeholder links, we'll just show a message
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const section = this.getAttribute('href').substring(1);
                alert(`This would navigate to the ${section} section.`);
            }
        });
    });

    // Add Animation on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.review-card, .package-card, .gallery-item');
    animatedElements.forEach(el => observer.observe(el));

    // Add CSS animation keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .review-card, .package-card, .gallery-item {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    console.log('Sarah Miller Photography website loaded successfully!');
});