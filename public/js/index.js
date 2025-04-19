load_hots_section();

async function load_hots_section() {
  const topics = ['Politics', 'Sports', 'Technology', 'Entertainment', 'Economy', 'Life', 'World'];
  const allTopicData = await fetchAllTopicsData(topics);

  const breakingList = allTopicData
    .map(topic => topic.articles[0])
    .filter(Boolean)
    .sort((a, b) => b.timestamp - a.timestamp);

  const topicsMap = Object.fromEntries(
    allTopicData.map(topic => [topic.name, topic.articles.slice(1, 4)])
  );

  breaking_news(breakingList);
  put_topic(topicsMap);
}

async function fetchAllTopicsData(topicNames) {
  const fetchPromises = topicNames.map(async (topic) => {
    const res = await fetch(`${databaseUrl}/public_data/news.json?orderBy="topic"&equalTo="${topic}"&limitToFirst=4`);
    const data = await res.json();
    if (!data) return { name: topic, articles: [] };

    const articles = Object.entries(data).map(([id, item]) => ({ id, ...item }));
    return { name: topic, articles };
  });

  return await Promise.all(fetchPromises);
}

// ========== BREAKING NEWS ==========

async function breaking_news(newsList) {
  const first_content = document.getElementById('first-content');
  const second_content = document.getElementById('second-content');
  const third_content = document.getElementById('third-content');

  first_content.innerHTML = '';
  second_content.innerHTML = '';
  third_content.innerHTML = '';

  const firstFragment = document.createDocumentFragment();
  const secondFragment = document.createDocumentFragment();
  const thirdFragment = document.createDocumentFragment();

  const firstArray = newsList.slice(0, 1);
  for (let article of firstArray) {
    let div = document.createElement('div');
    div.innerHTML = `
      <a href="/${article.id}" class="first-item">
        <div class="first-item-img skeleton-active">
            <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            <h5>${capitalizeAllLetter(article.topic)}</h5>
        </div>
        <div class="first-item-text">
            <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
        </div>
      </a>
    `;
    firstFragment.appendChild(div.firstElementChild);
  }
  first_content.appendChild(firstFragment);

  const secondArray = newsList.slice(1, 4);
  for (let article of secondArray) {
    let div = document.createElement('div');
    div.innerHTML = `
      <a href="/${article.id}" class="second-item">
        <div class="second-item-img skeleton-active">
            <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            <h5>${capitalizeAllLetter(article.topic)}</h5>
        </div>
        <div class="second-item-text">
            <small><img src="/icons/clock.svg" alt="time" class="icon-post" /> ${new Date(article.timestamp).toLocaleDateString()}</small>
            <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
        </div>
      </a>
    `;
    secondFragment.appendChild(div.firstElementChild);
  }
  second_content.appendChild(secondFragment);

  const thirdArray = newsList.slice(4, 7);
  for (let article of thirdArray) {
    let div = document.createElement('div');
    div.innerHTML = `
      <a href="/${article.id}" class="third-item">
        <div class="third-item-img skeleton-active">
            <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            <h5>${capitalizeAllLetter(article.topic)}</h5>
        </div>
        <div class="third-item-text">
            <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
            <small><img src="/icons/clock.svg" alt="time" class="icon-post" /> ${new Date(article.timestamp).toLocaleDateString()}</small>
        </div>
      </a>
    `;
    thirdFragment.appendChild(div.firstElementChild);
  }
  third_content.appendChild(thirdFragment);
}

// ========== TOPIC SECTION ==========

async function put_topic(topicsMap) {
  const show = document.getElementById('topic-section');
  show.innerHTML = `
    <div class="section-title">
      <div class="cover-title">
        <h2>Topics</h2>
        <div class="cover-left-title"></div>
      </div>
    </div>
  `;

  const fragment = document.createDocumentFragment();

  for (let [section, newsData] of Object.entries(topicsMap)) {
    if (!newsData.length) continue;

    let sectionDiv = document.createElement('div');
    sectionDiv.className = 'topic-item';
    sectionDiv.id = `${section}-item`;

    sectionDiv.innerHTML = `
      <h2><a href="/${section}">${capitalizeAllLetter(section)}</a></h2>
      <div class="carousel" id="${section}-carousel"></div>
    `;

    const carousel = sectionDiv.querySelector('.carousel');
    carousel.appendChild(renderNews(newsData));

    fragment.appendChild(sectionDiv);
  }

  show.appendChild(fragment);
}

function renderNews(newsArray) {
  const fragment = document.createDocumentFragment();

  for (let article of newsArray) {
    let div = document.createElement('div');
    div.innerHTML = `
      <a href="/${article.id}">
        <div class="section-img skeleton-active">
            <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
        </div>
        <div class="section-text">
            <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
            <small><img src="/icons/clock.svg" alt="time" class="icon-post" /> ${new Date(article.timestamp).toLocaleDateString()}</small>
        </div>
      </a>
    `;
    fragment.appendChild(div.firstElementChild);
  }

  return fragment;
}