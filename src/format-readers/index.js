import { dstRead } from "./dst";
import { expRead } from "./exp";
import { jefRead } from "./jef";
import { pecRead } from "./pec";
import { pesRead } from "./pes";

const supportedFormats = {
  pes: { ext: ".pes", read: pesRead },
  dst: { ext: ".dst", read: dstRead },
  pec: { ext: ".pec", read: pecRead },
  jef: { ext: ".jef", read: jefRead },
  exp: { ext: ".exp", read: expRead },
};

export { supportedFormats };
