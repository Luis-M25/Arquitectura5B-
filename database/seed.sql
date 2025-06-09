-- Datos de prueba para la tabla notes
INSERT INTO notes (title, content) VALUES
('Bienvenido al Sistema de Notas', 'Esta es tu primera nota de ejemplo. Puedes crear, editar, buscar y eliminar notas fácilmente desde la interfaz web.'),
('Ideas para el Proyecto', 'Algunas mejoras que se podrían implementar:
- Categorías para organizar notas
- Etiquetas (tags)
- Modo oscuro
- Exportar notas a PDF
- Búsqueda avanzada con filtros'),
('Lista de Tareas', 'Cosas por hacer:
- Revisar el código
- Escribir tests unitarios
- Optimizar las consultas a la base de datos
- Añadir validaciones del lado cliente
- Configurar CI/CD'),
('Notas de Arquitectura', 'El proyecto sigue una arquitectura de 3 capas:
1. Frontend (React) - Interfaz de usuario
2. Backend (Express) - API REST
3. Base de Datos (PostgreSQL/Supabase) - Persistencia

Esta separación permite escalabilidad y mantenimiento eficiente.'),
('Comandos Útiles', 'Comandos de Git más utilizados:
- git add .
- git commit -m "mensaje"
- git push origin main
- git pull origin main
- git status
- git log --oneline');