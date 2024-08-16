Note Taker Application
Overview
The Note Taker application is a web-based tool that allows users to create, view, and delete notes. Built with Express.js for the backend and basic HTML/CSS/JavaScript for the frontend, this application provides a simple interface for managing notes. Notes are stored in a db.json file on the server and are managed using the filesystem.

Features
Landing Page: The initial page presents a link to the notes page.
Notes Page: Displays a list of existing notes and provides a form for creating new notes.
Create Note: Users can enter a title and text for a new note, and save it using the "Save Note" button.
View Note: Clicking on a note in the list shows its details in the form.
Delete Note: Notes can be deleted from the list.
New Note: Users can switch to a new note form to create another note.
Technologies Used
Backend: Node.js with Express.js
Frontend: HTML, CSS, JavaScript
Database: Local JSON file (db.json)
Utilities: UUID for unique note IDs
Getting Started
Prerequisites
Node.js and npm installed on your local machine.
Basic understanding of JavaScript, HTML, and CSS.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/note-taker.git
cd note-taker
Install Dependencies

Navigate to the project directory and run:

bash
Copy code
npm install
Setup File Structure

Ensure your project has the following structure:

java
Copy code
note-taker/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── index.js
│   └── index.html
│   └── notes.html
├── db/
│   └── db.json
├── server.js
├── package.json
Running the Application
Start the Server

bash
Copy code
node server.js
The server will start on port 3001 by default.

Access the Application

Open a web browser and navigate to http://localhost:3001 to see the landing page. Click on the "Get Started" button to access the notes page.

Application Routes
HTML Routes
GET /: Serves the index.html file from the public directory.
GET /notes: Serves the notes.html file from the public directory.
API Routes
GET /api/notes: Returns all saved notes as JSON from db.json.
POST /api/notes: Receives a new note, adds it to db.json, and returns the new note.
DELETE /api/notes/:id: Deletes a note with the specified ID from db.json.
Code Explanation
server.js
Setup: Configures the Express server and middleware for JSON parsing and static file serving.
HTML Routes: Defines routes for serving HTML files.
API Routes: Handles reading, saving, and deleting notes from the db.json file.
public/index.html
Landing Page: Includes a link to the notes page and a "Get Started" button.
public/notes.html
Notes Page: Contains a form for creating new notes and a list for displaying existing notes. Includes buttons for saving, creating new, and clearing notes.
public/js/index.js
JavaScript Logic: Handles note creation, viewing, and deletion. Updates the UI based on user interactions.
Troubleshooting
Buttons Not Displaying: Ensure that you have correctly linked styles.css and index.js and that they are served correctly by the Express server.
404 Errors: Verify that the file paths in your HTML are correct and that the files are located in the correct directories.
Contributing
Feel free to submit issues or pull requests to improve the application. Contributions are welcome!

License
This project is licensed under the MIT License. See the LICENSE file for details.







