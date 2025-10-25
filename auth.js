document.addEventListener("DOMContentLoaded", () => {
  
  applyTranslations();

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginError = document.getElementById("login-error");
  const registerMessage = document.getElementById("register-message");

  const lang = getLanguage();

  // Si ya hay sesión, redirigir
  if (sessionStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
  }

  // Ocultar el formulario de registro por defecto y añadir botón para mostrarlo
  if (registerForm) {
    registerForm.style.display = "none";

    // Crear botón de mostrar registro si no existe
    let showRegisterBtn = document.getElementById("show-register-btn");
    if (!showRegisterBtn) {
      showRegisterBtn = document.createElement("button");
      showRegisterBtn.id = "show-register-btn";
      showRegisterBtn.type = "button";
      showRegisterBtn.textContent = translations[lang].registerButton || "Registrar";

      // Copiar clases de un botón existente para mantener el mismo estilo
      const sampleBtn =
        document.querySelector("button.btn-action, button[type='submit'], .view-btn, .btn") ||
        document.querySelector("button");
      if (sampleBtn) {
        showRegisterBtn.className = sampleBtn.className;
      } else {
        // fallback si no hay ningún botón para copiar
        showRegisterBtn.className = "btn-action";
      }

      // Insertar el botón justo antes del formulario de registro
      registerForm.parentNode.insertBefore(showRegisterBtn, registerForm);
    } else {
      showRegisterBtn.style.display = "";
      showRegisterBtn.textContent = translations[lang].registerButton || "Registrar";
    }

    showRegisterBtn.addEventListener("click", () => {
      registerForm.style.display = "";
      showRegisterBtn.style.display = "none";
      const firstInput = registerForm.querySelector("input, textarea, select");
      if (firstInput) firstInput.focus();
    });
  }

  /**
   * Obtiene los usuarios desde localStorage.
   * @returns {Array}
   */
  const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
  };

  /**
   * Guarda los usuarios en localStorage.
   * @param {Array} users
   */
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const lang = getLanguage();

    const users = getUsers();

    if (users.find((user) => user.username === username)) {
      registerMessage.textContent = translations[lang].registerUserExists;
      registerMessage.className = "error-message";
      return;
    }

    users.push({ username, password });
    saveUsers(users);

    registerMessage.textContent = translations[lang].registerSuccess;
    registerMessage.className = "success-message";
    registerForm.reset();

    // Ocultar el formulario de registro después del registro exitoso y mostrar el botón
    if (registerForm) registerForm.style.display = "none";
    const showRegisterBtn = document.getElementById("show-register-btn");
    if (showRegisterBtn) showRegisterBtn.style.display = "";
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const lang = getLanguage();
    loginError.textContent = "";

    const users = getUsers();
    const user = users.find((u) => u.username === username);

    if (user && user.password === password) {
      sessionStorage.setItem("loggedInUser", username);

      window.location.href = "index.html";
    } else {
      loginError.textContent = translations[lang].loginError;
    }
  });
});
