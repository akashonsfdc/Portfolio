// Smooth scroll behavior
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Hide scroll indicator on scroll
window.addEventListener('scroll', () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.style.opacity = 1 - window.pageYOffset / 300;
    }
});

// Dynamic role rotation
const roles = [
    'Salesforce Developer',
    'Salesforce Admin',
    'Agentforce Specialist'
];

let currentRoleIndex = 0;
const roleElement = document.getElementById('dynamic-role');

function changeRole() {
    if (roleElement) {
        // Fade out
        roleElement.style.opacity = '0';

        setTimeout(() => {
            // Change text
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleElement.textContent = roles[currentRoleIndex];

            // Fade in
            roleElement.style.opacity = '1';
        }, 500);
    }
}

// Initialize first role
if (roleElement) {
    roleElement.textContent = roles[0];
    roleElement.style.transition = 'opacity 0.5s ease-in-out';
}

// Change role every 2 seconds
setInterval(changeRole, 2000);
