<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;
    // const { stream_url, description } = await new TivanService().getCamera(
    // slug
    // );
    // const res = await this.fetch("/camera/" + slug + "/");
    // const camera = await res.json();
    return { cameraId: slug };
  }
</script>

<script>
  export let cameraId;
  import TivanService from "../../../services/tivan.js";
  import Live from "../../../components/Live.svelte";

  const camera = new TivanService().getCamera(cameraId);
</script>

{#await camera then camera}

  <section class="section">
    <div class="container">
      <Live
        stream_url={camera.stream_url}
        description={camera.description}
        id={camera.id} />
    </div>
  </section>

{/await}
