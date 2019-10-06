<script>
  import { onMount } from "svelte";
  import dateFns from "date-fns";
  import TivanService from "../services/tivan.js";

  // The default range now - 1 day.
  let endDt = new Date();
  let startDt = dateFns.subDays(endDt, 1);

  function fmtIso(date) {
    return dateFns.format(date, "YYYY-MM-DDTHH:mm:ssZ");
  }

  function fmtIsoLocal(date) {
    return dateFns.format(date, "YYYY-MM-DDTHH:mm:ss");
  }

  function fmtInput(date) {
    return dateFns.format(date, "MM/DD/YYYY HH:mm");
  }

  function isoRange(start, end) {
    return fmtInput(start) + " - " + fmtInput(end);
  }

  function parseDt(input) {
    return dateFns.parse(input.target.value);
  }

  function setStartDt(dt) {
    startDt = parseDt(dt);
  }
  function setEndDt(dt) {
    endDt = parseDt(dt);
  }

  let events = new TivanService().getEvents(fmtIso(startDt), fmtIso(endDt));

  onMount(function() {
    // Make Ajax request to event for date range.
  });
</script>

<label class="label">Search Range Start</label>
<div class="field">
  <div class="field-body">
    <div class="control">
      <input
        type="datetime-local"
        class="input"
        value={fmtIsoLocal(startDt)}
        on:input={setStartDt} />
    </div>
  </div>
</div>

<label class="label">Search Range Stop</label>
<div class="field">
  <div class="field-body">
    <div class="control">
      <input
        type="datetime-local"
        class="input"
        value={fmtIsoLocal(endDt)}
        on:input={setEndDt} />
    </div>
  </div>
</div>

<section class="section">
  <div class="container">

    <div class="columns">
      {#await events then events}
        {#each events.results as event}
          <div class="column">
            <p>{event.start_time}</p>
          </div>
        {/each}
      {/await}

    </div>
  </div>
</section>
