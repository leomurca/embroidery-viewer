<script>
  import { startFileRead } from "../utils/main";

  let files;
  let filesRendered = false;
  let filesRefs = [];
  const acceptedFiles = [".pes"];
  const maxFileSize = 700000;

  function onSubmit() {
    filesRendered = true;
  }

  function onDrop(evt) {
    onChange(evt);
  }

  function onChange(evt) {
    files = null;
    filesRefs = [];
    filesRendered = false;

    const changedFiles = evt.dataTransfer
      ? evt.dataTransfer.files
      : evt.target.files;
    let filesToUpload = [];
    for (var i = 0, file; (file = changedFiles[i]); i++) {
      if (file) {
        if (file.size <= maxFileSize) {
          filesToUpload.push(file);
        } else {
          console.log("File too large!");
          console.log(file);
        }
      }
    }
    files = filesToUpload;
  }

  function onClick() {
    document.getElementById("file-input").click();
  }

  function onKeydown(evt) {
    if (evt.key === "Enter") {
      document.getElementById("file-input").click();
    }
  }
</script>

<form
  on:submit|preventDefault|stopPropagation={onSubmit}
  id="form"
  enctype="multipart/form-data"
>
  <h2>Upload files</h2>
  <p>
    Max file size is <strong>{maxFileSize / 1000}kb</strong>. Accepted formats:
    <strong>{acceptedFiles.join(",")}</strong>.
  </p>

  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    id="dropzone"
    tabindex={0}
    on:keydown={onKeydown}
    on:click={onClick}
    on:dragover|preventDefault|stopPropagation
    on:drop|preventDefault|stopPropagation={onDrop}
  >
    <label id="file-label" for="file-input"
      >Drag and drop files here or click to upload.</label
    >
    <input
      id="file-input"
      type="file"
      name="files[]"
      accept={acceptedFiles.join(",")}
      multiple
      on:change={onChange}
      bind:files
    />
  </div>
  <input type="submit" value="Render files" />
</form>

{#if files && files.length !== 0 && !filesRendered}
  <div id="selected-files-container">
    <h2>Selected files:</h2>
    {#each Array.from(files) as file}
      <div id="selected-file-card">
        <p>{file.name} ({file.size / 1000} kb)</p>
      </div>
    {/each}
  </div>
{/if}

{#if files && files.length !== 0 && filesRendered}
  <div id="canvas-container" style="width: 100%; heigth: 100vh;">
    {#each Array.from(files) as file, i}
      <div class="card-canvas">
        <canvas bind:this={filesRefs[i]} class="canvas" />
        <p>{file.name}</p>
      </div>
      {filesRefs[i] && startFileRead(file, filesRefs[i])}
    {/each}
  </div>
{/if}

<style>
  .canvas {
    height: 80%;
    width: fit-content;
  }
  .card-canvas {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 550px;
    height: 550px;
    margin-bottom: 15px;
    border: 2px solid black;
  }
  input[type="submit"] {
    width: 100%;
    font-size: 20px;
    margin-top: 20px;
    background-color: #05345f;
    font-weight: 700;
    color: white;
    padding: 10px;
    -webkit-appearance: none;
    border-radius: 0;
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

  @media only screen and (max-device-width: 812px) {
    #form {
      width: 100%;
    }

    #dropzone {
      width: 100%;
    }

    #selected-files-container {
      width: 100%;
    }

    #selected-file-card {
      width: 100%;
    }

    #canvas-container {
      width: 100%;
    }

    .card-canvas {
      width: 100%;
      height: 400px;
    }
  }
</style>
