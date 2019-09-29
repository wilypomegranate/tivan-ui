<script>
  // import "../my-style.scss";
  // import "../../node_modules/bulma/css/bulma.css";
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<main>
  <Nav />
  <slot />
</main>
