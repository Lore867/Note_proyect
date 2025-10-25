const translations = {
  es: {
    loginPageTitle: "Iniciar Sesión - Note Taker",
    appPageTitle: "Note Taker",

    mainHeader: "Note Taker",

    loginHeader: "Iniciar Sesión",
    loginUsernamePlaceholder: "Usuario",
    loginPasswordPlaceholder: "Contraseña",
    loginButton: "Entrar",
    loginError: "Usuario o contraseña incorrectos.",
    registerHeader: "¿No tienes cuenta? Regístrate",
    registerUsernamePlaceholder: "Elige un usuario",
    registerPasswordPlaceholder: "Elige una contraseña",
    registerButton: "Registrar",
    registerUserExists: "El usuario ya existe.",
    registerSuccess: "¡Registro exitoso! Ahora puedes iniciar sesión.",

    logoutButton: "Cerrar Sesión",
    activeNotes: "Notas Activas",
    archivedNotes: "Notas Archivadas",
    formTitlePlaceholder: "Título",
    formContentPlaceholder: "Contenido de la nota",
    formTagsPlaceholder: "Etiquetas (separadas por coma)",
    saveNoteButton: "Guardar Nota",
    saveChangesButton: "Guardar Cambios",
    noNotes: "No hay notas para mostrar.",
    errorLoadingNotes:
      "Ocurrió un error al cargar las notas. Inténtalo de nuevo más tarde.",
    editButton: "Editar",
    deleteButton: "Eliminar",
    archiveButton: "Archivar",
    unarchiveButton: "Desarchivar",
    confirmDeleteMessage: "¿Estás seguro de que quieres eliminar esta nota?",
    confirmButton: "Confirmar",
    cancelButton: "Cancelar",
    errorSavingNote: "No se pudo guardar la nota.",
  },
  en: {
    loginPageTitle: "Login - Note Taker",
    appPageTitle: "Note Taker",

    mainHeader: "Note Taker",

    loginHeader: "Login",
    loginUsernamePlaceholder: "Username",
    loginPasswordPlaceholder: "Password",
    loginButton: "Login",
    loginError: "Incorrect username or password.",
    registerHeader: "Don't have an account? Sign Up",
    registerUsernamePlaceholder: "Choose a username",
    registerPasswordPlaceholder: "Choose a password",
    registerButton: "Sign Up",
    registerUserExists: "User already exists.",
    registerSuccess: "Registration successful! You can now log in.",

    logoutButton: "Logout",
    activeNotes: "Active Notes",
    archivedNotes: "Archived Notes",
    formTitlePlaceholder: "Title",
    formContentPlaceholder: "Note content",
    formTagsPlaceholder: "Tags (comma separated)",
    saveNoteButton: "Save Note",
    saveChangesButton: "Save Changes",
    noNotes: "No notes to display.",
    errorLoadingNotes:
      "An error occurred while loading notes. Please try again later.",
    editButton: "Edit",
    deleteButton: "Delete",
    archiveButton: "Archive",
    unarchiveButton: "Unarchive",
    confirmDeleteMessage: "Are you sure you want to delete this note?",
    confirmButton: "Confirm",
    cancelButton: "Cancel",
    errorSavingNote: "Could not save the note.",
  },
};

const getLanguage = () => {
  return localStorage.getItem("language") || "en";
};

const setLanguage = (lang) => {
  localStorage.setItem("language", lang);
  window.location.reload();
};

const applyTranslations = () => {
  const lang = getLanguage();
  document.querySelectorAll("[data-key]").forEach((element) => {
    const key = element.getAttribute("data-key");
    if (translations[lang][key]) {
      const translation = translations[lang][key];
      if (element.placeholder) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  const pageTitleKey = document.body.dataset.page;
  if (pageTitleKey && translations[lang][pageTitleKey]) {
    document.title = translations[lang][pageTitleKey];
  }
};
