<script>
  import { startFileRead } from "../utils/main";

  export let files = [];
  let canvasRefs = [];
</script>

{#each Array.from(files) as file, i}
  <div class="container">
    <canvas bind:this={canvasRefs[i]} class="canvas" />
    <p>{file.name}</p>
  </div>
  {canvasRefs[i] && startFileRead(file, canvasRefs[i])}
{/each}

<style>
  .container {
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
    .container {
      width: 100%;
      height: 400px;
    }
  }
</style>
