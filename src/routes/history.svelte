<script>
  import { onMount } from "svelte";
  //   import bulmaCalendar from "~bulma-calendar/dist/js/bulma-calendar.min.js";

  onMount(function() {
    // require("../../node_modules/bulma-calendar/dist/js/bulma-calendar.js");

    // Initialize all input of date type.
    const options = {
      isRange: true,
      displayMode: "inline"
    };
    const calendars = bulmaCalendar.attach('[type="datetime"]', options);

    // Loop on each calendar initialized
    calendars.forEach(calendar => {
      // Add listener to date:selected event
      console.log(calendar);
      calendar.on("date:selected", date => {
        console.log(date);
      });
    });

    // To access to bulmaCalendar instance of an element
    const element = document.querySelector("#my-element");
    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      console.log(element.bulmaCalendar);
      element.bulmaCalendar.on("select", datepicker => {
        console.log(datepicker.data.value());
      });
    }
  });
</script>

<input
  id="datepickerDemoDefault"
  class="input"
  type="datetime"
  value="09/25/2018" />
