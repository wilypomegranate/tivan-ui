<script>
  import { onMount } from "svelte";

  onMount(() => {
    document.addEventListener("DOMContentLoaded", () => {
      // Get all "navbar-burger" elements
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
      );

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
          el.addEventListener("click", () => {
            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle("is-active");
            $target.classList.toggle("is-active");
          });
        });
      }
    });
  });
</script>

<!-- <nav>
  <ul>
    <li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
    <li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>
  </ul>
</nav> -->
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <p>Tivan</p>
    </a>

    <div
      role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a href="/" class="navbar-item">Live</a>
      <a href="/history" class="navbar-item">History</a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <!-- <div class="button is-primary">Log in</div> -->
        </div>
      </div>
    </div>
  </div>
</nav>
