import { jDataView } from "./jdataview";
import { pesRead } from "../format-readers/pes";
import { dstRead } from "../format-readers/dst";
import { Pattern } from "./pattern";
import { pecRead } from "../format-readers/pec";
import { jefRead } from "../format-readers/jef";
import { expRead } from "../format-readers/exp";

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function renderToCanvas(filename, evt, canvas) {
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
  } else if (filename.endsWith("exp")) {
    expRead(view, pattern);
  }
  pattern.moveToPositive();
  pattern.drawShape(canvas);
}

function renderAbortMessage(errorMessageRef) {
  errorMessageRef.innerHTML = "Render aborted!";
}

function renderErrorMessage(errorName, errorMessageRef) {
  let message;
  switch (errorName) {
    case "NotFoundError":
      message =
        "The file could not be found at the time the read was processed.";
      break;
    case "SecurityError":
      message = "<p>A file security error occured. This can be due to:</p>";
      message +=
        "<ul><li>Accessing certain files deemed unsafe for Web applications.</li>";
      message += "<li>Performing too many read calls on file resources.</li>";
      message +=
        "<li>The file has changed on disk since the user selected it.</li></ul>";
      break;
    case "NotReadableError":
      message =
        "The file cannot be read. This can occur if the file is open in another application.";
      break;
    case "EncodingError":
      message = "The length of the data URL for the file is too long.";
      break;
    default:
      message = "Something wrong happened!";
      break;
  }

  errorMessageRef.innerHTML = message;
}

export default function renderFileToCanvas(
  fileObject,
  canvas,
  errorMessageRef
) {
  const reader = new FileReader();

  reader.onloadend = (evt) => renderToCanvas(fileObject.name, evt, canvas);
  reader.abort = (/** @type {any} */ _) => renderAbortMessage(errorMessageRef);
  reader.onerror = (evt) =>
    renderErrorMessage(evt.target.error.name, errorMessageRef);

  if (fileObject) {
    reader.readAsArrayBuffer(fileObject);
  }

  return "";
}
