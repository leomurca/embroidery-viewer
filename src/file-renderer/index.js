import { jDataView } from "./jdataview";
import { supportedFormats } from "../format-readers";
import { Pattern } from "./pattern";

function renderToCanvas(filename, evt, canvas) {
  const fileExtension = filename.toLowerCase().split(".").pop();
  const view = jDataView(evt.target.result, 0, evt.size);
  const pattern = new Pattern();

  supportedFormats[fileExtension].read(view, pattern);

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
