// Component Loader System - React-like approach with vanilla JS
class ComponentFramework {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    // Register a component
    registerComponent(name, path) {
        this.components.set(name, path);
    }

    // Load a component asynchronously
    async loadComponent(name) {
        if (this.loadedComponents.has(name)) {
            return;
        }

        const path = this.components.get(name);
        if (!path) {
            console.error(`Component ${name} not found`);
            return;
        }

        try {
            const response = await fetch(path);
            const html = await response.text();
            
            // Store the component HTML for later use
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            template.setAttribute('data-component', name);
            document.head.appendChild(template);
            
            this.loadedComponents.add(name);
        } catch (error) {
            console.error(`Failed to load component ${name}:`, error);
        }
    }

    // Render a component into a target element
    async renderComponent(name, targetSelector, props = {}) {
        await this.loadComponent(name);
        
        const template = document.querySelector(`template[data-component="${name}"]`);
        if (!template) {
            console.error(`Component template ${name} not found`);
            return;
        }

        const target = document.querySelector(targetSelector);
        if (!target) {
            console.error(`Target element ${targetSelector} not found`);
            return;
        }

        // Clone the template content
        const clone = document.importNode(template.content, true);
        
        // Replace props placeholders if any
        this.injectProps(clone, props);
        
        // Clear target and append new content
        target.innerHTML = '';
        target.appendChild(clone);
    }

    // Inject props into component (simple template replacement)
    injectProps(element, props) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            let text = textNode.textContent;
            Object.keys(props).forEach(key => {
                const placeholder = `{{${key}}}`;
                text = text.replace(new RegExp(placeholder, 'g'), props[key]);
            });
            textNode.textContent = text;
        });
    }

    // Load multiple components
    async loadComponents(names) {
        const promises = names.map(name => this.loadComponent(name));
        await Promise.all(promises);
    }

    // Set active navigation
    setActiveNav(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize the framework
const app = new ComponentFramework();

// Register all components
app.registerComponent('navbar', 'components/navbar.html');
app.registerComponent('footer', 'components/footer.html');
app.registerComponent('hero', 'components/hero.html');
app.registerComponent('about-section', 'components/about-section.html');
app.registerComponent('services-section', 'components/services-section.html');
app.registerComponent('activities-section', 'components/activities-section.html');
app.registerComponent('page-header', 'components/page-header.html');

// App initialization
class InnoVetApp {
    constructor() {
        this.currentPage = '';
        this.init();
    }

    async init() {
        // Load common components
        await app.loadComponents(['navbar', 'footer']);
        
        // Determine current page
        this.currentPage = this.getCurrentPage();
        
        // Render the app
        this.render();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('about')) return 'about';
        if (path.includes('services')) return 'services';
        if (path.includes('activities')) return 'activities';
        if (path.includes('team')) return 'team';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }

    async render() {
        // Render navbar
        await app.renderComponent('navbar', '#navbar-container');
        
        // Render page-specific content
        await this.renderPageContent();
        
        // Render footer
        await app.renderComponent('footer', '#footer-container');
        
        // Set active navigation
        app.setActiveNav(this.currentPage);
        
        // Initialize page-specific functionality
        this.initializePageFeatures();
    }    async renderPageContent() {
        const mainContainer = document.querySelector('#main-content');
        if (!mainContainer) return;

        switch (this.currentPage) {
            case 'home':
                await app.loadComponents(['hero', 'about-section', 'services-section', 'activities-section']);
                await app.renderComponent('hero', '#hero-container');
                await app.renderComponent('about-section', '#about-container');
                await app.renderComponent('services-section', '#services-container');
                // Activities and other sections are inline in the HTML for now
                break;
            case 'about':
                await app.renderComponent('about-section', '#about-container');
                break;
            case 'services':
                await app.renderComponent('services-section', '#services-container');
                break;
            case 'activities':
                await app.renderComponent('activities-section', '#activities-container');
                break;
            // Add more cases as needed
        }
    }

    initializePageFeatures() {
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        
        if (mobileMenu && navMenu) {
            mobileMenu.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling
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

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }
}

// Export for use in other files
window.InnoVetApp = InnoVetApp;
window.ComponentFramework = app;
