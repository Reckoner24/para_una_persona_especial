
const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const galleryDir = path.join(__dirname, 'public', 'gallery');
const outputJson = path.join(__dirname, 'src', 'components', 'galleryData.json');

// Ensure gallery directory exists
if (!fs.existsSync(galleryDir)) {
    console.error(`Gallery directory not found at ${galleryDir}`);
    process.exit(1);
}

// Function to convert HEIC to JPG
async function convertHeicToJpg(filePath) {
    try {
        const inputBuffer = fs.readFileSync(filePath);
        const outputBuffer = await convert({
            buffer: inputBuffer, // the HEIC file buffer
            format: 'JPEG',      // output format
            quality: 0.8         // the jpeg compression quality, between 0 and 1
        });

        const newFilePath = filePath.replace(/\.heic$/i, '.jpg');
        fs.writeFileSync(newFilePath, outputBuffer);
        console.log(`Converted: ${path.basename(filePath)} -> ${path.basename(newFilePath)}`);

        // Optional: Delete original heic to save space? keeping it for now.
        return path.basename(newFilePath);
    } catch (error) {
        console.error(`Error converting ${filePath}:`, error.message);
        return null;
    }
}

async function processImages() {
    const files = fs.readdirSync(galleryDir);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const heicExtensions = ['.heic'];

    const imageList = [];

    console.log("Starting image processing...");

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        const fullPath = path.join(galleryDir, file);

        if (heicExtensions.includes(ext)) {
            // Check if converted version already exists
            const expectedJpg = file.replace(/\.heic$/i, '.jpg');
            if (fs.existsSync(path.join(galleryDir, expectedJpg))) {
                console.log(`Skipping ${file} (JPG already exists)`);
                imageList.push(expectedJpg);
            } else {
                const newFilename = await convertHeicToJpg(fullPath);
                if (newFilename) imageList.push(newFilename);
            }
        } else if (validExtensions.includes(ext)) {
            imageList.push(file);
        } else {
            console.log(`Skipping unsupported file: ${file}`);
        }
    }

    // Write the list to JSON
    fs.writeFileSync(outputJson, JSON.stringify(imageList, null, 2));
    console.log(`\nSuccess! Updated gallery list with ${imageList.length} images.`);
    console.log(`File saved to: ${outputJson}`);
}

processImages();
