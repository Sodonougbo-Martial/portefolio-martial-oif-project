// Variables globales
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Navigation mobile
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Animation des barres de progression page competences
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animation d'apparition des éléments
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .hobby-card, .skills-category');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-up');
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        observer.observe(el);
    });
}

// Validation du formulaire de contact
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.clearAllErrors();
        
        const isValid = this.validateForm();
        if (isValid) {
            this.submitForm();
        }
    }

    validateForm() {
        const prenom = this.form.querySelector('#prenom');
        const nom = this.form.querySelector('#nom');
        const sujet = this.form.querySelector('#sujet');
        const message = this.form.querySelector('#message');

        let isValid = true;

        // Validation prénom
        if (!prenom.value.trim()) {
            this.showError('prenom', 'Le prénom est requis');
            isValid = false;
        } else if (prenom.value.trim().length < 2) {
            this.showError('prenom', 'Le prénom doit contenir au moins 2 caractères');
            isValid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(prenom.value.trim())) {
            this.showError('prenom', 'Le prénom ne doit contenir que des lettres');
            isValid = false;
        }

        // Validation nom
        if (!nom.value.trim()) {
            this.showError('nom', 'Le nom est requis');
            isValid = false;
        } else if (nom.value.trim().length < 2) {
            this.showError('nom', 'Le nom doit contenir au moins 2 caractères');
            isValid = false;
        } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(nom.value.trim())) {
            this.showError('nom', 'Le nom ne doit contenir que des lettres');
            isValid = false;
        }

        // Validation sujet
        if (!sujet.value.trim()) {
            this.showError('sujet', 'Le sujet est requis');
            isValid = false;
        } else if (sujet.value.trim().length < 5) {
            this.showError('sujet', 'Le sujet doit contenir au moins 5 caractères');
            isValid = false;
        }

        // Validation message
        if (!message.value.trim()) {
            this.showError('message', 'Le message est requis');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            this.showError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const fieldName = field.getAttribute('name');
        const value = field.value.trim();

        switch (fieldName) {
            case 'prenom':
            case 'nom':
                if (!value) {
                    this.showError(fieldName, `Le ${fieldName} est requis`);
                } else if (value.length < 2) {
                    this.showError(fieldName, `Le ${fieldName} doit contenir au moins 2 caractères`);
                } else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(value)) {
                    this.showError(fieldName, `Le ${fieldName} ne doit contenir que des lettres`);
                } else {
                    this.clearError(field);
                }
                break;
            case 'sujet':
                if (!value) {
                    this.showError(fieldName, 'Le sujet est requis');
                } else if (value.length < 5) {
                    this.showError(fieldName, 'Le sujet doit contenir au moins 5 caractères');
                } else {
                    this.clearError(field);
                }
                break;
            case 'message':
                if (!value) {
                    this.showError(fieldName, 'Le message est requis');
                } else if (value.length < 10) {
                    this.showError(fieldName, 'Le message doit contenir au moins 10 caractères');
                } else {
                    this.clearError(field);
                }
                break;
        }
    }

    showError(fieldName, message) {
        const field = this.form.querySelector(`#${fieldName}`);
        const errorElement = this.form.querySelector(`#${fieldName}Error`);
        
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
        }
        this.errors[fieldName] = message;
    }

    clearError(field) {
        const fieldName = field.getAttribute('name');
        const errorElement = this.form.querySelector(`#${fieldName}Error`);
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
        delete this.errors[fieldName];
    }

    clearAllErrors() {
        const fields = this.form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            this.clearError(field);
        });
        this.errors = {};
    }

    submitForm() {
        const submitBtn = this.form.querySelector('.submit-btn');
        const successMessage = document.getElementById('successMessage');
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.form.reset();
            
            successMessage.classList.add('show');
            
            submitBtn.textContent = 'Envoyer';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
            
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
        }, 1500);
    }
}

// Effets de survol interactifs
function addHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Effet sur les boutons des projets
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
                alert('Redirection vers le projet');
            }, 150);
        });
    });
}

// Fonction pour le téléchargement du CV
function downloadCV() {
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Téléchargement...';
    btn.disabled = true;
    
    // lien de téléchargement
    const link = document.createElement('a');
    link.href = './CV__Martial_SODONOUGBO.pdf';
    link.download = 'CV__Martial_SODONOUGBO.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    
    try {
        link.click();
        NotificationSystem.show('Téléchargement du CV en cours...', 'success');
    } catch (error) {
        console.error('Erreur lors du téléchargement:', error);
        NotificationSystem.show('Erreur: Fichier CV introuvable. Vérifiez que le fichier existe dans le dossier racine.', 'error', 5000);
    }
    
    document.body.removeChild(link);
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1000);
}

// Smooth scrolling pour les liens internes
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Chargement des animations selon la page
function initPageAnimations() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'competences.html':
            animateProgressBars();
            break;
        case 'contact.html':
            new FormValidator('contactForm');
            break;
        default:
            animateOnScroll();
            addHoverEffects();
            break;
    }
}

// Système de notification
class NotificationSystem {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles inline pour la notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            zIndex: '9999',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Couleurs selon le type
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#20b2aa'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
}

// Gestionnaire d'erreurs global
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    NotificationSystem.show('Une erreur est survenue. Veuillez recharger la page.', 'error');
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initPageAnimations();
    initSmoothScrolling();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 10);
    
    // Message de bienvenue
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    if (isHomePage) {
        setTimeout(() => {
            NotificationSystem.show('Bienvenue sur mon portfolio !', 'success');
        }, 1000);
    }
});

// Performance: Lazy loading pour les images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}