// Login API and Event Handlers
class LoginManager {
    constructor() {
        // Usar la configuración global para la URL de la API
        this.API = window.appConfig ? window.appConfig.API_BASE_URL : "http://localhost:3000";
        this.init();
    }

    init() {
        // Listen for custom login events from login.html
        document.addEventListener('loginSubmit', (e) => {
            this.handleLogin(e.detail);
        });

        // Also handle traditional form submission for backward compatibility
        document.addEventListener("DOMContentLoaded", () => {
            const loginForm = document.getElementById("login-form");
            
            if (loginForm) {
                loginForm.addEventListener("submit", (e) => {
                    e.preventDefault();
                    
                    const email = document.getElementById("email").value.trim();
                    const password = document.getElementById("password").value.trim();
                    const rememberMe = document.getElementById("remember-me")?.checked || false;
                    
                    this.handleLogin({ email, password, rememberMe });
                });
            }
        });
    }

    async handleLogin({ email, password, rememberMe }) {
        try {
            // Validate inputs
            if (!email || !password) {
                this.sendLoginResponse(false, "Por favor ingresa tu correo y contraseña");
                return;
            }

            // Validate email format
            if (!this.validateEmail(email)) {
                this.sendLoginResponse(false, "Por favor ingresa un correo válido");
                return;
            }

            const credentials = { correo: email, contraseña: password };

            let data;
            try {
                const response = await fetch(this.API + "/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                });

                data = await response.json();

                if (!response.ok) {
                    throw new Error(data.mensaje || "Error en la autenticación");
                }
            } catch (networkError) {
                console.error("Error de conexión:", networkError);
                this.sendLoginResponse(false, "Error de conexión con el servidor. Verifique su conexión a internet o que el servidor esté en funcionamiento.");
                return;
            }

            // Store token and user data
            localStorage.setItem("token", data.token);
            
            // Store remember me preference
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
                localStorage.setItem("userEmail", email);
            } else {
                localStorage.removeItem("rememberMe");
                localStorage.removeItem("userEmail");
            }

            // Decode token to get user info
            try {
                const decoded = jwt_decode(data.token);
                console.log("Token decodificado:", decoded); // Añadir log para depuración
                localStorage.setItem("user", JSON.stringify(decoded));
                
                // Send success response
                this.sendLoginResponse(true, data.mensaje || "Inicio de sesión exitoso");
                
                // Redirect based on user role
                setTimeout(() => {
                    console.log("Redirigiendo según rol:", decoded.rol); // Añadir log para depuración
                    if (decoded.rol === 'admin') {
                        console.log("Redirigiendo a admin.html");
                        window.location.replace("admin.html");
                    } else {
                        console.log("Redirigiendo a marca.html");
                        window.location.replace("marca.html");
                    }
                }, 1500);
                
            } catch (decodeError) {
                console.error('Error decoding token:', decodeError);
                // Fallback redirect
                setTimeout(() => {
                    console.log("Redirigiendo a dashboard.html (fallback)");
                    window.location.replace("dashboard.html");
                }, 1500);
            }

        } catch (error) {
            console.error('Login error:', error);
            this.sendLoginResponse(false, error.message || "Ocurrió un problema al iniciar sesión");
        }
    }

    sendLoginResponse(success, message) {
        // Send response event for login.html to handle
        const responseEvent = new CustomEvent('loginResponse', {
            detail: { success, message }
        });
        document.dispatchEvent(responseEvent);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Method to check if user is already logged in
    static checkExistingLogin() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                
                // Check if token is still valid
                if (decoded.exp * 1000 > Date.now()) {
                    // Token is valid, redirect to appropriate page
                    if (decoded.rol === 'admin') {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "marca.html";
                    }
                    return true;
                } else {
                    // Token expired, remove it
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } catch (error) {
                // Invalid token, remove it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        return false;
    }

    // Method to populate remembered email
    static populateRememberedEmail() {
        const rememberMe = localStorage.getItem('rememberMe');
        const userEmail = localStorage.getItem('userEmail');
        
        if (rememberMe === 'true' && userEmail) {
            const emailInput = document.getElementById('email');
            const rememberCheckbox = document.getElementById('remember-me');
            
            if (emailInput) emailInput.value = userEmail;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    }
}

// Initialize login manager
const loginManager = new LoginManager();

// Check for existing login on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only check existing login if we're on login page
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('index.html')) {
        if (!LoginManager.checkExistingLogin()) {
            // Populate remembered email if available
            LoginManager.populateRememberedEmail();
        }
    }
});

// Export for global access
window.loginAPI = {
    handleLogin: (credentials) => loginManager.handleLogin(credentials),
    checkExistingLogin: LoginManager.checkExistingLogin,
    populateRememberedEmail: LoginManager.populateRememberedEmail
};