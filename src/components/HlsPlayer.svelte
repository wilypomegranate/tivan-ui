<script>
  import Hls from "../../node_modules/hls.js/dist/hls.js";

  import { onMount } from "svelte";

  export let url;

  let duration;
  let time = 0;
  let paused = false;

  function randomId() {
    return btoa(Math.random()).substring(0, 12);
  }

  let id = randomId();

  onMount(() => {
    let video = document.getElementById(id);
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", function() {
        video.play();
      });
    }

    setTimeout(() => {
      if (!isNaN(duration)) {
        time = duration - 10;
      }
    }, 1000);
  });
</script>

<video
  {id}
  controls
  autoplay="true"
  bind:duration
  bind:currentTime={time}
  bind:paused />
