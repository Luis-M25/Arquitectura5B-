const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Rutas para notas
router.get('/search', notesController.searchNotes);  // Debe ir antes que /:id
router.get('/', notesController.getAllNotes);
router.get('/:id', notesController.getNoteById);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;