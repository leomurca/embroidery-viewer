<script>
  import CardList from "./CardList.svelte";
  import FileList from "./FileList.svelte";

  let files;
  let filesRendered = false;
  const acceptedFiles = [".pes"];
  const maxFileSize = 700000;

  const onSubmit = () => {
    filesRendered = true;
  };

  const onDrop = (evt) => {
    onChange(evt);
  };

  const onChange = (evt) => {
    files = null;
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
  };

  const onClick = () => {
    document.getElementById("file-input").click();
  };

  const onKeydown = (evt) => {
    if (evt.key === "Enter") {
      document.getElementById("file-input").click();
    }
  };
</script>

<form
  id="form"
  enctype="multipart/form-data"
  on:submit|preventDefault|stopPropagation={onSubmit}
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

{#if filesRendered}
  <CardList {files} />
{:else}
  <FileList {files} />
{/if}

<style>
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
  }
</style>
