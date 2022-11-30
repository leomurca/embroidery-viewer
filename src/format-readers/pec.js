import { pecColors, pecReadStitches } from "./pes";

export function pecRead(file, pattern) {
  let colorChanges, i;
  file.seek(0x38);
  colorChanges = file.getUint8();
  for (i = 0; i <= colorChanges; i++) {
    pattern.addColor(pecColors[file.getUint8() % 65]);
  }
  file.seek(0x21c);
  pecReadStitches(file, pattern);
  return true;
}
