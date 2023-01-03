<script>
  import SvelteSeo from "svelte-seo";
  import thumbnail from "../assets/thumbnail.webp";

  const title = "Embroidery Viewer";
  const description = "A free online tool to view embroidery files.";
  const url = "https://embroideryviewer.xyz/";
  const type = "website";
  const keywords =
    "Free Emrbroidery Viewer, embroidery design, sewing machine, preview .pes files, preview embroider designs, brother machine.";
  const embroideryViewerThumbnail = {
    url: thumbnail,
    width: 1200,
    height: 630,
    alt: "Embroidery viewer thumbnail.",
  };
</script>

<SvelteSeo {title} {description} {keywords} />
<SvelteSeo
  openGraph={{
    title,
    description,
    url,
    type,
    images: [embroideryViewerThumbnail],
  }}
/>
