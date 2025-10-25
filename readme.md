# Note Taker App

A simple yet powerful web application for taking notes, with user authentication and multi-language support.

## Description

Note Taker is a Single Page Application (SPA) that allows users to sign up, log in, and manage their personal notes. Notes are stored in the browser's localStorage and are associated with each user account. The interface is clean, modern, and fully responsive.

## ✨ Key Features

- **User Authentication**: Sign-up and login system. Each user has a private space for notes.
- **Full Note Management (CRUD)**:
  - **Create**: Add new notes with a title, content, and tags.
  - **Read**: View all your notes in a numbered list.
  - **Update**: Edit existing notes (editing works for both active and archived notes).
  - **Delete**: Permanently delete notes with a confirmation dialog.
- **Archive & Unarchive**: Move notes to an "Archived" section to keep the main list clean without deleting them.
- **Tagging System**: Organize notes with comma-separated tags.
- **Multi-language Support**: Switch the interface between Spanish and English.
- **Modern Design**: Elegant UI with subtle animations and a responsive layout.
- **Data Persistence**: Notes and user accounts are saved in the browser's `localStorage`; session is kept in `sessionStorage`.

## ✅ Registration and Login

On the login page you will see a "Register" button. Click it to reveal the registration form and create a new account. After successful registration you can log in with the new credentials to access your notes.

## 🚀 Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**

## ⚙️ Installation and Usage

This project does not require a server or complex dependencies. To run it locally:

1. Clone or download this repository to your machine.
2. Open the project folder.
3. Open `login.html` in your web browser.

Usage flow:
1. If you don't have an account, click the "Register" button on the login page, fill the form and submit.
2. Log in with your credentials.
3. Create, edit, archive/unarchive, tag and delete your notes.
4. Switch languages using the language buttons (ES/EN).
5. Log out to end the session.

## 📖 Notes

- All data is stored locally in the browser; clearing browser storage will remove accounts and notes.
- Editing an archived note will show the form and allow modifications without automatically changing its archived status.

## License

This project is provided as-is for learning and development purposes.

