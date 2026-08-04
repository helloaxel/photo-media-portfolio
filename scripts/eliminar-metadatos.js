const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Crear carpeta de salida si no existe
if (!fs.existsSync('./sin-metadatos')) {
  fs.mkdirSync('./sin-metadatos');
}

// Obtener todos los archivos JPG, JPEG y PNG
const archivos = fs.readdirSync('.')
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (archivos.length === 0) {
  console.log('No se encontraron imágenes JPG/JPEG/PNG en esta carpeta.');
  process.exit();
}

console.log(`Procesando ${archivos.length} imágenes...\n`);

archivos.forEach(async (archivo) => {
  const nombre = path.parse(archivo).name;
  const ext = path.parse(archivo).ext.toLowerCase();

  try {
    const statsOriginal = fs.statSync(archivo);

    // Mantiene el formato original, solo elimina metadatos
    const opciones = ext === '.png'
      ? { compressionLevel: 9 }   // PNG
      : { mozjpeg: true };        // JPG/JPEG

    await sharp(archivo)
      .withMetadata(false)         // Elimina EXIF, GPS, ICC, etc.
      .toFormat(ext.slice(1), opciones)
      .toFile(`./sin-metadatos/${nombre}${ext}`);

    const statsNueva = fs.statSync(`./sin-metadatos/${nombre}${ext}`);
    const ahorro = ((1 - statsNueva.size / statsOriginal.size) * 100).toFixed(1);

    console.log(`✓ ${archivo}`);
    console.log(`  Original: ${(statsOriginal.size / 1024).toFixed(0)} KB`);
    console.log(`  Nueva:    ${(statsNueva.size / 1024).toFixed(0)} KB  (ahorro: ${ahorro}%)\n`);

  } catch (error) {
    console.log(`✗ Error procesando ${archivo}: ${error.message}\n`);
  }
});
