<script>
  import renderFileToCanvas from "../file-renderer";

  export let files = [];
  let canvasRefs = [];
  let colorRefs = [];
  let stitchesRefs = [];
  let sizeRefs = [];
  let errorMessageRef;

  const downloadCanvasAsImage = (canvas, filename) => {
    const image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const link = document.createElement("a");
    link.download = `${filename.split(".").slice(0, -1).join(".")}.png`;
    link.href = image;
    link.click();
  };

  const onKeydown = (evt) => {
    if (evt.key === "Enter") {
      document.getElementById("download-button").click();
    }
  };
</script>

{#if files.length !== 0}
  <div id="container" style="width: 100%; heigth: 100vh;">
    {#each Array.from(files) as file, i}
      <div class="canvas-container">
        <canvas bind:this={canvasRefs[i]} class="canvas" />
        <p><strong>{file.name}</strong></p>
        <div class="stitches-container" bind:this={stitchesRefs[i]} />
        <div class="size-container" bind:this={sizeRefs[i]} />
        <div class="colors-container" bind:this={colorRefs[i]} />
        <div
          id="download-button"
          role="button"
          on:keydown={onKeydown}
          on:click={() => downloadCanvasAsImage(canvasRefs[i], file.name)}
        >
          Download
        </div>
      </div>
      {canvasRefs[i] &&
        renderFileToCanvas(
          file,
          canvasRefs[i],
          errorMessageRef,
          colorRefs[i],
          stitchesRefs[i],
          sizeRefs[i]
        )}
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
    max-height: 1000px;
    margin-bottom: 15px;
    padding: 10px;
    border: 2px solid black;
  }

  .canvas {
    height: 70%;
    width: 100%;
    object-fit: contain;
  }

  .colors-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    row-gap: 5px;
    padding-bottom: 15px;
  }

  .stitches-container {
    padding: 10px 0;
  }

  div[role="button"] {
    background-color: #05345f;
    font-weight: 500;
    color: white;
    padding: 10px;
    border-radius: 0;
  }

  div[role="button"]:hover {
    cursor: pointer;
    background-color: black;
    color: white;
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
