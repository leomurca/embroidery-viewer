<script>
  import { appVersion } from "../utils/env";
</script>

<footer>
  <p>
    Copyright © {new Date().getFullYear()}
    <a href="https://leomurca.xyz" target="_blank" rel="noreferrer"
      >Leonardo Murça</a
    >.
  </p>
  <p>
    version: {appVersion()}
  </p>
</footer>

<style>
  footer {
    bottom: 0;
  }
  p {
    text-align: center;
  }
</style>
