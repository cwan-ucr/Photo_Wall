// script.js - 负责页面的逻辑和交互

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 初始化基本信息
    document.getElementById('couple-names').textContent = myLoveData.coupleNames;
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // 2. 启动恋爱计数器
    startLoveCounter(myLoveData.startDate);

    // 3. 渲染时光轴
    renderTimeline(myLoveData.timelineEvents);

    // 4. 渲染影像馆
    renderGallery(myLoveData.galleryImages);

    // 5. 渲染愿望清单
    renderBucketList(myLoveData.bucketList);
});


// --- 功能函数定义区 ---

// 功能：计算并更新恋爱时间
function startLoveCounter(startDateString) {
    const counterElement = document.getElementById('counter');
    const startDate = new Date(startDateString).getTime();

    // 每秒更新一次
    setInterval(function() {
        const now = new Date().getTime();
        const difference = now - startDate;

        // 计算天、时、分、秒
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        counterElement.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
    }, 1000);
}

// 功能：渲染时光轴 HTML
function renderTimeline(events) {
    const timelineList = document.getElementById('timeline-list');
    let htmlContent = '';

    events.forEach(event => {
        // 检查是否有图片，如果有则生成图片HTML标签
        const imageHtml = event.image ? `<img src="${event.image}" alt="${event.title}" class="timeline-img">` : '';
        
        htmlContent += `
            <div class="timeline-item">
                <div class="timeline-date">${event.date}</div>
                <div class="timeline-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    ${imageHtml}
                </div>
            </div>
        `;
    });
    timelineList.innerHTML = htmlContent;
}

// 功能：渲染影像馆 HTML
function renderGallery(images) {
    const galleryList = document.getElementById('gallery-list');
    let htmlContent = '';

    images.forEach(img => {
        htmlContent += `
            <div class="gallery-item">
                <img src="${img.src}" alt="${img.caption}" loading="lazy">
                <p class="gallery-caption">${img.caption}</p>
            </div>
        `;
    });
    galleryList.innerHTML = htmlContent;
}

// 功能：渲染愿望清单 HTML
function renderBucketList(list) {
    const bucketListContainer = document.getElementById('bucket-list');
    let htmlContent = '';

    list.forEach((item, index) => {
        const isCompleted = item.completed ? 'checked' : '';
        const completedClass = item.completed ? 'completed' : '';
        // 注意：这里的 checkbox 是为了视觉效果，目前点击不会自动保存状态
        htmlContent += `
            <li class="bucket-item ${completedClass}">
                <input type="checkbox" class="bucket-checkbox" ${isCompleted} disabled>
                <span>${item.task}</span>
            </li>
        `;
    });
    bucketListContainer.innerHTML = htmlContent;
}