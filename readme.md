# Note Taker App

A simple yet powerful web application for taking notes, with user authentication and multi-language support.

## Description

Note Taker is a Single Page Application (SPA) that allows users to sign up, log in, and manage their personal notes. The notes are securely saved in the browser's local storage, associated with each user account. The interface is clean, modern, and fully responsive.

## ✨ Key Features

*   **User Authentication**: Sign-up and login system. Each user has their own private space for notes.
*   **Full Note Management (CRUD)**:
    *   **Create**: Add new notes with a title, content, and tags.
    *   **Read**: View all your notes in a numbered list.
    *   **Update**: Edit the content of your existing notes.
    *   **Delete**: Permanently delete notes with a confirmation dialog.
*   **Archive & Unarchive**: Move notes to an "Archived" section to keep your main list clean without deleting them.
*   **Tagging System**: Organize your notes by adding comma-separated tags.
*   **Multi-language Support**: The interface can be dynamically switched between **Spanish** and **English**.
*   **Modern and Attractive Design**: An elegant interface with subtle animations and a responsive design that adapts to any device.
*   **Data Persistence**: Notes and user accounts are saved in the browser's `localStorage`, and the session is maintained with `sessionStorage`.

## 🚀 Technologies Used

*   **HTML5**: For the semantic structure of the content.
*   **CSS3**: For the design, animations, and responsive styling. It uses Flexbox and a modern layout.
*   **JavaScript (ES6+)**: For all the application logic, including DOM manipulation, event handling, authentication, and data persistence.

## ⚙️ Installation and Usage

This project does not require a server or complex dependencies. To run it locally, follow these steps:

1.  Clone or download this repository to your local machine.
2.  Open the project folder.
3.  Double-click the `login.html` file to open it in your preferred web browser (e.g., Google Chrome, Firefox).

## 📖 How It Works

1.  **Sign Up**: On the homepage, create a new account by providing a username and password.
2.  **Login**: Use your credentials to access your notes dashboard.
3.  **Create a Note**: Fill out the form with a title, content, and tags (optional, comma-separated) and click "Save Note".
4.  **Manage Notes**:
    *   Click **Edit** to modify a note.
    *   Click **Archive** to move it to the "Archived Notes" view.
    *   Click **Delete** to remove it.
5.  **Switch Language**: Use the **ES/EN** buttons in the top-right corner to change the interface language.
6.  **Logout**: Click the "Logout" button to securely sign out of your account.

