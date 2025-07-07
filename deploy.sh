#!/bin/bash

# Script de deployment para cPanel
# Uso: ./deploy.sh

echo "🚀 Iniciando deployment para cPanel..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json. Ejecuta este script desde la raíz del proyecto.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm install

echo -e "${YELLOW}🔍 Ejecutando linting...${NC}"
npm run lint

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en linting. Corrige los errores antes de continuar.${NC}"
    exit 1
fi

echo -e "${YELLOW}🏗️ Construyendo proyecto para producción...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error en el build. Revisa los errores.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completado exitosamente!${NC}"
echo -e "${YELLOW}📁 Archivos listos en la carpeta 'dist'${NC}"

# Mostrar tamaño del build
echo -e "${YELLOW}📊 Tamaño del build:${NC}"
du -sh dist/

echo -e "${GREEN}🎉 Deployment preparado! Ahora puedes:${NC}"
echo -e "1. Subir la carpeta 'dist' a public_html"
echo -e "2. O usar rsync para sincronizar archivos"
echo -e "3. Configurar el dominio para apuntar a la carpeta correcta"