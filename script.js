/* ============================================
   MYPLACE&BAR - JavaScript Functionality
   ============================================ */

// ============================================
// GLOBAL STATE
// ============================================
const state = {
    orderItems: [],
    totalPrice: 0,
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initMenuFilters();
    initScrollAnimations();
    initFormHandlers();
    initNewsletterForm();
    initChatbox();
    loadOrderItemsFromStorage();
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// ============================================
// MENU FILTERING
// ============================================
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter menu cards
            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// ORDER MANAGEMENT
// ============================================
function addToOrder(itemName, price) {
    const existingItem = state.orderItems.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.orderItems.push({
            name: itemName,
            price: price,
            quantity: 1,
        });
    }

    updateOrderDisplay();
    saveOrderItemsToStorage();
    showNotification(`${itemName} added to order!`);
}

function removeFromOrder(itemName) {
    state.orderItems = state.orderItems.filter(item => item.name !== itemName);
    updateOrderDisplay();
    saveOrderItemsToStorage();
}

function updateOrderDisplay() {
    const orderItemsContainer = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('totalPrice');

    if (state.orderItems.length === 0) {
        orderItemsContainer.innerHTML =
            '<p style="color: #999; font-size: 14px;">Click + on menu items to add them to your order</p>';
        state.totalPrice = 0;
    } else {
        orderItemsContainer.innerHTML = state.orderItems.map(item => `
            <div class="order-item">
                <div>
                    <strong>${item.name}</strong>
                    <span style="color: #999; margin-left: 10px;">x${item.quantity}</span>
                    <span style="font-weight: bold; color: #8b4513;"> $${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button class="order-item-remove" onclick="removeFromOrder('${item.name}')">✕</button>
            </div>
        `).join('');

        state.totalPrice = state.orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    totalPriceElement.textContent = `$${state.totalPrice.toFixed(2)}`;
}

// ============================================
// ORDER FORM SUBMISSION
// ============================================
function initFormHandlers() {
    const orderForm = document.getElementById('orderForm');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || !email || !phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (state.orderItems.length === 0) {
                showNotification('Please add items to your order', 'error');
                return;
            }

            // Generate WhatsApp message
            const whatsappMessage = generateWhatsAppMessage(name, email, phone, message);

            // Create WhatsApp link with pre-filled message
            const whatsappBusinessPhone = '1234567890'; // Replace with actual WhatsApp Business number
            const whatsappURL = `https://wa.me/${whatsappBusinessPhone}?text=${encodeURIComponent(whatsappMessage)}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Reset form
            orderForm.reset();
            state.orderItems = [];
            updateOrderDisplay();
            saveOrderItemsToStorage();

            showNotification('Order sent via WhatsApp! 🎉');
        });
    }
}

function generateWhatsAppMessage(name, email, phone, specialRequests) {
    let message = `*New Order from MYPLACE&BAR*\n\n`;
    message += `👤 *Name:* ${name}\n`;
    message += `📧 *Email:* ${email}\n`;
    message += `📱 *Phone:* ${phone}\n\n`;

    message += `🍽️ *Order Items:*\n`;
    state.orderItems.forEach(item => {
        message += `  • ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n💰 *Total:* $${state.totalPrice.toFixed(2)}\n`;

    if (specialRequests) {
        message += `\n📝 *Special Requests:*\n${specialRequests}\n`;
    }

    message += `\n---\n✨ Thank you for ordering from MYPLACE&BAR!`;

    return message;
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('newsletter-email').value.trim();
            const messageElement = document.getElementById('newsletterMessage');

            if (!email) {
                messageElement.textContent = 'Please enter an email address';
                messageElement.className = 'newsletter-message error';
                return;
            }

            if (!isValidEmail(email)) {
                messageElement.textContent = 'Please enter a valid email address';
                messageElement.className = 'newsletter-message error';
                return;
            }

            // Save to localStorage (demo only)
            let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
            }

            messageElement.textContent = '✓ Successfully subscribed!';
            messageElement.className = 'newsletter-message success';

            newsletterForm.reset();

            // Clear message after 3 seconds
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.className = 'newsletter-message';
            }, 3000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.menu-card, .testimonial-card, .info-card, .section-header'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    }
}

// ============================================
// UTILITIES
// ============================================
function showNotification(message, type = 'success') {
    // Create and display a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-weight: 500;
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================
function saveOrderItemsToStorage() {
    localStorage.setItem('orderItems', JSON.stringify(state.orderItems));
}

function loadOrderItemsFromStorage() {
    const savedItems = localStorage.getItem('orderItems');
    if (savedItems) {
        state.orderItems = JSON.parse(savedItems);
        updateOrderDisplay();
    }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// ============================================
// ADD SLIDE ANIMATIONS TO CSS
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// LAZY LOADING IMAGES (OPTIONAL)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// AI CHATBOX FUNCTIONALITY
// ============================================
function initChatbox() {
    const chatbox = document.getElementById('chatbox');
    const chatboxToggle = document.getElementById('chatbox-toggle');
    const chatboxClose = document.getElementById('chatbox-close');
    const chatboxInput = document.getElementById('chatbox-input');
    const chatboxSend = document.getElementById('chatbox-send');
    const chatboxMessages = document.getElementById('chatbox-messages');

    // Toggle chatbox
    chatboxToggle.addEventListener('click', () => {
        chatbox.classList.toggle('show');
        chatboxToggle.style.display = chatbox.classList.contains('show') ? 'none' : 'flex';

        if (chatbox.classList.contains('show')) {
            chatboxInput.focus();
            scrollToBottom();
        }
    });

    // Close chatbox
    chatboxClose.addEventListener('click', () => {
        chatbox.classList.remove('show');
        chatboxToggle.style.display = 'flex';
    });

    // Send message on button click
    chatboxSend.addEventListener('click', () => {
        sendMessage();
    });

    // Send message on Enter key
    chatboxInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize input
    chatboxInput.addEventListener('input', () => {
        chatboxInput.style.height = 'auto';
        chatboxInput.style.height = Math.min(chatboxInput.scrollHeight, 100) + 'px';
    });
}

function sendMessage(message = null) {
    const chatboxInput = document.getElementById('chatbox-input');
    const userMessage = message || chatboxInput.value.trim();

    if (!userMessage) return;

    // Add user message
    addMessage(userMessage, 'user');

    // Clear input
    chatboxInput.value = '';
    chatboxInput.style.height = 'auto';

    // Generate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(userMessage.toLowerCase());
        addMessage(botResponse, 'bot');
    }, 500 + Math.random() * 1000); // Random delay for more natural feel
}

function sendSuggestion(suggestion) {
    sendMessage(suggestion);
}

function addMessage(text, type) {
    const chatboxMessages = document.getElementById('chatbox-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;

    const avatar = type === 'bot' ? '🤖' : '👤';

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <span>${avatar}</span>
        </div>
        <div class="message-content">
            <p>${text}</p>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;

    chatboxMessages.appendChild(messageDiv);
    scrollToBottom();
}

function generateBotResponse(userMessage) {
    // Restaurant knowledge base
    const responses = {
        // Greetings
        greeting: [
            "Hello! Welcome to MyPlace&Bar! How can I help you today?",
            "Hi there! Thanks for visiting MyPlace&Bar. What can I assist you with?",
            "Greetings! I'm here to help with any questions about our restaurant. What would you like to know?"
        ],

        // Hours
        hours: [
            "We're open Monday to Thursday from 10 AM to 11 PM, Friday and Saturday from 10 AM to 1 AM, and Sunday from 11 AM to 11 PM.",
            "Our hours are: Mon-Thu: 10AM-11PM, Fri-Sat: 10AM-1AM, Sun: 11AM-11PM. Looking forward to seeing you!",
            "We serve delicious food from 10 AM daily. Last orders are 30 minutes before closing time."
        ],

        // Location
        location: [
            "We're located at 585 Hay Street, Perth WA 6000, Australia. Right in the heart of Perth CBD!",
            "Find us at 585 Hay Street, Perth WA 6000. Easy to access by car, train, or bus. Plenty of parking nearby.",
            "Our address is 585 Hay Street, Perth WA 6000. We're just a short walk from Perth Station."
        ],

        // Menu
        menu: [
            "Our menu celebrates authentic African cuisine with dishes from across the continent! Try our Jollof Rice, Cape Malay Bobotie, or Lamb Tagine. Check out our menu section above!",
            "We offer West African, North African, and South African specialties. Our chef's specials include Jollof Rice with Chicken and Malva Pudding. What's your favorite African dish?",
            "From Nigerian Jollof Rice to Moroccan Tagine and South African Bobotie, our menu showcases the best of African culinary traditions with fresh, authentic ingredients."
        ],

        // Reservations
        reservations: [
            "Yes, we accept reservations! You can call us at +61 455 509 191 or use our online booking system. We recommend booking for weekends.",
            "Reservations are available for parties of any size. For large groups (8+), please call us directly. Walk-ins welcome for smaller groups!",
            "We take reservations up to 30 days in advance. For same-day bookings, call us after 2 PM. We hold tables for 15 minutes."
        ],

        // Contact
        contact: [
            "Reach us at +61 455 509 191 or email info@myplacebar.com.au. We're here to help!",
            "Call +61 455 509 191 for reservations or questions. Email: info@myplacebar.com.au",
            "Our phone number is +61 455 509 191. You can also find us on social media or visit our contact page."
        ],

        // Specials
        specials: [
            "Our current specials include the Chef's Pick Jollof Rice and Cape Rooibos Tea. Check our menu for daily African-inspired specials!",
            "We have great specials on African cuisine and beverages. The Jollof Rice with Chicken is our most popular dish right now.",
            "Try our signature Cape Malay Bobotie or the Moroccan Baklava - both are customer favorites showcasing authentic African flavors!"
        ],

        // Default responses
        default: [
            "That's interesting! Could you tell me more about what you're looking for?",
            "I'm here to help with information about our restaurant, menu, hours, or reservations. What would you like to know?",
            "I'd be happy to help! I can tell you about our menu, hours, location, or help with reservations."
        ]
    };

    // Keywords for response matching
    const keywords = {
        greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
        hours: ['hours', 'open', 'close', 'time', 'when', 'schedule', 'operating'],
        location: ['location', 'address', 'where', 'find', 'directions', 'map', 'perth', 'street'],
        menu: ['menu', 'food', 'eat', 'dish', 'appetizer', 'main', 'drink', 'beverage', 'dessert', 'special', 'african', 'jollof', 'rice', 'boboti', 'tagine', 'malva', 'baklava', 'rooibos', 'hibiscus', 'zobo', 'castle', 'lager'],
        reservations: ['reservation', 'book', 'table', 'party', 'group', 'booking', 'reserve'],
        contact: ['contact', 'phone', 'call', 'email', 'number', 'reach', 'speak'],
        specials: ['special', 'deal', 'offer', 'discount', 'promotion', 'featured', 'popular']
    };

    // Check for keyword matches
    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => userMessage.includes(word))) {
            return getRandomResponse(responses[category]);
        }
    }

    // Check for specific questions
    if (userMessage.includes('?')) {
        if (userMessage.includes('how') || userMessage.includes('what') || userMessage.includes('can')) {
            return getRandomResponse(responses.default);
        }
    }

    // Default response
    return getRandomResponse(responses.greeting);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollToBottom() {
    const chatboxMessages = document.getElementById('chatbox-messages');
    setTimeout(() => {
        chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
    }, 100);
}

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%cWelcome to MYPLACE&BAR! 🍷', 'font-size: 20px; font-weight: bold; color: #8b4513;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'font-size: 14px; color: #d4af37;');
