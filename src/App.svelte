<script>
  import SvelteSeo from "svelte-seo";
  import FileViewer from "./lib/FileViewer.svelte";
  import thumbnail from "./assets/thumbnail.webp";
  import Footer from "./lib/Footer.svelte";
  import Header from "./lib/Header.svelte";

  const title = "Embroidery Viewer";
  const description = "A free online tool to view embroidery files.";
  const keywords =
    "Free Emrbroidery Viewer, embroidery design, sewing machine, preview .pes files, preview embroider designs, brother machine.";
</script>

<SvelteSeo {title} {description} {keywords} />

<SvelteSeo
  openGraph={{
    title,
    description,
    url: "https://embroideryviewer.xyz/",
    type: "website",
    images: [
      {
        url: thumbnail,
        width: 1200,
        height: 630,
        alt: "Embroidery viewer thumbnail.",
      },
    ],
  }}
/>

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
