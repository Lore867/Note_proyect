document.addEventListener("DOMContentLoaded", () => {
  // Aplicar traducciones al cargar la página
  applyTranslations();

  // --- VERIFICACIÓN DE SESIÓN ---
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html";
    return;
  }

  const noteForm = document.getElementById("note-form");
  const notesContainer = document.getElementById("notes-container");
  const viewButtonsContainer = document.getElementById("view-buttons");
  const confirmModal = document.getElementById("confirm-modal");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");

  let currentView = "active";

  /**
   * Obtiene todas las notas desde localStorage.
   * @returns {Array} Un array de objetos de nota.
   */
  const getNotesFromStorage = () => {
    const notesJSON = localStorage.getItem(`notes_${loggedInUser}`);
    return notesJSON ? JSON.parse(notesJSON) : [];
  };

  /**
   * Guarda un array de notas en localStorage.
   * @param {Array} notes - El array de notas a guardar.
   */
  const saveNotesToStorage = (notes) => {
    localStorage.setItem(`notes_${loggedInUser}`, JSON.stringify(notes));
  };

  const loadNotes = () => {
    try {
      let allNotes = getNotesFromStorage();

      let filteredNotes = allNotes.filter((note) => {
        return note.isArchived === (currentView === "archived");
      });

      filteredNotes.sort((a, b) => b.id - a.id);

      notesContainer.innerHTML = "";
      const lang = getLanguage();
      if (filteredNotes.length === 0) {
        notesContainer.innerHTML = `<p data-key="noNotes">${translations[lang].noNotes}</p>`;
      } else {
        filteredNotes.forEach((note, index) => {
          notesContainer.appendChild(renderNote(note, index + 1));
        });
      }
      updateViewButtons();
    } catch (error) {
      console.error("Error al cargar las notas desde localStorage:", error);
      notesContainer.innerHTML = `<p data-key="errorLoadingNotes">${
        translations[getLanguage()].errorLoadingNotes
      }</p>`;
    }
  };

  /**
   * Crea el elemento HTML para una nota individual.
   * @param {object} note - El objeto de la nota.
   * @param {number} number - El número de la nota en la lista.
   * @returns {HTMLElement} El elemento div de la nota.
   */
  const renderNote = (note, number) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("card", "note");
    noteEl.dataset.id = note.id;

    const lang = getLanguage();
    const tagsHtml = (note.tags || [])
      .map((tag) => `<span>${tag}</span>`)
      .join(" ");
    const archiveBtnText = note.isArchived
      ? translations[lang].unarchiveButton
      : translations[lang].archiveButton;
    const editBtnText = translations[lang].editButton;
    const deleteBtnText = translations[lang].deleteButton;
    noteEl.innerHTML = `
            <h3>${number}. ${note.title}</h3>
            <p>${note.content}</p>
            <div class="note-tags">${tagsHtml}</div>
            <div class="note-actions">
                <button class="btn-action edit-note" data-id="${note.id}">${editBtnText}</button>
                <button class="btn-action delete-note" data-id="${note.id}">${deleteBtnText}</button>
                <button class="btn-action toggle-archive" data-id="${note.id}" data-status="${note.isArchived}">${archiveBtnText}</button>
            </div>
        `;
    return noteEl;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const tags = document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const editingId = noteForm.dataset.editingId;
    let allNotes = getNotesFromStorage();

    if (editingId) {
      const noteIndex = allNotes.findIndex((note) => note.id == editingId);
      if (noteIndex > -1) {
        allNotes[noteIndex] = { ...allNotes[noteIndex], title, content, tags };
      }
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        tags,
        isArchived: false,
      };
      allNotes.push(newNote);
    }

    try {
      saveNotesToStorage(allNotes);
      noteForm.reset();
      delete noteForm.dataset.editingId;
      // Restaurar texto del botón
      noteForm.querySelector('button[type="submit"]').textContent =
        translations[getLanguage()].saveNoteButton;
      loadNotes();
    } catch (error) {
      console.error("Error al guardar la nota en localStorage:", error);
      alert(translations[getLanguage()].errorSavingNote);
    }
  };

  const loadNoteForEdit = (noteId) => {
    try {
      const allNotes = getNotesFromStorage();
      const note = allNotes.find((n) => n.id == noteId);

      if (!note) throw new Error("Nota no encontrada");
      document.getElementById("title").value = note.title;
      document.getElementById("content").value = note.content;
      document.getElementById("tags").value = note.tags.join(", ");

      noteForm.dataset.editingId = noteId;
      // Cambiar texto del botón a "Guardar Cambios"
      noteForm.querySelector('button[type="submit"]').textContent =
        translations[getLanguage()].saveChangesButton;
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error al cargar nota para editar:", error);
    }
  };

  const deleteNote = (noteId) => {
    confirmModal.style.display = "flex";

    const handleConfirm = () => {
      try {
        let allNotes = getNotesFromStorage();
        const updatedNotes = allNotes.filter((note) => note.id != noteId);
        saveNotesToStorage(updatedNotes);
        loadNotes();
      } catch (error) {
        console.error("Error al eliminar la nota de localStorage:", error);
      } finally {
        closeModal();
      }
    };

    const closeModal = () => {
      confirmModal.style.display = "none";
      modalConfirmBtn.removeEventListener("click", handleConfirm);
    };

    modalConfirmBtn.removeEventListener("click", handleConfirm);
    modalCancelBtn.removeEventListener("click", closeModal);

    modalConfirmBtn.addEventListener("click", handleConfirm);
    modalCancelBtn.addEventListener("click", closeModal);
  };

  const toggleArchiveStatus = (noteId) => {
    try {
      let allNotes = getNotesFromStorage();
      const noteIndex = allNotes.findIndex((note) => note.id == noteId);
      if (noteIndex > -1) {
        allNotes[noteIndex].isArchived = !allNotes[noteIndex].isArchived;
      }
      saveNotesToStorage(allNotes);
      loadNotes();
    } catch (error) {
      console.error(
        "Error al cambiar estado de archivo en localStorage:",
        error
      );
    }
  };

  const updateViewButtons = () => {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.toggle("active-view", btn.dataset.view === currentView);
    });
  };

  loadNotes();

  noteForm.addEventListener("submit", handleFormSubmit);

  notesContainer.addEventListener("click", (e) => {
    const target = e.target;
    const noteId = target.dataset.id;

    if (target.classList.contains("edit-note")) {
      loadNoteForEdit(noteId);
    } else if (target.classList.contains("delete-note")) {
      deleteNote(noteId);
    } else if (target.classList.contains("toggle-archive")) {
      toggleArchiveStatus(noteId);
    }
  });

  notesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tag-link")) {
      e.preventDefault();
    }
  });

  viewButtonsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-btn")) {
      currentView = e.target.dataset.view;
      loadNotes();
    }
  });

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
});
