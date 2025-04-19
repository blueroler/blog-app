const adsCSS = `
<style>
  #ads-section {
    display: none;
    width: 100%;
    aspect-ratio: 5 / 1;
    margin: 10px auto;
    padding-bottom: 10px;
    border-bottom: 2px solid #ddd;
  }
  .ads-banner {
    text-align: center;
    max-width: 1020px;
    aspect-ratio: 5 / 1;
    position: relative;
    overflow: hidden;
  }
  .banner-item {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transform: scale(1);
    transition: opacity 1s, transform 2s, left 2s;
    z-index: 1;
  }
  .banner-item.active {
    left: 0;
    opacity: 1;
    z-index: 2;
  }
  .banner-item.exiting {
    opacity: 0;
    transform: scale(0.1);
  }
</style>
`;

const ads_body = document.createElement("div");
ads_body.innerHTML = `
  ${adsCSS}
  <div id="ads-section">
    <div class="ads-banner" id="ads-banner"></div>
  </div>
`;
document.querySelector("main").appendChild(ads_body);

const adsSection = document.getElementById("ads-section");
const banner = document.getElementById("ads-banner");
let currentIndex = 0;

(async function checkAdsStatus() {
  try {
    const res = await fetch(`${databaseUrl}/public_data/ads.json`);
    const { ads_status } = await res.json();
    if (ads_status != 0) {
      adsSection.style.display = "block";
      await fetchAds();
    }
  } catch (err) {
    console.error("Error loading ads status:", err);
  }
})();

async function fetchAds() {
  try {
    const res = await fetch(`${databaseUrl}/public_data/ads/ads_banner.json`);
    const data = await res.json();

    if (!data) return banner.style.display = "none";

    const items = Object.entries(data)
      .map(([id, item]) => ({ id, ...item }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(item => ({ img: item.img, url: item.ads }));

    renderBanner(items);
  } catch (err) {
    console.error("Error loading banner data:", err);
  }
}

function renderBanner(items) {
  if (!items.length) return;

  banner.innerHTML = '';
  banner.style.display = 'block';

  items.forEach(({ img, url }, i) => {
    const a = document.createElement('a');
    a.className = 'banner-item';
    a.href = url;
    a.style.backgroundImage = `url('${img}')`;
    if (i === 0) a.classList.add('active');
    banner.appendChild(a);
  });

  if (items.length > 1) initializeBanner();
}

function initializeBanner() {
  const items = document.querySelectorAll('.banner-item');
  if (!items.length) return;

  currentIndex = 0;
  items.forEach(item => {
    item.classList.remove('active', 'exiting');
    item.style.left = '100%';
  });

  items[0].classList.add('active');
  items[0].style.left = '0';

  setInterval(() => {
    const current = items[currentIndex];
    const nextIndex = (currentIndex + 1) % items.length;
    const next = items[nextIndex];

    current.classList.remove('active');
    current.classList.add('exiting');
    current.style.zIndex = 1;

    next.style.left = '100%';
    next.style.zIndex = 2;

    setTimeout(() => {
      next.classList.add('active');
      next.style.left = '0';
    }, 10);

    setTimeout(() => {
      current.classList.remove('exiting');
      current.style.left = '100%';
      currentIndex = nextIndex;
    }, 2000);
  }, 8000);
}