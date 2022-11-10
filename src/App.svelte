<script>
  import Counter from './lib/Counter.svelte'
</script>

<header>
  <h1>Embroidery Viewer</h1>
</header>
<main>
  <Counter />
</main>
<footer>
  <p>Copyright © 2022 Leonardo Murça.</p>
</footer>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
</style>
