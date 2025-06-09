import React, { useState, useEffect } from 'react';
import { notesAPI } from './services/api';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  // Cargar notas al iniciar
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAllNotes();
      setNotes(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las notas');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      const response = await notesAPI.createNote(noteData);
      setNotes(prev => [response.data.data, ...prev]);
      return true;
    } catch (err) {
      setError('Error al crear la nota');
      console.error('Error:', err);
      return false;
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.updateNote(id, noteData);
      setNotes(prev => prev.map(note => 
        note.id === id ? response.data.data : note
      ));
      setEditingNote(null);
      return true;
    } catch (err) {
      setError('Error al actualizar la nota');
      console.error('Error:', err);
      return false;
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta nota?')) {
      try {
        await notesAPI.deleteNote(id);
        setNotes(prev => prev.filter(note => note.id !== id));
      } catch (err) {
        setError('Error al eliminar la nota');
        console.error('Error:', err);
      }
    }
  };

  const handleSearch = (filteredNotes) => {
    setNotes(filteredNotes);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando notas...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Sistema de Notas
          </h1>
          <p className="text-gray-600">Organiza tus ideas de manera sencilla</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel izquierdo - Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingNote ? 'Editar Nota' : 'Nueva Nota'}
              </h2>
              <NoteForm
                onSubmit={editingNote ? 
                  (data) => handleUpdateNote(editingNote.id, data) : 
                  handleCreateNote
                }
                initialData={editingNote}
                onCancel={() => setEditingNote(null)}
                isEditing={!!editingNote}
              />
            </div>
          </div>

          {/* Panel derecho - Lista de notas */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <SearchBar onSearch={handleSearch} onClear={loadNotes} />
            </div>

            <div className="space-y-4">
              {notes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    No hay notas
                  </h3>
                  <p className="text-gray-500">
                    Crea tu primera nota usando el formulario
                  </p>
                </div>
              ) : (
                notes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={setEditingNote}
                    onDelete={handleDeleteNote}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;