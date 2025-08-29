// Validación de formulario en tiempo real (mejorada)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const nombre = form.elements['name'];
    const email = form.elements['email'];
    const asunto = form.elements['_subject'];
    const mensaje = form.elements['message'];
    const successMsg = form.querySelector('.form-success');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mainHeader = document.getElementById('main-header');

    // Toggle del menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', 
                navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Efecto de header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    function showError(input, message) {
        const error = input.parentElement.querySelector('.error-message');
        error.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        input.setAttribute('aria-invalid', 'true');
        input.style.borderColor = 'var(--color-error)';
        
        // Animación de shake para el error
        input.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 300
        });
    }

    function clearError(input) {
        const error = input.parentElement.querySelector('.error-message');
        error.textContent = '';
        input.removeAttribute('aria-invalid');
        input.style.borderColor = '';
    }

    function validateNombre() {
        if (!nombre.value.trim()) {
            showError(nombre, 'Por favor, ingresa tu nombre.');
            return false;
        }
        clearError(nombre);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        if (!value) {
            showError(email, 'Por favor, ingresa tu correo.');
            return false;
        }
        // Validación mejorada de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(email, 'Por favor, ingresa un correo válido.');
            return false;
        }
        clearError(email);
        return true;
    }

    function validateAsunto() {
        if (!asunto.value.trim()) {
            showError(asunto, 'Por favor, ingresa el asunto.');
            return false;
        }
        clearError(asunto);
        return true;
    }

    function validateMensaje() {
        if (!mensaje.value.trim()) {
            showError(mensaje, 'Por favor, escribe tu mensaje.');
            return false;
        }
        clearError(mensaje);
        return true;
    }

    // Eventos de validación en tiempo real
    nombre.addEventListener('input', validateNombre);
    email.addEventListener('input', validateEmail);
    asunto.addEventListener('input', validateAsunto);
    mensaje.addEventListener('input', validateMensaje);

    // Efecto de enfoque en los campos
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
            input.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        if (!validateNombre()) valid = false;
        if (!validateEmail()) valid = false;
        if (!validateAsunto()) valid = false;
        if (!validateMensaje()) valid = false;

        if (valid) {
            // Animación de envío
            const submitBtn = form.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Envío real del formulario a FormSubmit
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Éxito en el envío - Redirigir a la página de agradecimiento
                    setTimeout(() => {
                        window.location.href = 'gracias.html';
                    }, 1500);
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                // Manejo de errores
                alert('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.');
                console.error('Error:', error);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        }
    });

    // Inicialización de animaciones al cargar la página
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});