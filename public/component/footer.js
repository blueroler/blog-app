const footer = document.createElement("div");
footer.innerHTML = `
  <style>
.footer {
    background-color: #036;
    color: #fff;
    padding: 20px 0;
    font-family: Arial, sans-serif;
}
.container {
    width: 90%;
    max-width: 1200px;
    margin: auto;
}
.footer-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
    gap: 20px;
}
.footer-top .logo img {
    height: 40px;
}
.footer-nav ul {
    list-style: none;
    display: flex;
    gap: 5px;
    padding: 0;
}
.footer-nav ul li {
    display: inline;
    padding-left: 5px;
    border-left: 2px solid #fff;
}
.footer-nav ul li:last-child {
    display: inline;
    padding-right: 5px;
    border-right: 2px solid #fff;
}
.footer-nav ul li a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
}
.footer-nav ul li a:hover {
    color: #fff;
}
.footer-content {
    text-align: center;
    padding: 15px 0;
}
.footer-content h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}
.footer-content p {
    font-size: 14px;
    color: #ccc;
    line-height: 1.5;
}
.highlights {
    list-style: none;
    padding: 0;
    font-size: 14px;
    color: #ccc;
}
.footer-bottom {
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
}
.footer-bottom a {
    color: #ccc;
    text-decoration: none;
}
.footer-bottom a:hover {
    color: #fff;
}
.social-links {
    margin-bottom: 10px;
}
.social-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 14px;
    margin: 0 5px;
}
.social-links a:hover {
    color: #fff;
}
</style>


  <footer class="footer">
    <div class="container">
        <div class="footer-top">
            <div class="logo">
                <a href="/"><img src="/logo.png" alt="Blueroler News"></a>
            </div>
            <h3>Blueroler News — Breaking News, Hot Topics, and Global Updates 24/7</h3>
            <nav class="footer-nav">
                <ul id="list-footer-action"></ul>
            </nav>
        </div>
        <div class="footer-content">
            <p>Welcome to <b>Blueroler.com</b>, your go-to source for the latest and most trending news from around the world. We bring you real-time updates on current affairs, business, technology, sports, entertainment, and more — keeping you informed about the hottest topics that matter.</p>
            <ul class="highlights">
                <li>📌 Fast - Accurate - Reliable News</li>
                <li>📌 24/7 Breaking News Coverage</li>
                <li>📌 Trusted by Millions of Readers</li>
            </ul>
        </div>
        <div class="footer-bottom">
            <p>📩 Contact Us: <a href="mailto:admin@blueroler.com">admin@blueroler.com</a></p>
            <p>&copy; 2025 Blueroler.com — Stay Updated, Stay Ahead!</p>
        </div>
    </div>
</footer>
`;
document.body.appendChild(footer);

// list_topic_footer();

async function list_topic_footer() {
    const response = await fetch(`${databaseUrl}/public_data/footer_data.json?shallow=true`);
    const data = await response.json();

    let putArray = Object.keys(data).sort();
    load_topic_footer(putArray);
}

function load_topic_footer(putArray) {
    const drop = document.getElementById('list-footer-action');
    drop.innerHTML = '';
    for (let topic of putArray) {
        drop.innerHTML += `<li><a href="/${topic}"><b>${capitalizeFirstLetter(topic)}</b></a></li>`;
    }
}