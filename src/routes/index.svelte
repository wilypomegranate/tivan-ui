<script>
  import HlsPlayer from "../components/HlsPlayer.svelte";
  import TivanService from "../services/tivan.js";
  import Snapshot from "../components/Snapshot.svelte";

  let cameras = new TivanService().getCameras();
</script>

<svelte:head>
  <title>Overview</title>
</svelte:head>

<section class="section">
  <div class="container">

    <div class="columns">
      {#await cameras then cameras}
        {#each cameras as camera}
          <div class="column">
            <Snapshot
              snapshot={camera.snapshot_url}
              description={camera.description}
              id={camera.id} />
          </div>
        {/each}
      {/await}
    </div>

  </div>
</section>

<!-- <HlsPlayer
  url="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8" /> -->
