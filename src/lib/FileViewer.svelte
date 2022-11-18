<script>
  import CardList from "./CardList.svelte";
  import Dropzone from "./Dropzone.svelte";
  import FileList from "./FileList.svelte";

  import { filterFileRequirements } from "../utils/filterFileRequirements";

  let files;
  let filesRendered = false;
  let filesRejected;
  const fileRequirements = {
    supportedFormats: [".pes"],
    maxSize: 700000,
  };

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

    const results = filterFileRequirements(changedFiles, fileRequirements);
    files = results.accepted;
    filesRejected = results.rejected;
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
    {files}
    supportedFormats={fileRequirements.supportedFormats}
    {onKeydown}
    {onClick}
    {onDrop}
    {onChange}
  />

  <input type="submit" value="Render files" />
</form>

{#if filesRendered}
  <CardList {files} />
{:else}
  <FileList title="Rejected Files" files={filesRejected} isError />
  <FileList title="Selected Files" {files} />
{/if}

<style>
  @media only screen and (max-device-width: 812px) {
    #form {
      width: 100%;
    }
  }
</style>
