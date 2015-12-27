import path from 'path';
import fs from 'fs';

const assetsFilename = path.join(__dirname, '..', 'dist', 'assets', 'webpack-assets.json');

let assets = Object.create(null);

function loadAssetsFile() {
  try {
    const assetsFile = fs.readFileSync(assetsFilename, 'utf-8');
    assets = JSON.parse(assetsFile);
  }
  catch (err) {
    throw new Error('Couldn\'t load ' + assetsFilename + ', did you run `npm run build` first?');
  }
}

if (process.env.NODE_ENV === 'production') {
  loadAssetsFile();
}

export default function getAssetFilename(entryName) {
  let asset = assets[entryName];
  if (!asset) {
    return path.join(
      '/assets/',
      '[name].dev.js'.replace(/\[name\]/g, entryName)
    ) + '?' + Date.now().toString(36);
  }

  return assets[entryName].js;
}
