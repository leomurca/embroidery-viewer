import { jDataView } from "./jdataview";
import { pesRead } from "../format-readers/pes";
import { dstRead } from "../format-readers/dst";
import { Pattern } from "./pattern";
import { pecRead } from "../format-readers/pec";
import { jefRead } from "../format-readers/jef";

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function displayFileText(filename, evt, canvas) {
  const view = jDataView(evt.target.result, 0, evt.size);
  const pattern = new Pattern();
  filename = filename.toLowerCase();
  if (filename.endsWith("pes")) {
    pesRead(view, pattern);
  } else if (filename.endsWith("dst")) {
    dstRead(view, pattern);
  } else if (filename.endsWith("pec")) {
    pecRead(view, pattern);
  } else if (filename.endsWith("jef")) {
    jefRead(view, pattern);
  }
  pattern.moveToPositive();
  pattern.drawShape(canvas);
}

function handleFileReadAbort(evt) {
  alert("File read aborted.");
}

function handleFileReadError(evt) {
  let message;
  switch (evt.target.error.name) {
    case "NotFoundError":
      alert("The file could not be found at the time the read was processed.");
      break;
    case "SecurityError":
      message = "<p>A file security error occured. This can be due to:</p>";
      message +=
        "<ul><li>Accessing certain files deemed unsafe for Web applications.</li>";
      message += "<li>Performing too many read calls on file resources.</li>";
      message +=
        "<li>The file has changed on disk since the user selected it.</li></ul>";
      alert(message);
      break;
    case "NotReadableError":
      alert(
        "The file cannot be read. This can occur if the file is open in another application."
      );
      break;
    case "EncodingError":
      alert("The length of the data URL for the file is too long.");
      break;
    default:
      alert("File error code " + evt.target.error.name);
  }
}

export default function renderFileToCanvas(fileObject, canvas) {
  const reader = new FileReader();

  reader.onloadend = function (x) {
    displayFileText.apply(null, [fileObject.name, x, canvas]);
  };
  reader.abort = handleFileReadAbort;
  reader.onerror = handleFileReadError;

  if (fileObject) {
    reader.readAsArrayBuffer(fileObject);
  }

  return "";
}
