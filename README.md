# 📝 Sistema de Gestión de Notas

Una aplicación web full-stack moderna para crear, editar, buscar y gestionar notas personales.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Tailwind CSS** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos
- **Axios** - Cliente HTTP para comunicación con la API

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista
- **Supabase** - Base de datos PostgreSQL como servicio
- **CORS** - Middleware para manejar solicitudes de origen cruzado

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Supabase** - Backend as a Service

## 📋 Funcionalidades

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar notas
- ✅ **Búsqueda Avanzada**: Buscar por título y contenido
- ✅ **Interfaz Responsiva**: Diseño adaptativo para todos los dispositivos
- ✅ **Timestamps Automáticos**: Fechas de creación y actualización automáticas
- ✅ **API RESTful**: Endpoints bien estructurados y documentados

## 🛠️ Instalación y Configuración

### Prerequisitos
- Node.js (v16 o superior)
- Cuenta de Supabase
- Git

### Backend
```bash
cd backend
npm install
```

Crear archivo `.env`:
```env
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
PORT=8080
```

### Frontend
```bash
cd frontend
npm install
```

### Base de Datos
Ejecutar el script `database/schema.sql` en tu proyecto de Supabase.

## 🚀 Ejecución

### Desarrollo
```bash
# Backend (puerto 8080)
cd backend
npm run dev

# Frontend (puerto 3000)
cd frontend
npm start
```

### Producción
```bash
# Backend
cd backend
npm start
```

## 📡 Endpoints de la API

- `GET /api/notes` - Obtener todas las notas
- `GET /api/notes/:id` - Obtener una nota específica
- `POST /api/notes` - Crear nueva nota
- `PUT /api/notes/:id` - Actualizar nota
- `DELETE /api/notes/:id` - Eliminar nota
- `GET /api/notes/search?q=término` - Buscar notas
- `GET /api/health` - Verificar estado de la API y BD

## 🏗️ Estructura del Proyecto

```
├── backend/                 # Servidor Express.js
│   ├── src/
│   │   ├── app.js          # Aplicación principal
│   │   ├── config/         # Configuraciones
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── middleware/     # Middlewares personalizados
│   │   └── routes/         # Definición de rutas
│   └── package.json
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── services/       # Servicios para API
│   │   └── App.jsx         # Componente principal
│   └── package.json
├── database/               # Scripts de base de datos
│   ├── schema.sql          # Esquema de la BD
│   └── seed.sql            # Datos de prueba
└── README.md
```

## 👨‍💻 Desarrollado por

Proyecto de Arquitectura de Software - 5B

---

⭐ Si te gusta este proyecto, ¡dale una estrella!