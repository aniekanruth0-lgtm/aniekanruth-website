# 🍷 MyPlace&Bar - Modern Restaurant Website - Perth, Australia

Welcome to your professional restaurant website! This is a fully responsive, modern web application built with vanilla HTML, CSS, and JavaScript.

---

## 📋 Project Overview

**MyPlace&Bar** is a sophisticated restaurant website in Perth, Australia featuring:

✅ **AI Chatbox** - Intelligent chatbot for customer inquiries  
✅ **AI Chatbox** - Intelligent chatbot for customer inquiries  
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Modern Hero Section** - Eye-catching welcome with background animation  
✅ **Product Gallery** - 12 menu items with filtering (Appetizers, Mains, Drinks, Desserts)  
✅ **Customer Testimonials** - 6 authentic reviews with ratings  
✅ **Interactive Order Form** - Add items and submit orders via WhatsApp  
✅ **Newsletter Signup** - Email subscription with localStorage integration  
✅ **Smooth Animations** - Scroll-triggered animations using Intersection Observer  
✅ **Mobile Menu** - Hamburger navigation for mobile devices  
✅ **Professional Styling** - Modern color scheme with gold & brown accents  
✅ **No Dependencies** - Pure vanilla JavaScript (no frameworks required)

---

## 📁 Project Structure

```
MYPLACE&BAR WEBSITE/
├── index.html              # Main HTML file (semantic structure)
├── css/
│   └── style.css          # All styling (CSS variables, flexbox, grid, animations)
├── js/
│   └── script.js          # All JavaScript functionality (700+ lines)
├── images/                # Directory for local images (uses external URLs by default)
└── README.md              # This file
```

---

## 🚀 Quick Start Guide

### 1. **Open the Website**
   - Double-click `index.html` to open in your default browser
   - Or right-click → "Open with" → Select your browser
   - Recommended: Chrome, Firefox, Safari, or Edge for best performance

### 2. **Test Features**
   - **Navigation**: Click menu items in header to smooth scroll to sections
   - **Menu Filters**: Click filter buttons to filter by category
   - **Add to Order**: Click the `+` button on menu items to add them
   - **Order Form**: Fill in name, email, phone, and click "Send Order via WhatsApp"
   - **Newsletter**: Enter email in footer newsletter section
   - **AI Chatbox**: Click the floating chat button (bottom-right) and ask questions
   - **Mobile**: Resize browser window or test on actual mobile device

### 3. **Customize for Your Restaurant**

#### Update Restaurant Name & Contact Info
Open `index.html` and find these sections to customize:

- **Line 13**: Change page title
- **Line 14-15**: Update meta description and keywords
- **Line 28-30**: Update logo name and restaurant info
- **Line 73**: Update hero title
- **Line 74**: Update hero subtitle
- **Lines 320-347**: Update footer contact info, hours, address

**Current Location**: Perth, Australia
**Current Phone**: +61 2 9876 5432
**Current Address**: 585 Hay Street, Perth WA 6000, Australia
**Current Email**: info@myplacebar.com.au

#### Update WhatsApp Number (IMPORTANT)
Open `js/script.js` and find line ~165:

```javascript
const whatsappBusinessPhone = '1234567890'; // Replace with actual WhatsApp Business number
```

Replace `1234567890` with your actual WhatsApp Business number (with country code, no spaces):
- Example: `919876543210` (for India +91 country code)
- Example: `12015551234` (for USA +1 country code)

#### Update Menu Items
Open `index.html` and navigate to the Menu Section (starting at line ~180):

Each menu item has this structure:
```html
<div class="menu-card" data-category="appetizers">
    <div class="menu-card-image">
        <img src="IMAGE_URL" alt="Item Name">
        <span class="menu-badge">Badge Text</span>
    </div>
    <div class="menu-card-content">
        <h3 class="menu-card-title">Item Name</h3>
        <p class="menu-card-description">Description</p>
        <div class="menu-card-footer">
            <span class="menu-card-price">$Price</span>
            <button class="btn-add-to-order" onclick="addToOrder('Item Name', PRICE)">+</button>
        </div>
    </div>
</div>
```

