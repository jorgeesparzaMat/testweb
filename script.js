// Funcionalidades JavaScript para DAS Grúas - Diseño Profesional y Confiable

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect con la nueva paleta de colores
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
                const offsetTop = targetSection.offsetTop - 90; // Ajuste para el navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de fade-in mejorada para elementos al hacer scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Agregar efecto de entrada escalonada para cards
                if (entry.target.classList.contains('card')) {
                    entry.target.style.transitionDelay = '0.1s';
                }
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const fadeElements = document.querySelectorAll('.card, .carousel, .stat-item, .about-image');
    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Formulario de contacto mejorado con validación profesional
    const contactForm = document.querySelector('#contacto form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Validación mejorada
            if (!name || !email || !phone || !message) {
                showAlert('Por favor, completa todos los campos requeridos.', 'warning');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Por favor, ingresa un email válido.', 'warning');
                return;
            }
            
            if (!validateChileanPhone(phone)) {
                showAlert('Por favor, ingresa un número de teléfono chileno válido.', 'warning');
                return;
            }
            
            // Simular envío con feedback profesional
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showAlert('¡Mensaje enviado con éxito! Nuestro equipo se pondrá en contacto contigo inmediatamente para solucionar tu problema de traslado.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Función para mostrar alertas con el nuevo diseño
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alertDiv.style.cssText = `
            top: 100px; 
            right: 20px; 
            z-index: 9999; 
            min-width: 350px; 
            max-width: 400px;
            border-radius: 12px;
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        `;
        
        // Aplicar colores de la nueva paleta
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#d4edda';
            alertDiv.style.color = '#155724';
            alertDiv.style.borderLeft = '4px solid #28a745';
        } else if (type === 'warning') {
            alertDiv.style.backgroundColor = '#fff3cd';
            alertDiv.style.color = '#856404';
            alertDiv.style.borderLeft = '4px solid #ffc107';
        }
        
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Auto-remover después de 6 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 6000);
    }

    // Contador animado mejorado para estadísticas
    function animateCounter(element, target, duration = 2500) {
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
    const statsElements = document.querySelectorAll('.hero-stat-number, .stat-number');
    statsElements.forEach(el => {
        if (el.textContent.includes('+')) {
            statsObserver.observe(el);
        }
    });

    // Mejorar el carrusel con controles personalizados
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
        
        // Agregar indicadores personalizados
        const indicators = carousel.querySelectorAll('.carousel-indicators button');
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                // Actualizar indicadores activos
                indicators.forEach(ind => ind.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Asegurar que todas las imágenes sean visibles
    const images = document.querySelectorAll('img[src*="assets/"]');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
        // Agregar efecto de carga suave
        img.addEventListener('load', function() {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = '1';
        });
    });

    // Mejorar accesibilidad del botón de WhatsApp
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (whatsappButton) {
        whatsappButton.setAttribute('aria-label', 'Contactar por WhatsApp - Servicio 24/7');
        whatsappButton.setAttribute('title', '¡Chatea con nosotros por WhatsApp! Disponibles 24/7');
        
        // Agregar efecto de pulso mejorado
        whatsappButton.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        whatsappButton.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }

    // Efecto de parallax suave para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
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

    // Efecto de hover mejorado para cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Validación de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Efecto de typing para el título principal (solo en desktop)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid #D32F2F';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        // Iniciar typing después de 1 segundo
        setTimeout(typeWriter, 1000);
    } else if (heroTitle && window.innerWidth <= 768) {
        // En móviles, asegurar que el título sea visible inmediatamente
        heroTitle.style.whiteSpace = 'normal';
        heroTitle.style.overflow = 'visible';
        heroTitle.style.display = 'block';
    }

    // Tooltip para elementos interactivos
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Efecto de carga de página
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Mostrar elementos con animación escalonada
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const elements = heroContent.querySelectorAll('*');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });

    // Listener para cambio de tamaño de ventana
    window.addEventListener('resize', function() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            if (window.innerWidth <= 768) {
                heroTitle.style.whiteSpace = 'normal';
                heroTitle.style.overflow = 'visible';
                heroTitle.style.display = 'block';
                heroTitle.style.borderRight = 'none';
            }
        }
    });

    console.log('🚚 DAS Grúas - Web profesional cargada correctamente');
    console.log('🎨 Paleta de colores aplicada: Rojo #D32F2F, Azul #263238');
    console.log('📝 Contenido actualizado para empresa nueva comprometida con el servicio');
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

// Función para mostrar información de contacto emergente
function showContactInfo() {
    const contactInfo = `
        <div class="contact-popup">
            <h5>Información de Contacto</h5>
            <p><i class="fas fa-phone"></i> +56 9 1234 5678</p>
            <p><i class="fab fa-whatsapp"></i> WhatsApp 24/7</p>
            <p><i class="fas fa-envelope"></i> contacto@dasgruas.cl</p>
        </div>
    `;
    
    // Implementar popup de contacto
    console.log('Información de contacto mostrada');
} 