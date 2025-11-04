# InnoVet Component Framework

This project now uses a React-like component system built with vanilla HTML, CSS, and JavaScript. The framework provides reusable components while maintaining the original design.

## How It Works

### Component Architecture
- **Components**: Reusable HTML fragments stored in `components/` folder
- **Component Loader**: JavaScript system that loads and renders components dynamically
- **Props System**: Simple template replacement system for dynamic content

### Available Components
1. `navbar.html` - Navigation bar
2. `footer.html` - Site footer
3. `hero.html` - Home page hero section
4. `about-section.html` - About content section
5. `services-section.html` - Services grid
6. `activities-section.html` - Community activities
7. `page-header.html` - Page header with props support

### Usage Example

```javascript
// Load and render a component
await app.renderComponent('navbar', '#navbar-container');

// Render component with props
await app.renderComponent('page-header', '#header-container', {
    title: 'About Us',
    subtitle: 'Our Story and Mission'
});
```

### Files Structure
```
/components/          # Reusable components
  navbar.html
  footer.html
  hero.html
  about-section.html
  services-section.html
  activities-section.html
  page-header.html

/js/
  components.js       # Component framework

index-components.html # New component-based home page
about-components.html # New component-based about page
```

### Benefits
1. **Reusability**: Components can be used across multiple pages
2. **Maintainability**: Changes to components automatically reflect everywhere
3. **Performance**: Components are loaded only when needed
4. **Consistency**: Ensures consistent UI across the website
5. **React-like Development**: Familiar component-based development approach

### Migration
- Original files remain intact
- New component-based files have `-components` suffix
- Gradual migration possible - can use both approaches simultaneously

## Getting Started
1. Use `index-components.html` instead of `index.html`
2. Components are automatically loaded and rendered
3. Original design and styling are preserved
4. All functionality remains the same

This approach gives you the benefits of a component-based architecture like React while using vanilla web technologies and maintaining your existing design.
