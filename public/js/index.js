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

const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

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

const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.getAttribute('data-note'));
  renderActiveNote();
};

const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderBtns = () => {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  clearBtn.addEventListener('click', () => {
    noteTitle.value = '';
    noteText.value = '';
  });
};

const renderNoteList = (notes) => {
  noteList.innerHTML = '';
  notes.forEach((note) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.setAttribute('data-note', JSON.stringify(note));
    li.innerHTML = `
      <span class="list-item-title">${note.title}</span>
      <i class="fas fa-trash-alt float-end"></i>
    `;
    li.addEventListener('click', handleNoteView);
    li.querySelector('i').addEventListener('click', handleNoteDelete);
    noteList.append(li);
  });
};

const getAndRenderNotes = () => {
  getNotes().then((response) => response.json()).then((data) => renderNoteList(data));
};

if (window.location.pathname === '/notes') {
  handleRenderBtns();
  getAndRenderNotes();
}
