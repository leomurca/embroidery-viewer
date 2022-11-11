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
  document.getElementById("selected-files-container").remove();
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
  if (evt.key === "Enter") {
    document.getElementById("file-input").click();
  }
}
</script>

<form 
  on:submit={onSubmitHandler} 
  id="form"
  action="#" 
  enctype="multipart/form-data">
  <h2>Upload files</h2>
  <p>Max file size is <strong>{maxFileSize/1000}kb</strong>. Accepted formats: <strong>{acceptedFiles.join(",")}</strong>.</p>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div id="dropzone" tabindex={0} on:keydown={handleOnKeydown} on:click={handleOnClick} on:dragover={handleDragOver} on:drop={onDropHandler}>
    <label id="file-label" for="file-input">Drag and drop files here or click to upload.</label>
    <input id="file-input" type="file" name="files[]" accept={acceptedFiles.join(",")} multiple on:change={onChangeFileHandler} bind:files />
  </div>
  <input type="submit" value="Render files">
</form>

<div id="selected-files-container">
{#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
    <div id="selected-file-card">
		  <p>{file.name} ({file.size/1000} kb) </p>
    </div>
	{/each}
{/if}
</div>

<div id="canvas-container" style="width: 100%; heigth: 100vh;"></div>

<style>

  input[type="submit"] {
    width: 100%;
    font-size: 20px;
    margin-top: 20px;
    background-color: #05345f;
    font-weight: 700;
    color: white;
    padding: 10px;
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

  #selected-file-card {
    border: 1px solid #000;
    width: 500px;
    padding-left: 15px;
    margin-top: 10px;
  }

  #canvas-container {
    display: flex;
    width: 100%; 
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 50px;
  }

  #dropzone:hover {
    cursor: pointer;
    border: 5px dotted #05345f;
    color: #05345f;
  }

</style>
