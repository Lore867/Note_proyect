document.addEventListener("DOMContentLoaded", () => {
  
  applyTranslations();

  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginError = document.getElementById("login-error");
  const registerMessage = document.getElementById("register-message");

  if (sessionStorage.getItem("loggedInUser")) {
    window.location.href = "index.html";
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
