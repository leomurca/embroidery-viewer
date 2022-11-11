<script>
  import FileViewer from "./lib/FileViewer.svelte";
  import logo from "./assets/logo.webp";
</script>

<header>
  <a href="/">
    <img src={logo} alt="Embroidery viewer logo." width="460" height="200" />
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
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
  }
</style>
