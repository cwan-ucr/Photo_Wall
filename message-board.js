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

        const sortedEntries = Object.entries(data || {}).sort(
            (a, b) => b[1].timestamp - a[1].timestamp
        );

        for (let [id, msg] of sortedEntries) {
            const msg = data[id];
            const messageEl = document.createElement('div');
            messageEl.className = 'message-bubble';

            const commentList = document.createElement('div');
            commentList.className = 'comment-list';
            commentList.setAttribute('data-id', id);


            // comment list folder
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'toggle-comments';
            toggleBtn.style.display = 'none';
            toggleBtn.setAttribute('data-id', id)
            toggleBtn.innerText = 'View all comments';

            // comment list template
            const commentForm = document.createElement('div');
            commentForm.className = 'comment-form';
            commentForm.innerHTML = `
                <input type="text" class="comment-author" placeholder="Your name">
                <input type="text" class="comment-text" placeholder="Write your comments...">
                <button class="comment-submit" data-id="${id}">Submit</button>
            `;

            messageEl.innerHTML = `
                <div class="message-author">${msg.author}</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-date">${new Date(msg.timestamp).toLocaleString()}</div>
                <div class="message-actions">
                    <button class="like-btn" data-id="${id}">❤️ ${msg.likes || 0}</button>
                    <button class="delete-btn" data-id="${id}">🗑 delete</button>
                </div>
            `;

            // comments board
            messageEl.appendChild(commentList);
            messageEl.appendChild(toggleBtn);
            messageEl.appendChild(commentForm);
            messagesContainer.appendChild(messageEl);

            // first load comments
            setTimeout(() => {
                db.child(id).child('comments').once('value', snap => {
                    const commentListEl = document.querySelector(`.comment-list[data-id="${id}"]`);
                    const toggleBtnEl = document.querySelector(`.toggle-comments[data-id="${id}"]`);
                    if (commentListEl) {
                        renderComments(snap.val() || {}, commentListEl, toggleBtnEl, false);
                    }
                });
            }, 0);
        }

        // 点赞和评论删除功能
        const likeButtons = document.querySelectorAll('.like-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        likeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const messageRef = db.child(id);
                messageRef.transaction(msg => {
                    if (msg) {
                        msg.likes = (msg.likes || 0) + 1;
                    }
                    return msg;
                });
            });
        });

        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this message?")) {
                    db.child(id).remove();
                }
            });
        });
    });

    function renderComments(commentsData, commentList, toggleBtn, showAll) {
        commentList.innerHTML = '';
        const keys = Object.keys(commentsData);
        const shouldCollapse = keys.length > 2;

        keys.sort((a, b) => commentsData[a].timestamp - commentsData[b].timestamp);

        keys.forEach((cid, idx) => {
            const c = commentsData[cid];
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `<strong>${c.author}：</strong>${c.text}`;
            commentItem.style.marginLeft = `${idx * 16}px`; // Tab 16px for next comments
            if (shouldCollapse && !showAll && idx >= 2) {
            commentItem.style.display = 'none';
          }
          commentList.appendChild(commentItem);
        });

        if (toggleBtn) {
          toggleBtn.style.display = shouldCollapse ? 'inline-block' : 'none';
          toggleBtn.innerText = showAll ? 'Fold the comments' : 'View all comments';
        }
    }

    messagesContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('comment-submit')) {
          const id = e.target.getAttribute('data-id');
          const form = e.target.closest('.comment-form');
          const author = form.querySelector('.comment-author').value.trim() || 'Anonymous';
          const text = form.querySelector('.comment-text').value.trim();

          if (text) {
            const comment = { author, text, timestamp: Date.now() };
            db.child(id).child('comments').push(comment);
            form.querySelector('.comment-author').value = '';
            form.querySelector('.comment-text').value = '';
          } else {
            alert('please write a comment');
          }
        } else if (e.target.classList.contains('toggle-comments')) {
          const id = e.target.getAttribute('data-id');
          const commentListEl = document.querySelector(`.comment-list[data-id="${id}"]`);
          const toggleBtnEl = e.target;
          const isExpanded = toggleBtnEl.getAttribute('data-expanded') === 'true';
          db.child(id).child('comments').once('value', snap => {
            renderComments(snap.val() || {}, commentListEl, toggleBtnEl, !isExpanded);
          });
          toggleBtnEl.setAttribute('data-expanded', String(!isExpanded));
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
                timestamp: Date.now(),
                likes: 0 // 默认点赞数为 0
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
