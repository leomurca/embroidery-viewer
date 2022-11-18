<script>
  export let title;
  export let files = [];
  export let isError = false;
</script>

{#if files.length !== 0}
  <div id="selected-files-container">
    <h2>{title}:</h2>
    {#each Array.from(files) as file}
      <div id={isError ? "selected-file-card-error" : "selected-file-card"}>
        <p>{file.name} ({file.size / 1000} kb)</p>
      </div>
    {/each}
  </div>
{/if}

<style>
  #selected-file-card {
    border: 1px solid #000;
    width: 500px;
    padding-left: 15px;
    margin-top: 10px;
  }

  #selected-file-card-error {
    border: 1px solid red;
    width: 500px;
    padding-left: 15px;
    margin-top: 10px;
    color: red;
  }

  @media only screen and (max-device-width: 812px) {
    #selected-files-container {
      width: 100%;
    }

    #selected-file-card {
      width: 100%;
    }
  }
</style>
