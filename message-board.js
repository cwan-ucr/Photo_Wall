document.addEventListener('DOMContentLoaded', function() {
    const MESSAGE_KEY = 'love_messages';
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageText');
    const nameInput = document.getElementById('userName');
    const submitBtn = document.getElementById('submitMessage');
    const exportBtn = document.getElementById('exportMessages');

    // 加载留言
    loadMessages();

    // 提交留言
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const message = messageInput.value.trim();
        const name = nameInput.value.trim() || "Anonymous";

        if (message) {
            saveMessage(message, name);
            messageInput.value = '';
            nameInput.value = '';
            
            // 触发爱心动画
            if (typeof createHeart === 'function') {
                createHeart(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    'mouse'
                );
            }
        } else {
            alert('Please write a message!');
        }
    });

    // 导出留言
    exportBtn.addEventListener('click', exportMessages);

    function saveMessage(text, author) {
        const messages = JSON.parse(localStorage.getItem(MESSAGE_KEY)) || [];
        const newMessage = {
            text,
            author,
            timestamp: Date.now()
        };
        messages.push(newMessage);
        localStorage.setItem(MESSAGE_KEY, JSON.stringify(messages));
        renderMessages();
    }

    function loadMessages() {
        renderMessages();
    }

    function renderMessages() {
        messagesContainer.innerHTML = '';
        const messages = JSON.parse(localStorage.getItem(MESSAGE_KEY)) || [];
        
        messages.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = 'message-bubble';
            messageEl.innerHTML = `
                <div class="message-author">${msg.author}</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-date">${new Date(msg.timestamp).toLocaleString()}</div>
            `;
            messagesContainer.appendChild(messageEl);
        });
    }

    function exportMessages() {
        const messages = JSON.parse(localStorage.getItem(MESSAGE_KEY)) || [];
        const dataStr = JSON.stringify(messages, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `love_messages_${new Date().getTime()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});