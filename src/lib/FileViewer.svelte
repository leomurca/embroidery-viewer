<script>
  import CardList from "./CardList.svelte";
  import Dropzone from "./Dropzone.svelte";
  import FileList from "./FileList.svelte";

  import { filterFiles } from "../utils/filterFiles";

  let acceptedFiles;
  let rejectedFiles;
  let areAcceptedFilesRendered = false;
  const fileRequirements = {
    supportedFormats: [".pes", ".dst"],
    maxSize: 700000,
  };

  const onSubmit = () => {
    areAcceptedFilesRendered = true;
  };

  const onDrop = (evt) => {
    onChange(evt);
  };

  const onChange = (evt) => {
    acceptedFiles = null;
    areAcceptedFilesRendered = false;

    const changedFiles = evt.dataTransfer
      ? evt.dataTransfer.files
      : evt.target.files;

    const results = filterFiles(changedFiles, fileRequirements);
    acceptedFiles = results.accepted;
    rejectedFiles = results.rejected;
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
    Max file size is <strong>{fileRequirements.maxSize / 1000}kb</strong>.
    Accepted formats:
    <strong>{fileRequirements.supportedFormats.join(",")}</strong>.
  </p>

  <Dropzone
    files={acceptedFiles}
    supportedFormats={fileRequirements.supportedFormats}
    {onKeydown}
    {onClick}
    {onDrop}
    {onChange}
  />

  <input type="submit" value="Render files" />
</form>

{#if areAcceptedFilesRendered}
  <CardList files={acceptedFiles} />
{:else}
  <FileList title="Rejected Files" files={rejectedFiles} isError />
  <FileList title="Selected Files" files={acceptedFiles} />
{/if}

<style>
  @media only screen and (max-device-width: 812px) {
    #form {
      width: 100%;
    }
  }
</style>
