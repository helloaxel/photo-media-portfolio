const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Definir rutas relativas correctas
const sourceDir = './assets/images/sin-metadatos';
const outputDir = './assets/images/optimizadas';

// Crear carpeta output si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Leer imágenes de la carpeta source
const archivos = fs.readdirSync(sourceDir)
.filter(f => (f.endsWith('.jpg') || f.endsWith('.jpeg')));

if (archivos.length === 0) {
  console.log('No se encontraron imágenes JPG/JPEG en ' + sourceDir);
  process.exit();
}

console.log(`Procesando ${archivos.length} imágenes...\n`);

archivos.forEach(async (archivo) => {
  const nombre = path.parse(archivo).name;
  const inputPath = path.join(sourceDir, archivo);

  try {
    // Generar WebP
    await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .webp({ quality: 75 })
    .toFile(path.join(outputDir, `${nombre}.webp`));

    // Generar JPG optimizado
    await sharp(inputPath)
    .resize(1920, null, { withoutEnlargement: true })
    .jpeg({ quality: 75, mozjpeg: true })
    .toFile(path.join(outputDir, `${nombre}.jpg`));

    // Obtener tamaños
    const statsWebp = fs.statSync(path.join(outputDir, `${nombre}.webp`));
    const statsJpg = fs.statSync(path.join(outputDir, `${nombre}.jpg`));

    console.log(`✓ ${archivo}`);
    console.log(`  WebP: ${(statsWebp.size / 1024).toFixed(0)} KB`);
    console.log(`  JPG:  ${(statsJpg.size / 1024).toFixed(0)} KB\n`);

  } catch (error) {
    console.log(`✗ Error procesando ${archivo}: ${error.message}`);
  }
});
