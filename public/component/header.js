const header = document.createElement("div");
header.innerHTML = `
<style>
  #header {
    width: 100%;
    height: 50px;
    top: 0;
    background-color: #003366;
    position: fixed;
    z-index: 1000;
    min-width: 320px;
  }

  .header-container {
    max-width: 1020px;
    margin: 0 auto;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: no-wrap;
    gap: 4px;
  }

  .header-container .menu-toggle {
    display: none;
    height: 40px;
    padding: 5px 13px;
    font-size: 15px;
    cursor: pointer;
    background: none;
    border: none;
    color: #fff;
    border-radius: 4px;
  }

  .header-container .menu-toggle:hover {
    background-color: #0056b3;
  }

  .header-container nav {
    display: flex;
    align-items: center;
    flex-wrap: no-wrap;
    gap: 3px;
  }

  .header-container nav a {
    height: 40px;
    color: #fff;
    text-decoration: none;
    font-size: 15px;
    padding: 5px 11px;
    text-transform: uppercase;
    white-space: nowrap;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
  }

  .header-container nav a:hover {
    background-color: #0056b3;
  }

  .header-container .actions-1, .header-container .actions-2 {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  .header-container .actions-1 a, .header-container .actions-2 a {
    height: 40px;
    padding: 5px 13px;
    font-size: 15px;
    color: #fff;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .header-container .actions-1 a:hover, .header-container .actions-2 a:hover {
    background-color: #0056b3;
  }

  .icon {
    width: 1.2em;
    height: 1.2em;
    filter: invert(1);
  }

  /* Mobile */
  @media (max-width: 900px) {
    .header-container nav {
      border-top: 1px solid #fff;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      position: absolute;
      top: 50px;
      left: 0;
      background-color: #003366;
      padding: 10px;
      transform: translateY(-100%);
      z-index: -1;
      display: block;
      transition: transform 0.3s ease-in-out;
    }

    .header-container .actions-1 {
      order: 2;
    }

    .header-container .actions-2 {
      order: 1;
    }

    .header-container button {
      order: 3;
    }

    .header-container nav {
      order: 4;
    }

    .header-container nav.open {
      display: flex;
      transform: translateY(0);
    }

    .header-container nav a {
      width: 100%;
    }

    .header-container .menu-toggle {
      display: block;
    }

    .header-container {
      align-items: center;
      justify-content: center;
      row-gap: 0px;
      column-gap: 20px;
      background-color: #003366;
    }

    .header-container .actions-1, .header-container .actions-2 {
      gap: 20px;
    }
  }
</style>

<div id="header">
  <div class="header-container">
    <div class="actions-1">
      <a title="Home" href="/">
        <img src="/icons/home.svg" alt="Home icon" class="icon" />
      </a>
      <a title="Breaking News" href="#">
        <img src="/icons/news.svg" alt="Newspaper icon" class="icon" />
      </a>
    </div>

    <button class="menu-toggle" id="menuToggle" title="Menu">
      <img src="/icons/bars.svg" alt="Menu icon" class="icon" />
    </button>

    <nav id="mainNav"></nav>

    <div class="actions-2">
      <a class="search-icon" href="/search" title="Search">
        <img src="/icons/glass.svg" alt="Search icon" class="icon" />
      </a>
      <a class="user-icon" href="https://admin.blueroler.com" title="Login" target="_blank">
        <img src="/icons/user.svg" alt="User icon" class="icon" />
      </a>
    </div>
  </div>
</div>
`;

document.body.appendChild(header);

document.addEventListener("DOMContentLoaded", () => {
  load_dropdown();
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
});

let topicsBackup = "";

function load_dropdown() {
  const drop = document.getElementById('mainNav');
  if (drop) {
    drop.innerHTML = '';
    for (let topic of topics) {
      drop.innerHTML += `<a href="/${topic}"><b>${capitalizeFirstLetter(topic)}</b></a>`;
    }
  }
  topicsBackup = nav.innerHTML;
}

const searchBtn = document.querySelector('.actions-2 a[title="Search"]');
const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

let isSearchMode = false;

let isMobile = window.innerWidth <= 900;

window.addEventListener("resize", () => {
  const wasMobile = isMobile;
  isMobile = window.innerWidth <= 900;

  if (wasMobile !== isMobile && isSearchMode) {
    if (isMobile) {
      nav.innerHTML = `<div style="width: 100%;"><input type="text" id="searchInput" placeholder="Search..." style="width: 100%; padding: 8px; font-size: 15px; border-radius: 4px; border: none; outline: none;" /></div>` + topicsBackup;
      nav.classList.add("open");
    } else {
      nav.innerHTML = `<div style="width: 100%;"><input type="text" id="searchInput" placeholder="Search..." style="width: 100%; padding: 8px; font-size: 15px; border-radius: 4px; border: none; outline: none;" /></div>`;
      nav.classList.remove("open");
      nav.style.display = "flex";
    }
    const input = document.getElementById("searchInput");
    if (input) {
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") searchBtn.click();
        else if (e.key === "Enter") {
          console.log("Search input:", input.value.trim());
        }
      });
    }
  } else if (!isMobile && !isSearchMode) {
    nav.classList.remove("open");
    nav.style.display = "flex";
    nav.innerHTML = topicsBackup;
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  isSearchMode = !isSearchMode;

  if (isSearchMode) {
    if (isMobile) {
      nav.innerHTML = `<div style="width: 100%;"><input type="text" id="searchInput" placeholder="Search..." style="width: 100%; padding: 8px; font-size: 15px; border-radius: 4px; border: none; outline: none;" /></div>` + topicsBackup;
      nav.classList.add("open");
    } else {
      nav.innerHTML = `<div style="width: 100%;"><input type="text" id="searchInput" placeholder="Search..." style="width: 100%; padding: 8px; font-size: 15px; border-radius: 4px; border: none; outline: none;" /></div>`;
      nav.classList.remove("open");
      nav.style.display = "flex";
    }
    const input = document.getElementById("searchInput");
    if (input) {
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") searchBtn.click();
        else if (e.key === "Enter") {
          console.log("Search input:", input.value.trim());
          alert('Feature Under Development');
        }
      });
    }
  } else {
    restoreNav();
  }
});

function restoreNav() {
  nav.innerHTML = topicsBackup;
  if (isMobile) {
    nav.classList.remove("open");
  } else {
    nav.style.display = "flex";
  }
  isSearchMode = false;
}