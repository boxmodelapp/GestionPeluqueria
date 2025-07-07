# Salon Elite - Sistema de Reserva de Turnos

Sistema completo de gestión de citas para peluquerías con roles diferenciados para clientes, peluqueros y administradores.

## 🚀 Características

- **Sistema de roles**: Cliente, Peluquero, Administrador
- **Gestión de citas**: Reserva, confirmación, cancelación
- **Panel administrativo**: Gestión de servicios y personal
- **Agenda de peluqueros**: Vista personalizada de citas
- **Acceso como invitado**: Reservas sin registro
- **Diseño responsive**: Optimizado para móvil y desktop

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify/Vercel Ready

## 📦 Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🌐 Deployment

### Netlify
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Importa tu proyecto
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### Hosting tradicional
1. Ejecuta `npm run build`
2. Sube la carpeta `dist` a tu servidor
3. Configura el servidor para SPA (archivo .htaccess incluido)

## 👥 Usuarios de Prueba

- **Admin**: admin@salon.com / password
- **Peluquero**: peluquero@salon.com / password  
- **Cliente**: cliente@salon.com / password
- **Invitado**: Solo nombre y teléfono

## 📱 Funcionalidades por Rol

### Cliente
- Reservar citas
- Ver historial de citas
- Gestionar perfil

### Peluquero
- Ver agenda personal
- Confirmar/cancelar citas
- Gestionar perfil con foto

### Administrador
- Gestión completa de servicios
- Administración de peluqueros
- Vista global de citas
- Configuración del salón

## 🎨 Personalización

El sistema incluye configuración de salón personalizable:
- Nombre y logo
- Colores y branding
- Información de contacto
- Servicios y precios

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.