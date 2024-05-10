const path = require("path");
const fs = require("fs");
const pixelmatch = require("pixelmatch");
const PNG = require("pngjs").PNG;

const rootDir = path.resolve(__dirname, "..", "temp");
const baselineDir = path.join(rootDir, "baseline");
const screenshotDir = path.join(rootDir, "screenshots");
const diffDir = path.join(rootDir, "diff");
fs.rmdirSync(diffDir, { recursive: true });
fs.mkdirSync(diffDir, { recursive: true });

const screenshotImgs = fs.readdirSync(screenshotDir).filter(x => x.match(/\.(png|jpeg|webp)$/));

async function main() {
  for (const testImg of screenshotImgs) {
    const testImgPath = path.join(screenshotDir, testImg);
    const baselineImgPath = path.join(baselineDir, testImg);

    // const img1 = PNG.sync.read(fs.readFileSync(testImgPath));
    // const img2 = PNG.sync.read(fs.readFileSync(baselineImgPath));

    // const { width, height } = img1;
    // const diff = new PNG({ width, height });

    const img1 = PNG.sync.read(fs.readFileSync(testImgPath));
    const img2 = PNG.sync.read(fs.readFileSync(baselineImgPath));

    const maxWidth = Math.max(img1.width, img2.width);
    const maxHeight = Math.max(img1.height, img2.height);

    // Create new images with maximum dimensions and fill with transparent pixels
    let paddedImg1, paddedImg2;

    if (img1.width === img2.width && img1.height === img2.height) {
      paddedImg1 = img1;
      paddedImg2 = img2;
    } else {
      paddedImg1 = new PNG({ width: maxWidth, height: maxHeight, fill: true });
      paddedImg2 = new PNG({ width: maxWidth, height: maxHeight, fill: true });

      // Overlay original images onto the padded images
      PNG.bitblt(img1, paddedImg1, 0, 0, img1.width, img1.height, 0, 0);
      PNG.bitblt(img2, paddedImg2, 0, 0, img2.width, img2.height, 0, 0);
    }

    const diff = new PNG({ width: maxWidth, height: maxHeight });

    try {
      const mismatch = pixelmatch(paddedImg1.data, paddedImg2.data, diff.data, maxWidth, maxHeight, { threshold: 0.1 });

      const diffPath = path.join(diffDir, testImg);

      if (mismatch > 50) {
        fs.writeFileSync(diffPath, PNG.sync.write(diff));
      }
    } catch (e) {
      console.log("Error in comparing images: ", testImgPath, baselineImgPath);
      console.log(e);
    }
  }
}

main();
