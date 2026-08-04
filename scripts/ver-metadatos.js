const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = './assets/images/source';

//Obtener los archivos
const archivos = fs.readdirSync(sourceDir)
.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (archivos.length === 0) {
  console.log('No se encontraron imágenes JPG/JPEG/PNG.');
  process.exit();
}

console.log(`Analizando ${archivos.length} imágenes...\n`);
console.log('='.repeat(60));

archivos.forEach(async (archivo) => {
  const fullPath = sourceDir + '/' + archivo;

  try {
    const metadata = await sharp(fullPath).metadata();
    const stats = fs.statSync(fullPath);

    console.log(`\n ${archivo}`);
    console.log('-'.repeat(60));
    console.log(`  Formato:      ${metadata.format?.toUpperCase()}`);
    console.log(`  Resolución:   ${metadata.width} x ${metadata.height} px`);
    console.log(`  Tamaño:       ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`  Canales:      ${metadata.channels}`);
    console.log(`  Color space:  ${metadata.space}`);

    // verifica si existe, sin intentar parsear
    console.log(`  EXIF:         ${metadata.exif ? 'Presente' : 'No encontrado'}`);
    console.log(`  ICC Profile:  ${metadata.icc ? 'Presente' : 'No encontrado'}`);
    console.log(`  IPTC:         ${metadata.iptc ? 'Presente' : 'No encontrado'}`);
    console.log(`  XMP:          ${metadata.xmp ? 'Presente' : 'No encontrado'}`);
    console.log(`  Orientación:  ${metadata.orientation || 'No definida'}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.log(`\n✗ Error: ${archivo} → ${error.message}`);
  }
});
