const pathParts = window.location.pathname.split('/').filter(part => part);
let get_topic = '';

if (pathParts.length === 1) {
  get_topic = pathParts[0];
}

const topic_page = document.getElementById('topic-section');

show_topic();

function show_topic() {
  topic_page.innerHTML = '';
  topic_page.innerHTML = `
    <div class="section-title">
        <div class="cover-title">
          <h2>${replaceDashWithSpace(capitalizeAllLetter(get_topic))}</h2>
          <div class="cover-left-title"></div>
        </div>
    </div>
    <div class="topic-content" id="topic-content"></div>
    `;
  topic_content();
}

async function topic_content() {
  const container = document.getElementById('topic-content');
  container.innerHTML = '';

  try {
    const response = await fetch(`${databaseUrl}/public_data/news.json?orderBy="topic"&equalTo="${get_topic}"&limitToFirst=12`);
    const news = await response.json();

    if (!response.ok || !news) {
      shows_error();
      return;
    }

    const newsArray = Object.entries(news || {}).map(([id, item]) => ({ id, ...item }));

    const totalItems = newsArray.length;
    const itemsPerRow = 3;
    const maxItems = totalItems - (totalItems % itemsPerRow);
    const finalNewsArray = newsArray.slice(0, maxItems);

    let contentHTML = '';
    let titleHTML = '';
    for (let article of finalNewsArray) {
      titleHTML = article.topic;
      contentHTML += `
        <a href="/${article.id}">
          <div class="section-img skeleton-active">
            <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
          </div>
          <div class="section-text">
            <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
            <small><i class="fa-regular fa-clock"></i> ${new Date(article.timestamp).toLocaleDateString()}</small>
          </div>
        </a>
      `;
    }

    container.innerHTML = contentHTML;
    topic_page.classList.remove('hide');

    let titleElement = document.head.querySelector('title');
    if (!titleElement) {
      titleElement = document.createElement('title');
      document.head.appendChild(titleElement);
    }
    titleElement.textContent = textOutput(titleHTML);
  } catch (error) {
    shows_error();
  }
}
