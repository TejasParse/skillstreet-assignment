const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Please enter Title"], 
        minLength: 1 
    },
    description: { 
        type: String, 
        required: [true, "Please enter description"], 
        minLength: 1 
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports.Note = Note;