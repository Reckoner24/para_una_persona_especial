const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ============================================
//   Image Optimizer for Gallery
// ============================================
// Usage:  node scripts/optimize-images.js
//
// This script:
//   1. Backs up originals to  public/gallery/originals/
//   2. Resizes & compresses JPGs in  public/gallery/
//   3. Writes full results to  optimization-log.txt
// ============================================

const GALLERY_DIR = path.join(__dirname, '..', 'public', 'gallery');
const BACKUP_DIR = path.join(GALLERY_DIR, 'originals');
const LOG_FILE = path.join(__dirname, '..', 'optimization-log.txt');
const MAX_WIDTH = 1200;
const QUALITY = 75;

function log(msg, lines) {
    console.log(msg);
    lines.push(msg);
}

async function optimizeImages() {
    const lines = [];

    // Create backup folder
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // Get all JPG files (not directories, not in originals)
    const files = fs.readdirSync(GALLERY_DIR).filter(f =>
        /\.(jpg|jpeg)$/i.test(f) && fs.statSync(path.join(GALLERY_DIR, f)).isFile()
    );

    log(`Optimizing ${files.length} images...`, lines);
    log(`Max width: ${MAX_WIDTH}px | JPEG quality: ${QUALITY}`, lines);
    log('='.repeat(75), lines);

    let totalBefore = 0;
    let totalAfter = 0;
    let errors = 0;

    for (const file of files) {
        const filePath = path.join(GALLERY_DIR, file);
        const backupPath = path.join(BACKUP_DIR, file);

        // Get original size
        const originalSize = fs.statSync(filePath).size;
        totalBefore += originalSize;

        // Backup original (only if not already backed up)
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(filePath, backupPath);
            log(`  Backed up: ${file}`, lines);
        }

        try {
            // IMPORTANT: Read from BACKUP (original), write to gallery path
            const sourceFile = backupPath;

            const buffer = await sharp(sourceFile)
                .resize(MAX_WIDTH, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({
                    quality: QUALITY,
                    mozjpeg: true
                })
                .toBuffer();

            // Write optimized file to gallery
            fs.writeFileSync(filePath, buffer);

            const newSize = buffer.length;
            totalAfter += newSize;

            const savedPct = ((1 - newSize / originalSize) * 100).toFixed(1);
            const beforeKB = (originalSize / 1024).toFixed(0);
            const afterKB = (newSize / 1024).toFixed(0);

            log(`  ${file}  |  ${beforeKB} KB -> ${afterKB} KB  (${savedPct}% saved)`, lines);
        } catch (err) {
            errors++;
            log(`  ERROR ${file}: ${err.message}`, lines);
            totalAfter += originalSize;
        }
    }

    log('='.repeat(75), lines);
    log(`TOTAL BEFORE: ${(totalBefore / 1048576).toFixed(1)} MB`, lines);
    log(`TOTAL AFTER:  ${(totalAfter / 1048576).toFixed(1)} MB`, lines);
    log(`SAVED:        ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`, lines);
    if (errors > 0) log(`ERRORS:       ${errors}`, lines);
    log(``, lines);
    log(`Originals backed up in: public/gallery/originals/`, lines);
    log(`To restore: copy files back from the originals folder.`, lines);

    // Write log file
    fs.writeFileSync(LOG_FILE, lines.join('\n'), 'utf-8');
    console.log(`\nFull log written to: optimization-log.txt`);
}

optimizeImages().catch(err => {
    const msg = 'Fatal error: ' + err.message;
    console.error(msg);
    fs.writeFileSync(LOG_FILE, msg, 'utf-8');
    process.exit(1);
});
