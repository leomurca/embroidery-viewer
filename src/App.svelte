<script>
  import Seo from "./lib/Seo.svelte";
  import Header from "./lib/Header.svelte";
  import FileViewer from "./lib/FileViewer.svelte";
  import Footer from "./lib/Footer.svelte";
</script>

<Seo />
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
