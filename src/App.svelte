<script>
  import Header from "./lib/Header.svelte";
  import FileViewer from "./lib/FileViewer.svelte";
  import Footer from "./lib/Footer.svelte";
</script>

<Header />
<main>
  <FileViewer />
</main>
<Footer />

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
  }
</style>
