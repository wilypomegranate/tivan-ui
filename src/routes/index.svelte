<script>
  import HlsPlayer from "../components/HlsPlayer.svelte";
</script>

<svelte:head>
  <title>Live View</title>
</svelte:head>
<h1>Welcome to Tivan!</h1>
<div class="button is-primary">Primary</div>
<HlsPlayer
  url="http://devimages.apple.com/iphone/samples/bipbop/bipbopall.m3u8" />
