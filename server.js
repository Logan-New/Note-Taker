const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// HTML Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read notes' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Title and text are required' });
  }

  const newNote = {
    title,
    text,
    id: uuidv4()
  };

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read notes' });
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to save note' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read notes' });
    } else {
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== id);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          res.status(500).json({ error: 'Failed to delete note' });
        } else {
          res.json({ message: 'Note deleted successfully' });
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
