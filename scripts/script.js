document.addEventListener('DOMContentLoaded', () => {
    console.log('EarnSphere website loaded successfully.');

    // --- Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-links');

    const showSection = (id) => {
        console.log(`Navigating to section: ${id}`);
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Section with ID '${id}' not found.`);
        }
    };

    // Initial display setup (show only the hero section by default)
    sections.forEach(section => {
        if (section.id !== 'hero') {
            section.style.display = 'none';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-section');
            if (targetId) {
                sections.forEach(section => {
                    section.style.display = 'none'; // Hide all sections
                });
                document.getElementById(targetId).style.display = 'block'; // Show target section
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            } else {
                console.warn('Navigation link missing data-section attribute.');
            }
        });
    });

    // Mobile navigation toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        console.log('Mobile navigation toggled.');
    });

    // --- Style Variations/Toggles ---
    const body = document.body;

    // 1. Theme Toggle (Light/Dark Mode)
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeToggleBtn.textContent = 'Toggle Dark Mode';
                console.log('Switched to Light Mode.');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggleBtn.textContent = 'Toggle Light Mode';
                console.log('Switched to Dark Mode.');
            }
        });
    } else {
        console.error('Theme toggle button not found.');
    }

    // 2. Font Size Toggle
    const fontSizeToggleBtn = document.getElementById('fontSizeToggle');
    let isLargeFont = false;
    if (fontSizeToggleBtn) {
        fontSizeToggleBtn.addEventListener('click', () => {
            if (isLargeFont) {
                body.removeAttribute('data-font-size');
                fontSizeToggleBtn.textContent = 'Increase Font Size';
                isLargeFont = false;
                console.log('Switched to Normal Font Size.');
            } else {
                body.setAttribute('data-font-size', 'large');
                fontSizeToggleBtn.textContent = 'Decrease Font Size';
                isLargeFont = true;
                console.log('Switched to Large Font Size.');
            }
        });
    } else {
        console.error('Font size toggle button not found.');
    }

    // 3. Accent Color Toggle
    const accentColorToggleBtn = document.getElementById('accentColorToggle');
    const accentColors = ['', 'red', 'purple']; // Empty string for default
    let currentAccentIndex = 0;
    if (accentColorToggleBtn) {
        accentColorToggleBtn.addEventListener('click', () => {
            currentAccentIndex = (currentAccentIndex + 1) % accentColors.length;
            const newAccent = accentColors[currentAccentIndex];
            if (newAccent) {
                body.setAttribute('data-accent-color', newAccent);
                accentColorToggleBtn.textContent = `Change Accent Color (Current: ${newAccent.charAt(0).toUpperCase() + newAccent.slice(1)})`;
                console.log(`Switched accent color to: ${newAccent}.`);
            } else {
                body.removeAttribute('data-accent-color');
                accentColorToggleBtn.textContent = 'Change Accent Color (Current: Default)';
                console.log('Switched accent color to Default.');
            }
        });
    } else {
        console.error('Accent color toggle button not found.');
    }

    // --- Form Submission (Placeholder) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Contact form submitted!');
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    } else {
        console.warn('Contact form not found.');
    }
});
