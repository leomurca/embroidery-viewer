<script>
  export let files;
  export let supportedFormats;
  export let onKeydown;
  export let onClick;
  export let onDrop;
  export let onChange;
</script>

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
    accept={supportedFormats.join(",")}
    multiple
    on:change={onChange}
    bind:files
  />
</div>

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
    #dropzone {
      width: 100%;
    }
  }
</style>
