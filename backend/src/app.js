require('dotenv').config();
const express = require('express');
const path = require('path');
const corsMiddleware = require('./middleware/cors');
const notesRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware global
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ¡NUEVO! Servir archivos estáticos de React
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
app.use('/api/notes', notesRoutes);

// Ruta de prueba
app.get('/api', (req, res) => {
  res.json({ 
    message: '🚀 API de Notas funcionando correctamente!',
    version: '1.0.0',
    endpoints: {
      'GET /api/notes': 'Obtener todas las notas',
      'GET /api/notes/:id': 'Obtener nota por ID',
      'POST /api/notes': 'Crear nueva nota',
      'PUT /api/notes/:id': 'Actualizar nota',
      'DELETE /api/notes/:id': 'Eliminar nota',
      'GET /api/notes/search?q=término': 'Buscar notas'
    }
  });
});

// Ruta para verificar conexión con Supabase
app.get('/api/health', async (req, res) => {
  try {
    const supabase = require('./config/supabase');
    const { data, error } = await supabase
      .from('notes')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    
    res.json({
      status: 'OK',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'Disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ¡NUEVO! Catch-all handler para React Router
// Esto debe ir DESPUÉS de todas las rutas de API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// ¡CRÍTICO! Iniciar servidor con host 0.0.0.0 para Cloud Run
app.listen(PORT, '0.0.0.0', () => {
  console.log('='.repeat(50));
  console.log('🚀 SERVIDOR DE NOTAS INICIADO');
  console.log('='.repeat(50));
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 URL: http://0.0.0.0:${PORT}`);
  console.log(`🔗 API: http://0.0.0.0:${PORT}/api/notes`);
  console.log(`💚 Health: http://0.0.0.0:${PORT}/api/health`);
  console.log('='.repeat(50));
  console.log('📋 Endpoints disponibles:');
  console.log('   GET    /api/notes          - Listar notas');
  console.log('   POST   /api/notes          - Crear nota');
  console.log('   GET    /api/notes/:id      - Obtener nota');
  console.log('   PUT    /api/notes/:id      - Actualizar nota');
  console.log('   DELETE /api/notes/:id      - Eliminar nota');
  console.log('   GET    /api/notes/search   - Buscar notas');
  console.log('='.repeat(50));
});

module.exports = app;