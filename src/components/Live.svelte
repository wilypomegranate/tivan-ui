<script>
  export let stream_url;
  export let description;
  export let id;

  import HlsPlayer from "../components/HlsPlayer.svelte";
</script>

<div class="card">
  <div class="card-image">
    <HlsPlayer url={stream_url} />
  </div>
  <div class="card-content">
    <p class="subtitle is-6">{description}</p>
  </div>
</div>
