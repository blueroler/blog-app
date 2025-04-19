const skeleton = document.createElement("div");
skeleton.innerHTML = `
<style>
    .skeleton-active img {
        display: none;
    }

    .skeleton-active {
        position: relative;
    }

    .skeleton-active::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #ddd 25%, #eee 50%, #ddd 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 8px;
    }

    @keyframes shimmer {
        0% {
            background-position: -200% 0;
        }

        100% {
            background-position: 200% 0;
        }
    }
</style>
`;

document.body.appendChild(skeleton);

function removeSkeleton(img) {
    const imgContainer = img.parentElement;
    imgContainer.classList.remove('skeleton-active');
    img.style.display = 'block';
}

function handleImageError(img) {
    setTimeout(() => skeleton_error(img), 5000);
}

function skeleton_error(img) {
    const imgContainer = img.parentElement;
    imgContainer.classList.remove('skeleton-active');
    img.style.display = 'none';

    imgContainer.innerHTML = `
    <div 
      style=" display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      color: #aaa;
      font-size: 14px;
      border-radius: 8px;">
      Image Error
    </div>`;
}