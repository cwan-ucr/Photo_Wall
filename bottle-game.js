document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('bottleLoginBtn');
    const logoutBtn = document.getElementById('bottleLogoutBtn');
    const userInfo = document.getElementById('bottleUserInfo');
    const userPhoto = document.getElementById('bottleUserPhoto');
    const userName = document.getElementById('bottleUserName');
    const syncStatus = document.getElementById('bottleSyncStatus');
    const bottleForm = document.getElementById('bottleForm');
    const textInput = document.getElementById('bottleTextInput');
    const tagInput = document.getElementById('bottleTagInput');
    const shakeBtn = document.getElementById('shakeBottleBtn');
    const bottleResult = document.getElementById('bottleResult');
    const bottleCount = document.getElementById('bottleCount');
    const noteList = document.getElementById('bottleNoteList');
    const editToggle = document.getElementById('bottleEditToggle');

    const storageKey = 'loveBottleNotes.v1';
    const firebaseConfig = {
        apiKey: "AIzaSyAhD0Kbk6EZqqCN1L-G8_9OiMlNVhyu7uA",
        authDomain: "love-guestbook.firebaseapp.com",
        databaseURL: "https://love-guestbook-default-rtdb.firebaseio.com",
        projectId: "love-guestbook",
        storageBucket: "love-guestbook.firebasestorage.app",
        messagingSenderId: "976044421335",
        appId: "1:976044421335:web:89c2c62f91e3d3af9a0092"
    };

    let notes = loadStoredNotes();
    let notesRef = null;
    let notesUnsubscribe = null;
    let auth = null;
    let isEditMode = false;

    try {
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();

        loginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider).catch((error) => {
                if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
                    return auth.signInWithRedirect(provider);
                }
                console.warn('Bottle login failed:', error);
                setSyncStatus('Google 登录失败，请确认 Firebase Auth 已允许当前域名。');
            });
        });

        logoutBtn.addEventListener('click', () => auth.signOut());

        auth.getRedirectResult().catch((error) => {
            console.warn('Bottle redirect login failed:', error);
            setSyncStatus('Google 登录失败，请确认 Firebase Auth 已允许当前域名。');
        });

        auth.onAuthStateChanged((user) => {
            if (user) {
                loginBtn.hidden = true;
                userInfo.hidden = false;
                userPhoto.src = user.photoURL || '';
                userName.textContent = user.displayName || user.email || '已登录';
                connectBottleDatabase();
                setEditMode(false);
            } else {
                setEditMode(false);
                loginBtn.hidden = false;
                userInfo.hidden = true;
                disconnectBottleDatabase();
                setSyncStatus('登录后可以同步话语瓶。');
                renderBottle();
            }
        });
    } catch (error) {
        console.warn('Firebase bottle sync is unavailable:', error);
        setSyncStatus('云端同步不可用，当前内容会保存在本机。');
        renderBottle();
    }

    editToggle.addEventListener('click', () => {
        setEditMode(!isEditMode);
    });

    bottleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = textInput.value.trim();
        if (!text) return;
        persistNotes([...notes, {
            id: `note-${Date.now()}`,
            text,
            tag: tagInput.value.trim(),
            createdAt: Date.now(),
        }]);
        bottleForm.reset();
        setSyncStatus(notesRef ? '话语已放进云端瓶子。' : '话语已保存在本机瓶子。');
    });

    shakeBtn.addEventListener('click', () => {
        if (!notes.length) {
            bottleResult.textContent = '先装进一句话。';
            return;
        }
        shakeBtn.classList.remove('is-shaking');
        void shakeBtn.offsetWidth;
        shakeBtn.classList.add('is-shaking');
        const picked = notes[Math.floor(Math.random() * notes.length)];
        bottleResult.innerHTML = `
            <span>${escapeHtml(picked.tag || '今日一句')}</span>
            <strong>${escapeHtml(picked.text)}</strong>
        `;
    });

    noteList.addEventListener('click', (event) => {
        const deleteBtn = event.target.closest('[data-delete-note]');
        if (!deleteBtn) return;
        persistNotes(notes.filter((note) => note.id !== deleteBtn.dataset.deleteNote));
        setSyncStatus(notesRef ? '话语瓶已更新。' : '本机话语瓶已更新。');
    });

    function connectBottleDatabase() {
        disconnectBottleDatabase();
        notesRef = firebase.database().ref('bottleNotes');
        setSyncStatus('已登录，正在读取云端话语瓶...');
        notesUnsubscribe = notesRef.on('value', (snapshot) => {
            const value = snapshot.val();
            if (Array.isArray(value)) {
                notes = value.filter(Boolean);
                localStorage.setItem(storageKey, JSON.stringify(notes));
            } else if (!value) {
                notesRef.set(notes).catch((error) => console.warn('Failed to initialize bottle notes:', error));
            }
            renderBottle();
            setSyncStatus('话语瓶已连接云端同步。');
        }, (error) => {
            console.warn('Failed to sync bottle notes:', error);
            setSyncStatus('话语瓶同步失败，请检查数据库规则。');
            renderBottle();
        });
    }

    function disconnectBottleDatabase() {
        if (notesRef && notesUnsubscribe) notesRef.off('value', notesUnsubscribe);
        notesRef = null;
        notesUnsubscribe = null;
    }

    function setEditMode(enabled) {
        isEditMode = Boolean(enabled && auth && auth.currentUser);
        document.body.classList.toggle('edit-mode', isEditMode);
        editToggle.hidden = !(auth && auth.currentUser);
        editToggle.textContent = isEditMode ? '关闭编辑' : '开启编辑';
        editToggle.classList.toggle('active', isEditMode);
        bottleForm.querySelectorAll('input, textarea, button').forEach((control) => {
            control.disabled = !isEditMode;
        });
        noteList.querySelectorAll('button').forEach((control) => {
            control.disabled = !isEditMode;
        });
    }

    function persistNotes(items) {
        notes = items;
        localStorage.setItem(storageKey, JSON.stringify(notes));
        renderBottle();
        if (notesRef) {
            notesRef.set(notes).catch((error) => {
                console.warn('Failed to save bottle notes:', error);
                setSyncStatus('话语瓶保存失败，请检查数据库规则。');
            });
        }
    }

    function loadStoredNotes() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
            if (Array.isArray(stored) && stored.length) return stored;
        } catch (error) {
            console.warn('Failed to load stored bottle notes:', error);
        }
        return [
            { id: 'note-1', text: '今天也要记得好好吃饭。', tag: '日常', createdAt: Date.now() - 3000 },
            { id: 'note-2', text: '下次见面的时候，一起去散步。', tag: '约定', createdAt: Date.now() - 2000 },
            { id: 'note-3', text: '你已经做得很好了，我一直在。', tag: '鼓励', createdAt: Date.now() - 1000 },
        ];
    }

    function renderBottle() {
        bottleCount.textContent = notes.length;
        shakeBtn.disabled = !notes.length;
        noteList.innerHTML = '';
        notes.slice().sort((a, b) => b.createdAt - a.createdAt).forEach((note) => {
            const item = document.createElement('article');
            item.className = 'bottle-note-item';
            item.innerHTML = `
                <span>${escapeHtml(note.tag || '未分类')}</span>
                <p>${escapeHtml(note.text)}</p>
                <button type="button" data-delete-note="${escapeHtml(note.id)}">删除</button>
            `;
            noteList.appendChild(item);
        });
        setEditMode(isEditMode);
    }

    function setSyncStatus(message) {
        syncStatus.textContent = message;
    }

    function escapeHtml(text) {
        return String(text || '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[char]));
    }

    renderBottle();
});
