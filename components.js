// Components Loader
// Загружает header и footer компоненты на страницу

class ComponentLoader {
    static async loadComponent(componentPath, containerId) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
            } else {
                console.error(`Container with id '${containerId}' not found`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    static async loadAll() {
        await Promise.all([
            this.loadComponent('components/header.html', 'header-container'),
            this.loadComponent('components/footer.html', 'footer-container')
        ]);

        // После загрузки компонентов инициализируем их функционал
        this.initializeComponents();
    }

    static initializeComponents() {
        // Smooth scrolling for navigation links
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

        // Navbar background change on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.custom-navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });

        // Активная ссылка в навигации
        this.setActiveNavLink();
    }

    static setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
}

// Загружаем компоненты после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadAll();
});

// Экспорт для использования в других скриптах
window.ComponentLoader = ComponentLoader;