document.addEventListener('DOMContentLoaded', function () {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageText');
    const submitBtn = document.getElementById('submitMessage');
    const exportBtn = document.getElementById('exportMessages');

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authContainer = document.getElementById('auth-container');
    const userInfo = document.getElementById('userInfo');
    const userPhoto = document.getElementById('userPhoto');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const messageForm = document.getElementById('message-form');


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

    // 初始化 Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.database().ref('messages');

    // 监听认证状态变化
    auth.onAuthStateChanged(user => {
        if (user) {
            // 用户已登录
            loginBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            messageForm.style.display = 'block';
            userPhoto.src = user.photoURL;
            userNameDisplay.textContent = user.displayName;
        } else {
            // 用户未登录
            loginBtn.style.display = 'block';
            userInfo.style.display = 'none';
            messageForm.style.display = 'none';
        }
    });

    // 登录
    loginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(error => {
            console.error("Login failed:", error);
        });
    });

    // 登出
    logoutBtn.addEventListener('click', () => {
        auth.signOut();
    });

    // 实时加载留言
    db.on('value', (snapshot) => {
        const data = snapshot.val();
        messagesContainer.innerHTML = '';

        if (data) {
            const sortedEntries = Object.entries(data).sort(
                ([, a], [, b]) => b.timestamp - a.timestamp
            );

            for (const [key, msg] of sortedEntries) {
                const currentUser = auth.currentUser;
                const likedBy = msg.likedBy || {};
                const hasLiked = Boolean(currentUser && likedBy[currentUser.uid]);
                const likeCount = Number(msg.likes || Object.keys(likedBy).length || 0);
                const messageEl = document.createElement('div');
                messageEl.classList.add('message-item');
                messageEl.innerHTML = `
                    <p class="message-text">${msg.text}</p>
                    <div class="message-footer">
                        <span class="message-author">by ${msg.author}</span>
                        <span class="message-time">${new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                    <div class="message-actions">
                        <button class="like-btn ${hasLiked ? 'liked' : ''}" data-message-id="${key}" type="button">
                            ❤ ${likeCount}
                        </button>
                    </div>
                `;
                messagesContainer.appendChild(messageEl);
            }
        }
    });

    messagesContainer.addEventListener('click', async function (event) {
        const likeBtn = event.target.closest('.like-btn');
        if (!likeBtn) return;

        const user = auth.currentUser;
        if (!user) {
            alert('Please login to like a message!');
            return;
        }

        likeBtn.disabled = true;
        const messageId = likeBtn.dataset.messageId;
        const msgRef = db.child(messageId);

        try {
            await msgRef.transaction((msg) => {
                if (!msg) return msg;

                const likedBy = msg.likedBy || {};
                const currentLikes = Number(msg.likes || Object.keys(likedBy).length || 0);

                if (likedBy[user.uid]) {
                    delete likedBy[user.uid];
                    msg.likes = Math.max(0, currentLikes - 1);
                } else {
                    likedBy[user.uid] = true;
                    msg.likes = currentLikes + 1;
                }

                msg.likedBy = likedBy;
                return msg;
            });

            if (typeof createHeart === 'function') {
                createHeart(event.clientX, event.clientY, 'mouse');
            }
        } catch (error) {
            console.error('Failed to update like:', error);
            alert('Like failed. Please try again.');
        } finally {
            likeBtn.disabled = false;
        }
    });


    // 提交留言
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const text = messageInput.value.trim();
        const user = auth.currentUser;

        if (text && user) {
            const newMsg = {
                text,
                author: user.displayName,
                uid: user.uid,
                timestamp: Date.now(),
                likes: 0
            };
            db.push(newMsg);
            messageInput.value = '';

            if (typeof createHeart === 'function') {
                createHeart(window.innerWidth / 2, window.innerHeight / 2, 'mouse');
            }
        } else if (!user) {
            alert('Please login to post a message!');
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
        a.download = 'messages.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});
