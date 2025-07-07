# 🚀 Guía Completa de Deployment en cPanel

## 📋 Requisitos Previos

- ✅ Hosting con cPanel
- ✅ Acceso SSH/Terminal
- ✅ Node.js 18+ instalado
- ✅ npm o yarn disponible

## 🛠️ Método 1: Deployment Directo en el Servidor

### Paso 1: Conectar por SSH
```bash
ssh usuario@tudominio.com
# O usar la terminal de cPanel
```

### Paso 2: Clonar el Proyecto
```bash
# Navegar al directorio home
cd ~

# Clonar tu repositorio
git clone https://github.com/tu-usuario/salon-elite.git
cd salon-elite

# O subir archivos por FTP/File Manager
```

### Paso 3: Instalar Node.js (si no está disponible)
```bash
# Verificar si Node.js está instalado
node --version
npm --version

# Si no está instalado, usar Node Version Manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### Paso 4: Configurar Variables de Entorno
```bash
# Crear archivo .env
cp .env.example .env
nano .env

# Configurar tus variables:
VITE_SALON_NAME="Tu Salón"
VITE_SALON_PHONE="+56 9 1234 5678"
VITE_SALON_EMAIL="contacto@tusalon.com"
VITE_SALON_ADDRESS="Tu dirección completa"
```

### Paso 5: Build y Deploy
```bash
# Dar permisos al script
chmod +x deploy.sh

# Ejecutar deployment
./deploy.sh

# O manualmente:
npm install
npm run build
```

### Paso 6: Mover Archivos a public_html
```bash
# Opción A: Copiar archivos
cp -r dist/* ~/public_html/

# Opción B: Crear symlink (recomendado)
ln -sf ~/salon-elite/dist ~/public_html/salon

# Opción C: Usar rsync
rsync -av --delete dist/ ~/public_html/
```

## 🛠️ Método 2: Build Local + Upload

### Paso 1: Build Local
```bash
# En tu máquina local
npm install
npm run build
```

### Paso 2: Subir Archivos
```bash
# Usando SCP
scp -r dist/* usuario@tudominio.com:~/public_html/

# O usar FileZilla/File Manager de cPanel
# Subir todo el contenido de la carpeta 'dist'
```

## ⚙️ Configuración del Servidor

### 1. Configurar .htaccess
El archivo ya está incluido en `public/.htaccess` y se copia automáticamente al build.

### 2. Configurar Subdirectorio (Opcional)
Si quieres instalar en un subdirectorio:

```bash
# Crear subdirectorio
mkdir ~/public_html/salon
cp -r dist/* ~/public_html/salon/

# Actualizar vite.config.ts
base: '/salon/'
```

### 3. Configurar Dominio/Subdominio
En cPanel:
1. **Subdominios** → Crear nuevo subdominio
2. **Document Root**: `/public_html/salon`
3. O configurar dominio principal para apuntar a la carpeta correcta

## 🔧 Configuraciones Avanzadas

### SSL/HTTPS
```bash
# En cPanel, activar SSL gratuito (Let's Encrypt)
# O configurar redirect HTTP → HTTPS en .htaccess
```

### Compresión y Caché
El archivo `.htaccess` ya incluye:
- ✅ Compresión GZIP
- ✅ Headers de caché
- ✅ Headers de seguridad

### Monitoreo de Logs
```bash
# Ver logs de error
tail -f ~/logs/error_log

# Ver logs de acceso
tail -f ~/logs/access_log
```

## 🚀 Script de Auto-Deploy

### Crear Webhook para Auto-Deploy
```bash
# Crear script webhook.php en public_html
<?php
if ($_POST['secret'] === 'tu_secreto_aqui') {
    shell_exec('cd ~/salon-elite && git pull && npm run build && rsync -av --delete dist/ ~/public_html/');
    echo "Deploy completado";
}
?>
```

### Configurar en GitHub
1. **Settings** → **Webhooks**
2. **Payload URL**: `https://tudominio.com/webhook.php`
3. **Content type**: `application/x-www-form-urlencoded`
4. **Secret**: tu_secreto_aqui

## 📊 Optimizaciones de Rendimiento

### 1. Configurar CDN (Opcional)
```bash
# Usar Cloudflare o similar
# Configurar en cPanel → CloudFlare
```

### 2. Optimizar Imágenes
```bash
# Instalar herramientas de optimización
npm install -g imagemin-cli

# Optimizar imágenes antes del build
imagemin public/images/* --out-dir=public/images/
```

### 3. Configurar Caché del Navegador
Ya incluido en `.htaccess`:
```apache
# Caché por 1 año para assets estáticos
ExpiresByType text/css "access plus 1 year"
ExpiresByType application/javascript "access plus 1 year"
```

## 🔍 Troubleshooting

### Problema: Node.js no disponible
```bash
# Contactar soporte del hosting
# O usar Node.js portable
wget https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-x64.tar.xz
tar -xf node-v18.17.0-linux-x64.tar.xz
export PATH=$PATH:~/node-v18.17.0-linux-x64/bin
```

### Problema: Permisos
```bash
# Corregir permisos
chmod -R 755 ~/public_html/
chown -R $USER:$USER ~/public_html/
```

### Problema: Rutas no funcionan
- ✅ Verificar que `.htaccess` está presente
- ✅ Verificar que mod_rewrite está habilitado
- ✅ Contactar soporte si es necesario

## 📱 Testing Post-Deploy

### Checklist de Verificación
```bash
# 1. Verificar que el sitio carga
curl -I https://tudominio.com

# 2. Verificar rutas SPA
curl -I https://tudominio.com/booking

# 3. Verificar compresión
curl -H "Accept-Encoding: gzip" -I https://tudominio.com

# 4. Verificar headers de seguridad
curl -I https://tudominio.com | grep -i "x-"
```

### Performance Testing
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

## 🔄 Actualizaciones Futuras

### Script de Update
```bash
#!/bin/bash
# update.sh
cd ~/salon-elite
git pull
npm install
npm run build
rsync -av --delete dist/ ~/public_html/
echo "✅ Actualización completada"
```

### Backup Automático
```bash
#!/bin/bash
# backup.sh
tar -czf ~/backups/salon-$(date +%Y%m%d).tar.gz ~/public_html/
echo "✅ Backup creado"
```

## 📞 Soporte

Si encuentras problemas:
1. **Logs del servidor**: `~/logs/error_log`
2. **Consola del navegador**: F12 → Console
3. **Soporte del hosting**: Para configuraciones específicas
4. **Documentación de cPanel**: Para funciones avanzadas