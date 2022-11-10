<script>
import { startFileRead } from './main';

let files;
const acceptedFiles = [".pes"];
const maxFileSize = 700000;

function onSubmitHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  for (var i = 0, file; (file = files[i]); i++) {
    const canvasContainer = document.getElementById("canvas-container")
    const canvasCard = document.createElement(`div`)
    const canvasEl = document.createElement(`canvas`)
    const fileNameEl = document.createElement(`p`)

    canvasCard.id = `canvas-card-${i}`
    canvasCard.style['display'] = "flex"
    canvasCard.style['flex-direction'] = "column"
    canvasCard.style['justify-content'] = "center"
    canvasCard.style['align-items'] = "center"
    canvasCard.style['width'] = "550px"
    canvasCard.style['height'] = "550px"
    canvasCard.style['margin-bottom'] = "15px"
    canvasCard.style['border'] = "2px solid black"

    canvasEl.id = `mycanvas-${i}`
    canvasEl.style["height"] = "80%";
    canvasEl.style["width"] = "fit-content";

    fileNameEl.textContent = file.name

    canvasCard.appendChild(canvasEl)
    canvasCard.appendChild(fileNameEl)
    canvasContainer.appendChild(canvasCard)

    if (file) {
      startFileRead(file, canvasEl);
    }
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();

}

function onDropHandler(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  onChangeFileHandler(evt)
}

function onChangeFileHandler(evt) {
  const changedFiles = evt.dataTransfer ? evt.dataTransfer.files : evt.target.files;
  let filesToUpload = [];
  for (var i = 0, file; (file = changedFiles[i]); i++) {
    if (file) {
      if (file.size <= maxFileSize) {
        filesToUpload.push(file);
      } else {
        console.log("File too large!")
        console.log(file)
      }
    }
  }
  files = filesToUpload
}

function handleOnClick(evt) {
  document.getElementById("file-input").click();
}

function handleOnKeydown(evt) {
  console.log(evt)
}
</script>

<form 
  on:submit={onSubmitHandler} 
  id="form"
  action="#" 
  enctype="multipart/form-data">
  <h2>Upload files</h2>
  <p>Max file size is <strong>{maxFileSize/1000}kb</strong>. Accepted formats: <strong>{acceptedFiles.join(",")}</strong>.</p>

  <div id="dropzone" on:keydown={handleOnKeydown} on:click={handleOnClick} on:dragover={handleDragOver} on:drop={onDropHandler}>
    <label id="file-label" for="file-input">Drag and drop files here or click to upload.</label>
    <input id="file-input" type="file" name="files[]" accept={acceptedFiles.join(",")} multiple on:change={onChangeFileHandler} />
  </div>
  <input type="submit" value="Render files">
</form>

<div id="canvas-container" style="width: 100%; heigth: 100vh;"></div>

<style>

  input[type="submit"] {
    width: 100%;
    font-size: 30px;
    margin-top: 20px;
  }

  input[type="submit"]:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }

  #dropzone {
    display: flex;
    height: 100px;
    width: 500px;
    border: 5px dotted black;
    padding: 15px;
    z-index: 10;
  }

  #file-label {
    z-index: -1;
    font-weight: 600;
  }

  #file-input {
    display: none;
  }

  #canvas-container {
    display: flex;
    width: 100%; 
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  #dropzone:hover {
    cursor: pointer;
    border: 5px dotted #7FB77E;
    color: #7FB77E;
  }

</style>
