const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const noteData = require('./data/note');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('home', { noteData });
})
app.get('/addCard', (req, res) => {
    res.render('addNewNote');
})

app.post('/createNewNote', (req, res) => {
    let title = req.body.title;
    let note = req.body.note;
    let noteId = noteData[noteData.length - 1].id;
    const insertNewData = {
        id: noteId + 1,
        title: title,
        notes: note
    }
    noteData.push(insertNewData);
    res.redirect('/');
})

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    let index = noteData.findIndex(note => note.id == id);
    if (index !== -1) {
        noteData.splice(index, 1);
    }
    res.redirect('/');
}) 

app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    let note = noteData.find((data) => data.id == id);
    res.render('editNote', { note })
})
app.post('/updateNote/:id', (req, res) => {
    let id = req.params.id;
    let updatedTitle = req.body.title;
    let updatedNotes = req.body.note;
    let index = noteData.findIndex((data) => data.id == id);
    noteData[index].title = updatedTitle;
    noteData[index].notes = updatedNotes;
    res.redirect('/');
})

PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port`);
})