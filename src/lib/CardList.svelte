<script>
  import renderFileToCanvas from "../file-renderer";

  export let files = [];
  let canvasRefs = [];
  let colorRefs = [];
  let errorMessageRef;
</script>

{#if files.length !== 0}
  <div id="container" style="width: 100%; heigth: 100vh;">
    {#each Array.from(files) as file, i}
      <div class="canvas-container">
        <canvas bind:this={canvasRefs[i]} class="canvas" />
        <p>{file.name}</p>
        <div class="colors-container" bind:this={colorRefs[i]} />
      </div>
      {canvasRefs[i] &&
        renderFileToCanvas(file, canvasRefs[i], errorMessageRef, colorRefs[i])}
    {/each}
    <!-- svelte-ignore a11y-missing-content -->
    <h1 bind:this={errorMessageRef} />
  </div>
{/if}

<style>
  #container {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 50px;
  }

  .canvas-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 550px;
    /* Maybe use height: auto; */
    height: 550px;
    margin-bottom: 15px;
    padding: 10px;
    border: 2px solid black;
  }

  .canvas {
    height: 80%;
    width: 100%;
    object-fit: contain;
  }

  .colors-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    row-gap: 5px;
  }

  @media only screen and (max-device-width: 812px) {
    .canvas-container {
      width: 100%;
      height: auto;
    }

    #container {
      width: 100%;
    }
  }
</style>
