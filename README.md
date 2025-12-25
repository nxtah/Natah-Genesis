# Natah Genesis — Website & AI Solutions

A modern, professional one-page landing page designed to showcase and sell website and AI chatbot services to small-medium businesses.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive**: Fully mobile-responsive design that works on all devices
- **Conversion-Focused**: Strategic CTAs throughout the page to drive WhatsApp consultations
- **7 Key Sections**:
  1. Hero Section with compelling headline and CTAs
  2. Problem Section highlighting customer pain points
  3. Solution Section showcasing how Natah Genesis helps
  4. Services/Packages Section with 3 tier options
  5. AI Chatbot Demo Section
  6. About Section building trust
  7. Final CTA Section driving action

- **WhatsApp Integration**: Floating button and multiple CTAs linking to WhatsApp
- **AI Chatbot Ready**: Placeholder container for chatbot widget integration
- **Performance Optimized**: Fast loading, clean code, optimized animations

## 🎨 Design Elements

- Color scheme: Dark blues, grays, and whites for professional appearance
- Soft gradients and subtle shadows
- Rounded corners on cards and buttons
- Smooth scroll animations and hover effects
- Mobile-first responsive design

## 📱 Technologies Used

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Font Awesome icons
- No framework dependencies

## 🛠️ Setup Instructions

1. **Clone or download** this repository

2. **Update WhatsApp Numbers**: 
   - Open `index.html`
   - Find all instances of `6281234567890` (placeholder number)
   - Replace with your actual WhatsApp number including country code
   - Example: `6281234567890` → `628123456789` (Indonesia format)

3. **Customize Content** (Optional):
   - Edit text content in `index.html`
   - Adjust colors in `styles.css` by modifying CSS variables in `:root`
   - Modify animations and interactions in `script.js`

4. **Integrate AI Chatbot**:
   - Find the `<div id="chatbot-container">` in `index.html`
   - Add your chatbot widget code (e.g., Tidio, Drift, Tawk.to, or custom solution)
   - Example for Tidio:
     ```html
     <script src="//code.tidio.co/your-tidio-key.js" async></script>
     ```

5. **Deploy**:
   - Upload files to your hosting (Netlify, Vercel, GitHub Pages, etc.)
   - Or open `index.html` directly in a browser for local testing

## 📁 File Structure

```
natah-genesis/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactivity and animations
└── README.md           # This file
```

## 🎯 Deployment Options

### Option 1: Netlify (Recommended)
1. Create account on [Netlify](https://netlify.com)
2. Drag and drop the project folder
3. Site goes live instantly with free SSL

### Option 2: Vercel
1. Create account on [Vercel](https://vercel.com)
2. Import the project
3. Deploy with one click

### Option 3: GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select main branch and save
4. Site will be live at `username.github.io/repo-name`

## ✏️ Customization Guide

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --success: #10b981;             /* WhatsApp green */
    --dark-bg: #0f172a;            /* Background */
    --dark-card: #1e293b;          /* Card backgrounds */
}
```

### Changing Content
All text content is in `index.html`. Search for specific sections by ID:
- `#hero` - Hero section
- `#problem` - Problems section
- `#services` - Service packages
- etc.

### Adding Analytics
Add your tracking code (Google Analytics, Facebook Pixel) before the closing `</body>` tag in `index.html`.

## 📞 WhatsApp Integration

The website includes multiple WhatsApp touchpoints:
- Floating WhatsApp button (bottom-right)
- Navigation bar contact button
- Hero section CTA buttons
- Service package consultation buttons
- Final CTA button

All links use the format:
```
https://wa.me/YOURNUMBER?text=MESSAGE
```

## 🤖 AI Chatbot Integration

The site includes a placeholder for chatbot integration. Popular options:

1. **Tidio** (Free plan available)
2. **Tawk.to** (Free)
3. **Drift**
4. **Intercom**
5. Custom solution

Add the widget code to the `<head>` or before `</body>` in `index.html`.

## 🚀 Performance Tips

- Images: Compress before adding (use TinyPNG or similar)
- Fonts: Currently uses system fonts for fast loading
- Scripts: All scripts load at the end of body for faster initial render
- CSS: Single file, well-organized, no unnecessary code

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is created for Natah Genesis. Feel free to customize and use for your business.

## 🤝 Support

For questions or customization requests, contact via WhatsApp or through the website contact form.

---

**Built with ❤️ for Natah Genesis**
