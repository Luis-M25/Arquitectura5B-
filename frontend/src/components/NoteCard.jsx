import React from 'react';
import { Edit, Trash2, Calendar } from 'lucide-react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
          {note.title}
        </h3>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Editar nota"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Eliminar nota"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {note.content}
      </p>

      <div className="flex items-center text-sm text-gray-500">
        <Calendar size={14} className="mr-1" />
        <span>Creada: {formatDate(note.created_at)}</span>
        {note.updated_at !== note.created_at && (
          <span className="ml-4">
            • Actualizada: {formatDate(note.updated_at)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;