<script>
  import { onMount } from "svelte";
  import dateFns from "date-fns";
  //   import bulmaCalendar from "~bulma-calendar/dist/js/bulma-calendar.min.js";

  // The default range now - 1 day.
  let endDt = new Date();
  let startDt = dateFns.subDays(endDt, 1);
  let dtRange = isoRange(startDt, endDt);

  function fmtIso(date) {
    return dateFns.format(date, "YYYY-MM-DDTHH:mm:ssZ");
  }

  function fmtInput(date) {
    return dateFns.format(date, "MM/DD/YYYY HH:mm");
  }

  function isoRange(start, end) {
    return fmtInput(start) + " - " + fmtInput(end);
  }

  onMount(function() {
    // require("../../node_modules/bulma-calendar/dist/js/bulma-calendar.js");

    // Initialize all input of date type.
    const options = {
      isRange: true,
      displayMode: "dialog"
    };
    const calendars = bulmaCalendar.attach('[type="datetime"]', options);

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
      // There is a bug in Bulma calendar with setting
      // a value for a range. It just sets the value
      // to both the Date and Time picker.
      // This is mostly okay in this use case since the default
      // time range doesn't have to be too exact.
      // calendar.value(dtRange);
      // calendar.datePicker.value(dtRange.split" ")[0]);
      // calendar.timePicker.value(dtRange.split(" ")[1]);
      // Add listener to select event so the DateTime range
      // can be extracted.
      calendar.on("select", date => {
        let start = calendar.datePicker.start
          ? dateFns.getTime(
              dateFns.addMinutes(
                dateFns.addHours(
                  calendar.datePicker.start,
                  dateFns.getHours(calendar.timePicker.start)
                ),
                dateFns.getMinutes(calendar.timePicker.start)
              )
            )
          : undefined;
        let end = calendar.datePicker.end
          ? dateFns.getTime(calendar.datePicker.end)
          : undefined;

        if (end && calendar.options.isRange) {
          end = dateFns.getTime(
            dateFns.addMinutes(
              dateFns.addHours(
                calendar.datePicker.end,
                dateFns.getHours(calendar.timePicker.end)
              ),
              dateFns.getMinutes(calendar.timePicker.end)
            )
          );
        }

        // const values = value.split("-").map(item => item.trim)();
        const startValue = dateFns.format(
          new Date(start),
          "YYYY-MM-DDTHH:mm:ssZ"
        );
        const endValue = dateFns.format(new Date(end), "YYYY-MM-DDTHH:mm:ssZ");
        console.log(startValue, endValue);
      });
    });

    // To access to bulmaCalendar instance of an element
    // const element = document.querySelector("#my-element");
    // if (element) {
    //   // bulmaCalendar instance is available as element.bulmaCalendar
    //   console.log(element.bulmaCalendar);
    //   element.bulmaCalendar.on("select", datepicker => {
    //     console.log(datepicker.data.value());
    //   });
    // }
  });
</script>

<label class="label">Search Range</label>
<div class="field">
  <div class="field-body">
    <div class="control">
      <input type="datetime" class="input" value={dtRange} />
    </div>
  </div>
</div>
<!-- <input id="datepickerDemoDefault" class="input" type="date" /> -->
<!-- value="09/25/2018" /> -->
