// Funcionalidades JavaScript para la web de Grúas Santiago

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling para enlaces del navbar
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de fade-in para elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animación (excluyendo imágenes)
    const fadeElements = document.querySelectorAll('.card, .carousel');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Formulario de contacto
    const contactForm = document.querySelector('#contacto form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Validación básica
            if (!name || !email || !phone || !message) {
                showAlert('Por favor, completa todos los campos', 'warning');
                return;
            }
            
            // Simular envío (aquí se conectaría con un backend real)
            showAlert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            this.reset();
        });
    }

    // Función para mostrar alertas
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remover después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // Contador animado para estadísticas
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Observar estadísticas para animación
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                if (!isNaN(value)) {
                    animateCounter(target, value);
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    // Observar elementos de estadísticas
    const statsElements = document.querySelectorAll('.text-primary');
    statsElements.forEach(el => {
        if (el.textContent.includes('+')) {
            statsObserver.observe(el);
        }
    });

    // Mejorar el carrusel
    const carousel = document.querySelector('#gruasCarousel');
    if (carousel) {
        // Pausar carrusel al hacer hover
        carousel.addEventListener('mouseenter', function() {
            const bsCarousel = new bootstrap.Carousel(this);
            bsCarousel.pause();
        });
        
        carousel.addEventListener('mouseleave', function() {
            const bsCarousel = new bootstrap.Carousel(this);
            bsCarousel.cycle();
        });
    }

    // Asegurar que todas las imágenes sean visibles
    const images = document.querySelectorAll('img[src*="assets/"]');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
    });

    // Mejorar accesibilidad del botón de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp');
        whatsappButton.setAttribute('title', '¡Chatea con nosotros por WhatsApp!');
    }

    // Detectar si el usuario está en móvil para optimizar el botón de WhatsApp
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    if (isMobile()) {
        // En móviles, el botón de WhatsApp puede abrir la app directamente
        const whatsappLink = document.querySelector('.whatsapp-button');
        if (whatsappLink) {
            whatsappLink.href = whatsappLink.href.replace('wa.me', 'api.whatsapp.com');
        }
    }

    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Mejorar la experiencia de scroll en móviles
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            document.body.classList.add('scrolling');
            
            setTimeout(() => {
                isScrolling = false;
                document.body.classList.remove('scrolling');
            }, 150);
        }
    });

    // Tooltip para el botón de WhatsApp
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    console.log('🚚 DAS Grúas - Web cargada correctamente');
});

// Función para validar teléfono chileno
function validateChileanPhone(phone) {
    const phoneRegex = /^(\+56|56)?[9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Función para formatear teléfono
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 9) {
        return `+56 ${cleaned.slice(0, 1)} ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
} 