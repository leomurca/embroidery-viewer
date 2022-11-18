<script>
  import CardList from "./CardList.svelte";
  import Dropzone from "./Dropzone.svelte";
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

  <Dropzone {files} {acceptedFiles} {onKeydown} {onClick} {onDrop} {onChange} />

  <input type="submit" value="Render files" />
</form>

{#if filesRendered}
  <CardList {files} />
{:else}
  <FileList {files} />
{/if}

<style>
  @media only screen and (max-device-width: 812px) {
    #form {
      width: 100%;
    }
  }
</style>
