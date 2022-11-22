<script>
  import renderFileToCanvas from "../file-renderer";

  export let files = [];
  let canvasRefs = [];
</script>

{#if files.length !== 0}
  <div id="container" style="width: 100%; heigth: 100vh;">
    {#each Array.from(files) as file, i}
      <div class="canvas-container">
        <canvas bind:this={canvasRefs[i]} class="canvas" />
        <p>{file.name}</p>
      </div>
      {canvasRefs[i] && renderFileToCanvas(file, canvasRefs[i])}
    {/each}
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

  @media only screen and (max-device-width: 812px) {
    .canvas-container {
      width: 100%;
      height: 400px;
    }

    #container {
      width: 100%;
    }
  }
</style>
