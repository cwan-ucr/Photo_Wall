document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageText');
    const nameInput = document.getElementById('userName');
    const submitBtn = document.getElementById('submitMessage');
    const exportBtn = document.getElementById('exportMessages');

    // Firebase 配置（已与你的实际项目匹配）
    const firebaseConfig = {
        apiKey: "AIzaSyAhD0Kbk6EZqqCN1L-G8_9OiMlNVhyu7uA",
        authDomain: "love-guestbook.firebaseapp.com",
        databaseURL: "https://love-guestbook-default-rtdb.firebaseio.com",
        projectId: "love-guestbook",
        storageBucket: "love-guestbook.appspot.com",
        messagingSenderId: "976044421335",
        appId: "1:976044421335:web:89c2c62f91e3d3af9a0092"
    };

    // 初始化 Firebase（使用 v8 语法）
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database().ref('messages');

    // 实时加载留言
    db.on('value', (snapshot) => {
        const data = snapshot.val();
        messagesContainer.innerHTML = '';
        for (let id in data) {
            const msg = data[id];
            const messageEl = document.createElement('div');
            messageEl.className = 'message-bubble';
            messageEl.innerHTML = `
                <div class="message-author">${msg.author}</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-date">${new Date(msg.timestamp).toLocaleString()}</div>
            `;
            messagesContainer.appendChild(messageEl);
        }
    });

    // 提交留言
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const text = messageInput.value.trim();
        const author = nameInput.value.trim() || "Anonymous";

        if (text) {
            const newMsg = {
                text,
                author,
                timestamp: Date.now()
            };
            db.push(newMsg);
            messageInput.value = '';
            nameInput.value = '';

            if (typeof createHeart === 'function') {
                createHeart(window.innerWidth / 2, window.innerHeight / 2, 'mouse');
            }
        } else {
            alert('Please write a message!');
        }
    });

    // 导出留言为 JSON 文件
    exportBtn.addEventListener('click', async function () {
        const snapshot = await db.once('value');
        const data = snapshot.val() || {};
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `love_messages_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
