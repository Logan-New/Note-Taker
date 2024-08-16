let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelector('.list-group');
}

// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

// Ensure an element is always visible
const alwaysShow = (elem) => {
  elem.style.display = 'inline'; // Force display to inline
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Get notes from the server
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Save a new note to the server
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

// Delete a note from the server
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

// Render the active note in the textarea
const renderActiveNote = () => {
  if (activeNote.id) {
    // Ensure buttons are always visible
    alwaysShow(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    alwaysShow(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

// Handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Handle deleting a note
const handleNoteDelete = (e) => {
  e.stopPropagation();
  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Set the active note from the list
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Set the active note to an empty object for a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// Handle button visibility based on form input
const handleRenderBtns = () => {
  alwaysShow(saveNoteBtn);
  alwaysShow(clearBtn);
};

// Render the list of notes
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  noteList.innerHTML = '';

  if (jsonNotes.length === 0) {
    noteList.innerHTML = '<li class="list-group-item">No saved Notes</li>';
  } else {
    jsonNotes.forEach((note) => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.dataset.note = JSON.stringify(note);

      const span = document.createElement('span');
      span.classList.add('list-item-title');
      span.innerText = note.title;
      span.addEventListener('click', handleNoteView);

      const delBtn = document.createElement('i');
      delBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
      delBtn.addEventListener('click', handleNoteDelete);

      li.append(span);
      li.append(delBtn);
      noteList.append(li);
    });
  }
};

// Get and render notes on page load
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', () => {
    noteTitle.value = '';
    noteText.value = '';
    handleRenderBtns();
  });
  noteForm.addEventListener('input', handleRenderBtns);
}

getAndRenderNotes();
