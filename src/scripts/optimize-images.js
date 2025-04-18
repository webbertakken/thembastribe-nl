import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Get current directory (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const inputDir = path.join(__dirname, "../../src/assets/images");
const outputDir = path.join(__dirname, "../../src/assets/optimized");

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files from the input directory
const imageFiles = fs.readdirSync(inputDir).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
});

// Optimize each image
async function optimizeImages() {
  console.log("Optimizing images...");

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);
    const stats = fs.statSync(inputPath);
    const fileSizeInMB = stats.size / (1024 * 1024);

    try {
      // Determine appropriate compression based on file size
      const quality = fileSizeInMB > 2 ? 70 : 80;

      // Get image metadata
      const metadata = await sharp(inputPath).metadata();

      // Resize if image is very large (preserving aspect ratio)
      let sharpInstance = sharp(inputPath);
      if (metadata.width > 1920) {
        sharpInstance = sharpInstance.resize({ width: 1920 });
      }

      // Convert to WebP and save
      await sharpInstance.webp({ quality }).toFile(outputPath);

      // Calculate size reduction
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSizeInMB = optimizedStats.size / (1024 * 1024);
      const reduction = (
        ((fileSizeInMB - optimizedSizeInMB) / fileSizeInMB) *
        100
      ).toFixed(2);

      console.log(
        `✅ Optimized ${file}: ${fileSizeInMB.toFixed(2)}MB → ${optimizedSizeInMB.toFixed(2)}MB (${reduction}% reduction)`
      );
    } catch (error) {
      console.error(`❌ Error optimizing ${file}:`, error);
    }
  }

  console.log("Image optimization complete!");
}

optimizeImages();