**Categories available**: `appetizers`, `mains`, `drinks`, `desserts`

#### Update Color Scheme
Open `css/style.css` and modify CSS variables (lines 8-35):

```css
:root {
    --primary-color: #8b4513;        /* Brown - Main color */
    --secondary-color: #d4af37;      /* Gold - Accent color */
    --accent-color: #e74c3c;         /* Red - Highlight color */
    --dark-bg: #1a1a1a;              /* Dark background */
    --light-bg: #f5f5f5;             /* Light background */
    /* ... more colors ... */
}
```

---

## 🎨 Color Scheme

The website uses a professional restaurant color palette:

| Color | Hex Code | Usage |
|-------|----------|-------|
| Primary Brown | `#8b4513` | Header, buttons, text accents |
| Secondary Gold | `#d4af37` | Highlights, icons, borders |
| Accent Red | `#e74c3c` | CTAs, badges, alerts |
| Dark | `#1a1a1a` | Footer background |
| Light | `#f5f5f5` | Section backgrounds |
| Text Dark | `#2c3e50` | Main text color |

---

## 🤖 AI Chatbox

The website includes an intelligent chatbot that can answer customer questions about:

### Features
- **Floating Chat Button**: Always visible in bottom-right corner
- **Quick Suggestions**: Pre-made buttons for common questions
- **Intelligent Responses**: Keyword-based answers about restaurant info
- **Mobile Friendly**: Full-screen chat on mobile devices
- **Real-time Chat**: Instant responses with typing simulation

### Supported Topics
- **Opening Hours**: "What time do you open?", "When are you closed?"
- **Location**: "Where are you located?", "What's your address?"
- **Menu Information**: "What do you serve?", "Tell me about your specials"
- **Reservations**: "Can I make a booking?", "Do you take reservations?"
- **Contact Info**: "What's your phone number?", "How can I reach you?"
- **General Inquiries**: Hours, specials, directions, etc.

### Customization
To modify chat responses, edit the `generateBotResponse` function in `js/script.js`:

```javascript
const responses = {
    hours: [
        "We're open Monday to Thursday from 10 AM to 11 PM...",
        // Add more response variations
    ],
    // Add new categories here
};
```

---

## 📱 Responsive Breakpoints

The website is optimized for:

- **Mobile**: 320px - 480px (phones)
- **Tablet**: 481px - 768px (tablets)
- **Desktop**: 769px - 1024px (laptops)
- **Wide**: 1025px+ (desktop displays)

---

## 🔧 Features Explained

### 1. Mobile Menu
- Hamburger menu appears on screens < 768px
- Click hamburger icon to toggle mobile navigation
- Menu automatically closes when clicking a link

### 2. Menu Filtering
- Click filter buttons to show/hide menu items by category
- "All" button shows all items
- Smooth fade animations when filtering

### 3. Order System
- Add items by clicking `+` button on menu cards
- Order items appear in cart (with quantity tracking)
- Total price updates automatically
- Click `×` to remove items from cart
- Order data persists in browser (localStorage)

### 4. WhatsApp Integration
- Form validates user input (name, email, phone required)
- Generates formatted WhatsApp message with order summary
- Opens WhatsApp automatically with pre-filled message
- Works on desktop (requires WhatsApp Web) and mobile

### 5. Newsletter Signup
- Email validation using regex pattern
- Subscribes stored in browser localStorage
- Success message appears after submission

### 6. Scroll Animations
- Elements fade in on scroll using Intersection Observer API
- No external animation libraries needed
- Accessible and performant

---

## 💡 Usage Tips

### Use External Images
The website currently uses images from Unsplash (free stock photos). To use your own images:

1. Save images to the `images/` folder
2. Update image paths in HTML:
   ```html
   <img src="images/my-dish.jpg" alt="Dish Name">
   ```

### Add More Menu Items
Simply copy a menu card section and paste it before the closing `</div>` of `.menu-gallery`. Update:
- `data-category` attribute
- Image URL
- Item name, description, price
- Add to order button onclick parameters

### Add More Testimonials
Copy a testimonial card and paste before the closing `</div>` of `.testimonials-grid`. Update:
- Avatar image URL
- Customer name and title
- Testimonial text and star count

