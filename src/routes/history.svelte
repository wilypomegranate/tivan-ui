<script>
  import { onMount } from "svelte";
  import dateFns from "date-fns";
  import TivanService from "../services/tivan.js";

  // The default range now - 1 day.
  let endDt = new Date();
  let startDt = dateFns.subDays(endDt, 1);
  const local_tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  function fmtIso(date) {
    return dateFns.format(date, "YYYY-MM-DDTHH:mm:ssZ");
  }

  function fmtIsoLocal(date) {
    return dateFns.format(date, "YYYY-MM-DDTHH:mm:ss");
  }

  function fmtInput(date) {
    return dateFns.format(date, "MM/DD/YYYY HH:mm");
  }

  function fmtReadable(date) {
    return dateFns.format(date, "MM/DD/YYYY HH:mm:ss");
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

  let events = new Promise(function() {
    return [];
  });

  let cameras = new Promise(function() {
    return [];
  });

  let camerasById = {};

  const tivanService = new TivanService();

  let page = 1;
  const pageSize = 4;

  onMount(async function() {
    eventSearch();
    cameras = await tivanService.getCameras();
    cameras.forEach(camera => {
      camerasById[camera.id] = camera;
    });
    // Make Ajax request to event for date range.
  });

  function eventSearch() {
    events = tivanService.getEvents(fmtIso(startDt), fmtIso(endDt), page);
  }

  function calculateTotalPages(count) {
    return Math.ceil(count / pageSize);
  }

  function nextPage(count) {
    const numPages = calculateTotalPages(count);
    if (page < numPages) {
      page++;
      eventSearch();
    }
  }

  function previousPage(count) {
    if (page > 1) {
      page--;
      eventSearch();
    }
  }
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
<div class="control">
  <button class="button is-success" on:click={eventSearch}>Search</button>
</div>

<section class="section">

  {#await events then events}
    <div class="columns">
      {#each events.results as event}
        <div class="column is-quarter">
          <!-- <img src={event.picture} alt="Captured event snapshot" /> -->
          <div class="card">
            <div class="card-image">
              <figure class="image is-16by9">
                <a href={event.video} target="_blank">
                  <img src={event.picture} alt={event.picture} />
                </a>
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <br />
                <p class="title is-6">
                  {camerasById[event.camera].description}
                </p>
                <br />
                <p class="title is-6">Start</p>
                <p class="subtitle is-6">
                  {fmtReadable(new Date(event.start_time))}
                </p>
                <br />
                <p class="title is-6">Stop</p>
                <p class="subtitle is-6">
                  {fmtReadable(new Date(event.stop_time))}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <nav class="pagination" role="navigation" aria-label="pagination">
      <div
        class="pagination-previous"
        on:click={() => previousPage(events.count)}>
        Previous
      </div>
      <div class="pagination-next" on:click={() => nextPage(events.count)}>
        Next page
      </div>
      <ul class="pagination-list">
        <li>
          {#if page === 1}
            <div class="pagination-link is-current" aria-label="Goto page 1">
              1
            </div>
          {:else}
            <div
              class="pagination-link"
              aria-label="Goto page 1"
              on:click={() => {
                page = 1;
                eventSearch();
              }}>
              1
            </div>
          {/if}
        </li>
        {#if page < calculateTotalPages(events.count) && page !== 1}
          <li>
            <div
              class="pagination-link is-current"
              aria-label="Goto page {page}">
              {page}
            </div>
          </li>
        {/if}
        {#if calculateTotalPages(events.count) > 2}
          <li>
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li>
            {#if page === calculateTotalPages(events.count)}
              <div
                class="pagination-link is-current"
                aria-label="Goto page {calculateTotalPages(events.count)}">
                {calculateTotalPages(events.count)}
              </div>
            {:else}
              <div
                class="pagination-link"
                aria-label="Goto page {calculateTotalPages(events.count)}"
                on:click={() => {
                  page = calculateTotalPages(events.count);
                  eventSearch();
                }}>
                {calculateTotalPages(events.count)}
              </div>
            {/if}
          </li>
        {/if}
      </ul>
    </nav>

  {/await}

</section>
