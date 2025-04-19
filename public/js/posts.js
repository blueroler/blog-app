const pathParts = window.location.pathname.split('/').filter(part => part);
let get_topic = '';
let postId = '';

if (pathParts.length === 1) {
  postId = pathParts[0];
}

show_posts();

function show_posts() {
  document.getElementById('post-section').innerHTML = `
    <div id="posts-title"></div>
    <div class="post-body" id="post-body"></div>`;
  posts_name()
}

async function posts_name() {
  try {
    const response = await fetch(`${databaseUrl}/public_data/news/${postId}.json`);
    const post = await response.json();

    if (!response.ok) {
      shows_error();
      return;
    }

    if (!post) {
      shows_error();
      return;
    }

    let titleElement = document.head.querySelector('title');
    if (!titleElement) {
      titleElement = document.createElement('title');
      document.head.appendChild(titleElement);
    }
    titleElement.textContent = textOutput(post.name);
    get_topic = post.topic;

    const htmlContent = `
      <div class="posts-title">
        <small class="topic-title">${capitalizeAllLetter(post.topic)}</small>
        <small>Published: ${new Date(post.timestamp).toLocaleDateString()}</small>
      </div>
      <h1>${capitalizeFirstLetter(textOutput(post.name))}</h1>
    `;

    document.getElementById('posts-title').innerHTML = htmlContent;
    posts_body_content();
  } catch (error) {
    shows_error();
  }
}

async function posts_body_content() {
  const fetchUrl = `${databaseUrl}/public_data/post_content/${postId}.json`;
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      return;
    }

    const data = await response.json();
    let htmlContent = '';

    const content = data === null ? '' : data;

    htmlContent += `${content}`;

    document.getElementById('post-body').innerHTML = htmlContent;
  } catch (error) {
    shows_error();
  }
  load_list_more();
  load_more_topic();
}

/////////////////////////////////////////////////

function load_list_more() {
  const show_list = document.getElementById('list-section');
  show_list.innerHTML = '';
  show_list.innerHTML = `
    <div class="list-sticky">
      <div class="cover-title">
        <h2>Recommended</h2>
        <div class="cover-left-title"></div>
      </div>
      <div class="posts-list-section" id="posts-list-section"></div>
    </div>
    `;
  list();
}

async function list() {
  const response = await fetch(`${databaseUrl}/public_data/news.json?orderBy="topic"&equalTo="${get_topic}"&limitToFirst=7`);
  const news = await response.json();
  const newsArray = Object.entries(news || {}).map(([id, item]) => ({
    id,
    ...item,
  }));

  const container = document.getElementById('posts-list-section');
  container.innerHTML = '';

  let contentHTML = '';
  let count = 0;
  for (let article of newsArray) {
    if (count >= 6) {
      break;
    }
    if (article.id !== postId) {
      contentHTML += `
        <a href="/${article.id}" class="posts-list-item" >
            <div class="posts-list-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
            </div>
            <div class="posts-list-text">
              <small><i class="fa-regular fa-clock"></i> ${new Date(article.timestamp).toLocaleDateString()}</small>
              <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
            </div>
          </a>`;
      count++;
    }
  }
  container.innerHTML = contentHTML;
}

async function load_more_topic() {
  let putArray = topics.filter(key => key !== get_topic);
  let newsList = await fetchNewsPosts(putArray);

  const show = document.getElementById('topic-section');
  show.innerHTML = `
        <div class="cover-title">
          <h2>More topic</h2>
          <div class="cover-left-title"></div>
        </div>
        <div class="topic-container" id="first-topic"></div>
        <div class="topic-container" id="second-topic"></div>
        `;

  newsList.sort((a, b) => b.timestamp - a.timestamp);
  put_topic(newsList);
}

async function fetchNewsPosts(keys) {
  let newsPromises = keys.map(async (section) => {
    const response = await fetch(`${databaseUrl}/public_data/news.json?orderBy="topic"&equalTo="${section}"&limitToFirst=1`);
    const news = await response.json();

    if (!news) return null;

    const [id, item] = Object.entries(news)[0];
    return { id, ...item };
  });

  let newsList = await Promise.all(newsPromises);
  return newsList.filter(item => item !== null);
}

function put_topic(newsList) {
  const first_container = document.getElementById('first-topic');
  const second_container = document.getElementById('second-topic');
  let first_content = '';
  let second_content = '';

  const firstArray = newsList.slice(0, 3);

  for (let article of firstArray) {
    first_content += `
          <a href="/${article.id}" class="topic-list-item">
            <div class="topic-list-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
              <h5>${capitalizeAllLetter(article.topic)}</h5>
            </div>
            <div class="topic-list-text">
              <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
              <small><i class="fa-regular fa-clock"></i> ${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
        </a>
        `;
  }
  first_container.innerHTML = first_content;

  const secondArray = newsList.slice(3, 6);

  for (let article of secondArray) {
    second_content += `
          <a href="/${article.id}" class="topic-list-item">
            <div class="topic-list-img skeleton-active">
              <img src="${article.summary}" alt="${article.name}" onload="removeSkeleton(this)" onerror="handleImageError(this)" />
              <h5>${rcapitalizeAllLetter(article.topic)}</h5>
            </div>
            <div class="topic-list-text">
              <h4>${capitalizeFirstLetter(textOutput(article.name))}</h4>
              <small><i class="fa-regular fa-clock"></i> ${new Date(article.timestamp).toLocaleDateString()}</small>
            </div>
        </a>
        `;
  }
  second_container.innerHTML = second_content;
}