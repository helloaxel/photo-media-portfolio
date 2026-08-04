const sharp = require('sharp');
const fs = require('fs');

// Obtener todos los archivos JPG, JPEG y PNG
const archivos = fs.readdirSync('.')
  .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (archivos.length === 0) {
  console.log('No se encontraron imágenes JPG/JPEG/PNG en esta carpeta.');
  process.exit();
}

console.log(`Analizando ${archivos.length} imágenes...\n`);
console.log('='.repeat(60));

archivos.forEach(async (archivo) => {
  try {
    const metadata = await sharp(archivo).metadata();
    const stats = fs.statSync(archivo);

    console.log(`\n ${archivo}`);
    console.log('-'.repeat(60));
    console.log(`  Formato:      ${metadata.format?.toUpperCase()}`);
    console.log(`  Resolución:   ${metadata.width} x ${metadata.height} px`);
    console.log(`  Tamaño:       ${(stats.size / 1024).toFixed(1)} KB`);
    console.log(`  Canales:      ${metadata.channels}`);
    console.log(`  Color space:  ${metadata.space}`);
    console.log(`  Bit depth:    ${metadata.chromaSubsampling || 'N/A'}`);

    // EXIF (si existe)
    if (metadata.exif) {
      const exif = JSON.parse(metadata.exif.toString('utf8').replace(/[^\x20-\x7E]/g, ' '));
      console.log(`  EXIF:         Presente`);
    } else {
      console.log(`  EXIF:         No encontrado`);
    }

    // ICC Profile
    console.log(`  ICC Profile:  ${metadata.icc ? 'Presente' : 'No encontrado'}`);

    // IPTC
    console.log(`  IPTC:         ${metadata.iptc ? 'Presente' : 'No encontrado'}`);

    // XMP
    console.log(`  XMP:          ${metadata.xmp ? 'Presente' : 'No encontrado'}`);

    // GPS (dentro de EXIF, si existe)
    if (metadata.exif) {
      const exifBuffer = metadata.exif.toString('hex');
      // GPS tag es 0x8825 en hex
      console.log(`  GPS:          ${exifBuffer.includes('8825') ? 'Presente' : 'No encontrado'}`);
    }

    // Orientación
    console.log(`  Orientación:  ${metadata.orientation || 'No definida'}`);

    console.log('='.repeat(60));

  } catch (error) {
    console.log(`\n✗ Error leyendo ${archivo}: ${error.message}`);
  }
});
