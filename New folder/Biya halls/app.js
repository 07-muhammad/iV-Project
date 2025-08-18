// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Image gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Review action buttons
    const reviewActions = document.querySelectorAll('.review-action');
    reviewActions.forEach(action => {
        action.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const count = this.querySelector('span');
            
            if (icon.classList.contains('fa-thumbs-up')) {
                // Like button clicked
                const currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
                
                // Add visual feedback
                this.style.color = '#7c8b7a';
                setTimeout(() => {
                    this.style.color = '';
                }, 300);
            } else if (icon.classList.contains('fa-comment')) {
                // Comment button clicked
                alert('Comment functionality would open a comment dialog here.');
            }
        });
    });
    
    // Book Now buttons
    const bookButtons = document.querySelectorAll('[data-testid^="button-book"]');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-testid').replace('button-book-', '');
            alert(`Booking ${packageName.charAt(0).toUpperCase() + packageName.slice(1)} package! This would redirect to a booking form.`);
        });
    });
    
    // Contact and Share buttons
    const contactBtn = document.querySelector('[data-testid="button-contact"]');
    const shareBtn = document.querySelector('[data-testid="button-share"]');
    const floatingBtn = document.querySelector('[data-testid="button-floating-book-now"]');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Contact form would open here with phone number, email, and contact form.');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Elegant Events - Wedding Decoration',
                    text: 'Check out Elegant Events for amazing wedding decorations!',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    alert('Website URL copied to clipboard!');
                });
            }
        });
    }
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            alert('Quick booking form would open here!');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('[data-testid="input-search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: "${searchTerm}". This would redirect to search results.`);
                }
            }
        });
    }
    
    // View All Reviews button
    const viewAllBtn = document.querySelector('[data-testid="button-view-all-reviews"]');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Switch to reviews tab
            const reviewsTab = document.querySelector('[data-tab="reviews"]');
            if (reviewsTab) {
                reviewsTab.click();
            }
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Floating button animation on scroll
    let lastScrollTop = 0;
    const floatingButton = document.querySelector('.floating-cta');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            floatingButton.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up or at top
            floatingButton.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading states for buttons
    function addLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }
    
    // Apply loading states to action buttons
    document.querySelectorAll('.btn-primary, .btn-package').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                addLoadingState(this);
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.package-card, .review-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const header = document.querySelector('.header-content');
        const nav = document.querySelector('.nav');
        
        if (window.innerWidth <= 768) {
            // Mobile menu logic would go here
            console.log('Mobile view detected');
        }
    };
    
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
});

// Utility functions
const utilis = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Show toast notifications
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
};

// Export utils for global use
window.utils = utils;// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab + '-content');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Image gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Review action buttons
    const reviewActions = document.querySelectorAll('.review-action');
    reviewActions.forEach(action => {
        action.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const count = this.querySelector('span');
            
            if (icon.classList.contains('fa-thumbs-up')) {
                // Like button clicked
                const currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
                
                // Add visual feedback
                this.style.color = '#7c8b7a';
                setTimeout(() => {
                    this.style.color = '';
                }, 300);
            } else if (icon.classList.contains('fa-comment')) {
                // Comment button clicked
                alert('Comment functionality would open a comment dialog here.');
            }
        });
    });
    
    // Book Now buttons
    const bookButtons = document.querySelectorAll('[data-testid^="button-book"]');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageName = this.getAttribute('data-testid').replace('button-book-', '');
            alert(`Booking ${packageName.charAt(0).toUpperCase() + packageName.slice(1)} package! This would redirect to a booking form.`);
        });
    });
    
    // Contact and Share buttons
    const contactBtn = document.querySelector('[data-testid="button-contact"]');
    const shareBtn = document.querySelector('[data-testid="button-share"]');
    const floatingBtn = document.querySelector('[data-testid="button-floating-book-now"]');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            alert('Contact form would open here with phone number, email, and contact form.');
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'Elegant Events - Wedding Decoration',
                    text: 'Check out Elegant Events for amazing wedding decorations!',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    alert('Website URL copied to clipboard!');
                });
            }
        });
    }
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            alert('Quick booking form would open here!');
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('[data-testid="input-search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    alert(`Searching for: "${searchTerm}". This would redirect to search results.`);
                }
            }
        });
    }
    
    // View All Reviews button
    const viewAllBtn = document.querySelector('[data-testid="button-view-all-reviews"]');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Switch to reviews tab
            const reviewsTab = document.querySelector('[data-tab="reviews"]');
            if (reviewsTab) {
                reviewsTab.click();
            }
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Floating button animation on scroll
    let lastScrollTop = 0;
    const floatingButton = document.querySelector('.floating-cta');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            floatingButton.style.transform = 'translateY(100px)';
        } else {
            // Scrolling up or at top
            floatingButton.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading states for buttons
    function addLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1500);
    }
    
    // Apply loading states to action buttons
    document.querySelectorAll('.btn-primary, .btn-package').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                addLoadingState(this);
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.package-card, .review-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const header = document.querySelector('.header-content');
        const nav = document.querySelector('.nav');
        
        if (window.innerWidth <= 768) {
            // Mobile menu logic would go here
            console.log('Mobile view detected');
        }
    };
    
    window.addEventListener('resize', createMobileMenu);
    createMobileMenu();
});

// Utility functions
const utils = {
    // Format numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Debounce function for search
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Show toast notifications
    showToast: (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
};

// Export utils for global use
window.utils = utils;