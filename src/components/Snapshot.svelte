<script>
  import HlsPlayer from "./HlsPlayer.svelte";

  export let snapshot;
  export let description;
  export let id;
  export let streamUrl;
  const imgId = Math.random();

  function reload() {
    setInterval(() => {
      document.getElementById(imgId).src = snapshot + "?r=" + Math.random();
    }, 5000);
  }

  let selected = false;

  function select() {
    selected = true;
  }
</script>

<style>
  .card {
    max-width: 24rem !important;
  }
</style>

<!-- <d class="card" style="max-width:24rem"> -->
<!-- <a class="card" href="/camera/live/{id}/"> -->
<div class="card" on:click={select}>
  <div class="card-image">
    {#if !selected}
      <img id={imgId} src={snapshot} alt="Snapshot image" onLoad={reload()} />
    {:else}
      <HlsPlayer url={streamUrl} />
    {/if}
  </div>
  <div class="card-content">
    <p class="subtitle is-6">{description}</p>
  </div>
</div>
