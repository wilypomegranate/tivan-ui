<script>
  import HlsPlayer from "../components/HlsPlayer.svelte";
  import TivanService from "../services/tivan.js";
  import { onMount } from "svelte";

  let cameras = new TivanService().getCameras();
</script>

<svelte:head>
  <title>Overview</title>
</svelte:head>
<h1>Welcome to Tivan!</h1>

{#await cameras then cameras}
  {#each cameras as camera}
    <ul>{camera.description}</ul>
  {/each}
{/await}

<!-- <HlsPlayer
  url="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8" /> -->
