<script>
  import FileViewer from "./lib/FileViewer.svelte";
  import MediaQuery from "./lib/MediaQuery.svelte";
  import logo from "./assets/embroidery-viewer-logo.webp";
  import logoMobile from "./assets/embroidery-viewer-logo-mobile.webp";

  function configsFor(matches) {
      return  matches ? { src: logoMobile, width: 350, height: 96 } : { src: logo, width: 460, height: 200 }
  }
</script>

<header>
  <a href="/">
    <MediaQuery query="(min-width: 481px) and (max-width: 812px)" let:matches>
      {@const configs = configsFor(matches)}
      <img
        class="logo"
        alt="Embroidery viewer logo."
        src={configs.src}
        width={configs.width}
        height={configs.height}
      />
    </MediaQuery>
  </a>
</header>
<main>
  <FileViewer />
</main>
<footer>
  <p>
    Copyright © 2022 <a
      href="https://leomurca.xyz"
      target="_blank"
      rel="noreferrer">Leonardo Murça</a
    >.
  </p>
</footer>

<style>
  .logo {
    background-image: logo;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }

  @media only screen and (max-device-width: 812px) {
    .logo {
      width: 100%;
      padding: 20px;
    }
  }
</style>
