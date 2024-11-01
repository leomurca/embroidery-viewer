import { Color, stitchTypes } from "../file-renderer/pattern";

const namedColors = [
  new Color(0, 0, 0, "Unknown"),
  new Color(14, 31, 124, "Prussian Blue"),
  new Color(10, 85, 163, "Blue"),
  new Color(0, 135, 119, "Teal Green"),
  new Color(75, 107, 175, "Cornflower Blue"),
  new Color(237, 23, 31, "Red"),
  new Color(209, 92, 0, "Reddish Brown"),
  new Color(145, 54, 151, "Magenta"),
  new Color(228, 154, 203, "Light Lilac"),
  new Color(145, 95, 172, "Lilac"),
  new Color(158, 214, 125, "Mint Green"),
  new Color(232, 169, 0, "Deep Gold"),
  new Color(254, 186, 53, "Orange"),
  new Color(255, 255, 0, "Yellow"),
  new Color(112, 188, 31, "Lime Green"),
  new Color(186, 152, 0, "Brass"),
  new Color(168, 168, 168, "Silver"),
  new Color(125, 111, 0, "Russet Brown"),
  new Color(255, 255, 179, "Cream Brown"),
  new Color(79, 85, 86, "Pewter"),
  new Color(0, 0, 0, "Black"),
  new Color(11, 61, 145, "Ultramarine"),
  new Color(119, 1, 118, "Royal Purple"),
  new Color(41, 49, 51, "Dark Gray"),
  new Color(42, 19, 1, "Dark Brown"),
  new Color(246, 74, 138, "Deep Rose"),
  new Color(178, 118, 36, "Light Brown"),
  new Color(252, 187, 197, "Salmon Pink"),
  new Color(254, 55, 15, "Vermillion"),
  new Color(240, 240, 240, "White"),
  new Color(106, 28, 138, "Violet"),
  new Color(168, 221, 196, "Seacrest"),
  new Color(37, 132, 187, "Sky Blue"),
  new Color(254, 179, 67, "Pumpkin"),
  new Color(255, 243, 107, "Cream Yellow"),
  new Color(208, 166, 96, "Khaki"),
  new Color(209, 84, 0, "Clay Brown"),
  new Color(102, 186, 73, "Leaf Green"),
  new Color(19, 74, 70, "Peacock Blue"),
  new Color(135, 135, 135, "Gray"),
  new Color(216, 204, 198, "Warm Gray"),
  new Color(67, 86, 7, "Dark Olive"),
  new Color(253, 217, 222, "Flesh Pink"),
  new Color(249, 147, 188, "Pink"),
  new Color(0, 56, 34, "Deep Green"),
  new Color(178, 175, 212, "Lavender"),
  new Color(104, 106, 176, "Wisteria Violet"),
  new Color(239, 227, 185, "Beige"),
  new Color(247, 56, 102, "Carmine"),
  new Color(181, 75, 100, "Amber Red"),
  new Color(19, 43, 26, "Olive Green"),
  new Color(199, 1, 86, "Dark Fuschia"),
  new Color(254, 158, 50, "Tangerine"),
  new Color(168, 222, 235, "Light Blue"),
  new Color(0, 103, 62, "Emerald Green"),
  new Color(78, 41, 144, "Purple"),
  new Color(47, 126, 32, "Moss Green"),
  new Color(255, 204, 204, "Flesh Pink"),
  new Color(255, 217, 17, "Harvest Gold"),
  new Color(9, 91, 166, "Electric Blue"),
  new Color(240, 249, 112, "Lemon Yellow"),
  new Color(227, 243, 91, "Fresh Green"),
  new Color(255, 153, 0, "Orange"),
  new Color(255, 240, 141, "Cream Yellow"),
  new Color(255, 200, 200, "Applique"),
];

function readPecStitches(file, pattern) {
  let stitchNumber = 0;
  const byteCount = file.byteLength;

  while (file.tell() < byteCount) {
    let [xOffset, yOffset] = [file.getUint8(), file.getUint8()];
    let stitchType = stitchTypes.normal;

    if (isEndStitch(xOffset, yOffset)) {
      pattern.addStitchRel(0, 0, stitchTypes.end, true);
      break;
    }

    if (isStopStitch(xOffset, yOffset)) {
      file.getInt8();  // Skip extra byte
      pattern.addStitchRel(0, 0, stitchTypes.stop, true);
      stitchNumber++;
      continue;
    }

    stitchType = determineStitchType(xOffset, yOffset);
    [xOffset, yOffset] = decodeCoordinates(xOffset, yOffset, file);
    
    pattern.addStitchRel(xOffset, yOffset, stitchType, true);
    stitchNumber++;
  }
}

function isEndStitch(xOffset, yOffset) {
  return xOffset === 0xff && yOffset === 0x00;
}

function isStopStitch(xOffset, yOffset) {
  return xOffset === 0xfe && yOffset === 0xb0;
}

function determineStitchType(xOffset, yOffset) {
  if (xOffset & 0x80) {
    if (xOffset & 0x20) return stitchTypes.trim;
    if (xOffset & 0x10) return stitchTypes.jump;
  }
  if (yOffset & 0x80) {
    if (yOffset & 0x20) return stitchTypes.trim;
    if (yOffset & 0x10) return stitchTypes.jump;
  }
  return stitchTypes.normal;
}

function decodeCoordinates(xOffset, yOffset, file) {
  if (xOffset & 0x80) {
    xOffset = ((xOffset & 0x0f) << 8) + yOffset;
    if (xOffset & 0x800) xOffset -= 0x1000;
    yOffset = file.getUint8();
  } else if (xOffset >= 0x40) {
    xOffset -= 0x80;
  }

  if (yOffset & 0x80) {
    yOffset = ((yOffset & 0x0f) << 8) + file.getUint8();
    if (yOffset & 0x800) yOffset -= 0x1000;
  } else if (yOffset > 0x3f) {
    yOffset -= 0x80;
  }

  return [xOffset, yOffset];
}

export function pesRead(file, pattern) {
  const pecStart = file.getInt32(8, true);
  file.seek(pecStart + 48);
  
  const numColors = file.getInt8() + 1;
  for (let i = 0; i < numColors; i++) {
    pattern.addColor(namedColors[file.getInt8()]);
  }

  file.seek(pecStart + 532);
  readPecStitches(file, pattern);
  pattern.addStitchRel(0, 0, stitchTypes.end);
}

export const pecReadStitches = readPecStitches;
export const pecColors = namedColors;
