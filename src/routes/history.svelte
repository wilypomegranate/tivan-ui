<script>
  import { onMount } from "svelte";
  import dateFns from "date-fns";

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

  onMount(function() {
    // Make Ajax request to event for date range.
    console.log(fmtIso(startDt), fmtIso(endDt));
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
