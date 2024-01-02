const asyncHandler = require("express-async-handler");

const { Note } = require("../model/Notes");

exports.createNote = asyncHandler(async (req, res) => {

    const { title, description } = req.body;
    const newNote = new Note({ title, description });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);

});

exports.getNotes = asyncHandler(async (req, res) => {

    const notes = await Note.find();
    res.json(notes);

})

exports.getNoteById = asyncHandler(async (req, res) => {

    const note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);

})

exports.updateNote = asyncHandler(async (req, res) => {

    const { title, description } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { title, description, updatedAt: Date.now() },
        { new: true }
    );
    if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNote);

})

exports.deleteNote = asyncHandler(async (req, res) => {

    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });

})
 