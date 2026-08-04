const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Crear carpeta si no existe
if (!fs.existsSync('./optimizadas')) {
  fs.mkdirSync('./optimizadas');
}

// Obtener todas las imágenes .jpg y .jpeg"
const archivos = fs.readdirSync('.')
  .filter(f => (f.endsWith('.jpg') || f.endsWith('.jpeg')));

console.log(`Procesando ${archivos.length} imágenes...\n`);

archivos.forEach(async (archivo) => {
  const nombre = path.parse(archivo).name;
  
  try {
    // Generar WebP con resize y calidad ajustada
    await sharp(archivo)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(`./optimizadas/${nombre}.webp`);
    
    // Generar JPG optimizado
    await sharp(archivo)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 75, mozjpeg: true })
      .toFile(`./optimizadas/${nombre}.jpg`);
    
    // Obtener tamaños
    const statsWebp = fs.statSync(`./optimizadas/${nombre}.webp`);
    const statsJpg = fs.statSync(`./optimizadas/${nombre}.jpg`);
    
    console.log(`✓ ${archivo}`);
    console.log(`  WebP: ${(statsWebp.size / 1024).toFixed(0)} KB`);
    console.log(`  JPG:  ${(statsJpg.size / 1024).toFixed(0)} KB\n`);
    
  } catch (error) {
    console.log(`✗ Error procesando ${archivo}: ${error.message}`);
  }
});
