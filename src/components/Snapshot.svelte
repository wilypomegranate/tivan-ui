<script>
  export let snapshot;
  export let description;
  const imgId = Math.random();

  function reload() {
    setInterval(() => {
      document.getElementById(imgId).src = snapshot + "?r=" + Math.random();
    }, 5000);
  }
</script>

<style>
  .card {
    max-width: 240px;
  }
</style>

<div class="card" style="max-width:24rem">
  <div class="card-image">
    <img id={imgId} src={snapshot} alt="Snapshot image" onLoad={reload()} />
  </div>
  <div class="card-content">
    <p class="subtitle is-6">{description}</p>
  </div>
</div>
