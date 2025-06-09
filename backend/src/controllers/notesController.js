const supabase = require('../config/supabase');

const notesController = {
  // GET /api/notes - Obtener todas las notas
  getAllNotes: async (req, res) => {
    try {
      console.log('Obteniendo todas las notas...');
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error al obtener notas:', error);
        throw error;
      }
      
      console.log(`Se encontraron ${data.length} notas`);
      res.json({
        success: true,
        data: data,
        count: data.length
      });
      
    } catch (error) {
      console.error('Error en getAllNotes:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // GET /api/notes/:id - Obtener una nota específica
  getNoteById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Obteniendo nota con ID: ${id}`);
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({
            success: false,
            error: 'Nota no encontrada'
          });
        }
        throw error;
      }
      
      res.json({
        success: true,
        data: data
      });
      
    } catch (error) {
      console.error('Error en getNoteById:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // POST /api/notes - Crear nueva nota
  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      
      // Validación
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Título y contenido son requeridos'
        });
      }
      
      if (title.trim().length === 0 || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Título y contenido no pueden estar vacíos'
        });
      }
      
      console.log('Creando nueva nota:', { title: title.substring(0, 20) + '...' });
      
      const { data, error } = await supabase
        .from('notes')
        .insert([{ 
          title: title.trim(), 
          content: content.trim() 
        }])
        .select();
      
      if (error) {
        console.error('Error al crear nota:', error);
        throw error;
      }
      
      console.log('Nota creada exitosamente con ID:', data[0].id);
      res.status(201).json({
        success: true,
        data: data[0],
        message: 'Nota creada exitosamente'
      });
      
    } catch (error) {
      console.error('Error en createNote:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // PUT /api/notes/:id - Actualizar nota
  updateNote: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      
      // Validación
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Título y contenido son requeridos'
        });
      }
      
      if (title.trim().length === 0 || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Título y contenido no pueden estar vacíos'
        });
      }
      
      console.log(`Actualizando nota con ID: ${id}`);
      
      const { data, error } = await supabase
        .from('notes')
        .update({ 
          title: title.trim(), 
          content: content.trim() 
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error al actualizar nota:', error);
        throw error;
      }
      
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Nota no encontrada'
        });
      }
      
      console.log('Nota actualizada exitosamente');
      res.json({
        success: true,
        data: data[0],
        message: 'Nota actualizada exitosamente'
      });
      
    } catch (error) {
      console.error('Error en updateNote:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // DELETE /api/notes/:id - Eliminar nota
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Eliminando nota con ID: ${id}`);
      
      const { data, error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error al eliminar nota:', error);
        throw error;
      }
      
      if (data.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Nota no encontrada'
        });
      }
      
      console.log('Nota eliminada exitosamente');
      res.json({
        success: true,
        message: 'Nota eliminada exitosamente'
      });
      
    } catch (error) {
      console.error('Error en deleteNote:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // GET /api/notes/search?q=termino - Buscar notas
  searchNotes: async (req, res) => {
    try {
      const { q } = req.query;
      
      if (!q || q.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Término de búsqueda requerido'
        });
      }
      
      console.log(`Buscando notas con término: "${q}"`);
      
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .or(`title.ilike.%${q}%,content.ilike.%${q}%`)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error en búsqueda:', error);
        throw error;
      }
      
      console.log(`Se encontraron ${data.length} notas que coinciden`);
      res.json({
        success: true,
        data: data,
        count: data.length,
        searchTerm: q
      });
      
    } catch (error) {
      console.error('Error en searchNotes:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
};

module.exports = notesController;