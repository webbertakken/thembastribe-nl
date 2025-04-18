import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Get current directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const inputDir = path.join(__dirname, "../../src/assets/images");
const outputDir = path.join(__dirname, "../../src/assets/thumbnails");

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from the input directory
const imageFiles = fs.readdirSync(inputDir).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
});

// Generate thumbnails for each image
async function generateThumbnails() {
  console.log("Generating thumbnails...");

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `thumb-${file.split(".")[0]}.webp`);

    try {
      await sharp(inputPath)
        .resize(300, 200, { fit: "cover" })
        .webp({ quality: 70 })
        .toFile(outputPath);

      console.log(`✅ Generated thumbnail for ${file}`);
    } catch (error) {
      console.error(`❌ Error generating thumbnail for ${file}:`, error);
    }
  }

  console.log("Thumbnail generation complete!");
}

generateThumbnails();