### Customize Form Fields
Edit the order form in HTML (lines ~370-390) to add/remove fields as needed.

---

## 📝 Newsletter Storage

Emails are stored in browser's localStorage under the key: `newsletter_subscribers`

To view subscriber emails in browser console:
```javascript
JSON.parse(localStorage.getItem('newsletter_subscribers'))
```

**Note**: This is a demo implementation. For production, you should:
- Connect to a backend email service (Mailchimp, SendGrid, etc.)
- Store emails in a database
- Implement proper email validation and confirmation

---

## 🚀 deployment Options

### Option 1: GitHub Pages (Free)
1. Create GitHub repository
2. Upload files to repository
3. Go to Settings → Pages → Select "Deploy from branch"
4. Website will be live at: `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop your project folder
3. Website goes live instantly

### Option 3: Traditional Hosting
1. Contact web hosting provider (GoDaddy, Bluehost, etc.)
2. Upload files via FTP to `public_html` folder
3. Configure domain to point to hosting

---

## 📞 WhatsApp Integration Notes

### How It Works
- Uses `wa.me/` WhatsApp API to create clickable links
- Pre-fills message with order summary
- Works on both desktop (WhatsApp Web) and mobile (WhatsApp App)

### Setup Your WhatsApp Business Number
1. **For Business Account**: Register at [business.facebook.com](https://business.facebook.com)
2. **Get Your Number**: Format with country code (no + or spaces)
   - Example: `911234567890` not `+91 1234567890`
3. **Update in Code**: In `js/script.js`, line ~165

### Test the Integration
1. Fill order form with your details
2. Add menu items to cart
3. Click "Send Order via WhatsApp"
4. WhatsApp should open with pre-filled message
5. Send message to verify

---

## 🐛 Troubleshooting

### Images Not Loading
- Check image URLs are correct and accessible
- Use full URLs (including `https://`) for external images
- For local images, ensure file path is relative to project root

### WhatsApp Not Opening
- Verify you updated the phone number in `js/script.js`
- Use correct format: country code + number (no spaces or +)
- Test on desktop with WhatsApp Web or on mobile with WhatsApp app

### Form Not Submitting
- Ensure all required fields are filled (name, email, phone marked with *)
- Add at least one item to order
- Check browser console for JavaScript errors

### Menu Filters Not Working
- Ensure filter button `data-filter` attributes match menu card `data-category` values
- Check that CSS is loaded (check browser DevTools → Sources tab)

### Mobile Menu Not Closing
- Click outside the menu to close it
- Or click on a navigation link
- Check that `js/script.js` is properly linked in HTML

---

## 📚 Browser Compatibility

✅ **Supported**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+  
⚠️ **Partial Support**: IE 11 (no animations, basic functionality)  
❌ **Not Supported**: IE 10 and below

---

## 🎯 Performance Tips

1. **Optimize Images**: Compress images using TinyPNG or ImageOptim before use
2. **Cache**: Website automatically caches order items in browser
3. **Lazy Loading**: Images only load when they come into view
4. **Minimal CSS**: All CSS in single optimized file (minimal file size)
5. **No External Dependencies**: Faster load times, no third-party libraries

---

## 📄 License & Credits

**Built**: April 2026  
**Technology**: Vanilla HTML5, CSS3, JavaScript ES6+  
**Free Stock Images**: Unsplash ([unsplash.com](https://unsplash.com))  

---

## ✨ Next Steps

1. ✅ **Customize Restaurant Info** - Update name, contact, hours
2. ✅ **Add Your Menu** - Replace sample items with real menu
3. ✅ **Update WhatsApp Number** - Set your actual business number
4. ✅ **Update Images** - Add your restaurant photos
5. ✅ **Test All Features** - Try filters, forms, mobile view
6. ✅ **Deploy** - Choose hosting and go live!

---

## 🎉 Congratulations!

Your professional restaurant website is ready! Start customizing and get it live today.

For questions or support, feel free to contact the development team.

**Happy serving! 🍽️🥂**

---

*Last Updated: April 10, 2026*
