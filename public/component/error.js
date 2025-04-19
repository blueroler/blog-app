function shows_error() {

    let titleElement = document.head.querySelector('title');
    if (!titleElement) {
        titleElement = document.createElement('title');
        document.head.appendChild(titleElement);
    }
    titleElement.textContent = "Page not found";

    const error_page = document.getElementById('main-content')

    error_page.style.display = 'flex'
    error_page.innerHTML = '';
    error_page.innerHTML = `<style>
    .error {
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        margin: 10px auto;
    }

    .error h1 {
        text-align: center;
    }

    .error-noti {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .error-task {
        margin: 20px 0;
    }

    .error-task ol {
        margin: 20px 0;
        border-bottom: 1px solid #ddd;
    }

    .error-task ol li {
        margin: 20px 0;
    }

    .error-task a {
        
    }

    .error-task button {
        background: #3498db;
        color: white;
        font-size: 16px;
        border: none;
        padding: 3px 7px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .error-task button:hover {
        background: #2980b9;
    }
    
    .icon {
        width: 1.2em;
        height: 1.2em;
        filter: invert(1);
    }</style>

    <div class="error">
        <div class="error-noti">
        <h1>Something has gone wrong…</h1>
        </div>
        <div class="error-task">
        <h4>How did I get here?</h4>
        <ol>
            <li>The post may have been deleted or hidden.</li>
            <li>You may be trying to access the wrong URL!</li>
        </ol>
        <h4>What should you do when you come across this page?</h4>
        <ol>
            <li>Click the button <button onclick="window.history.back();"><img src="/icons/arrow-left.svg" alt="arrow icon" class="icon" /></button> on your browser.</li>
            <li>Or visit our home page <button onclick='window.location.href = "/";'>Return <img src="/icons/home.svg" alt="Home icon" class="icon" /></button></li>
        </ol>
        </div>
    </div>
    `;
}