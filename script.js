const imageContainer = document.getElementById('gallery');
const albumToolbar = document.getElementById('albumToolbar');
const albumViewTitle = document.getElementById('albumViewTitle');
const albumViewMeta = document.getElementById('albumViewMeta');
const backToAlbumsBtn = document.getElementById('backToAlbums');
const albumForm = document.getElementById('albumForm');
const albumTitleInput = document.getElementById('albumTitleInput');
const albumDateInput = document.getElementById('albumDateInput');
const albumDescriptionInput = document.getElementById('albumDescriptionInput');
const albumSyncStatus = document.getElementById('albumSyncStatus');
const albumEditor = document.getElementById('albumEditor');
const albumEditTitle = document.getElementById('albumEditTitle');
const albumEditDate = document.getElementById('albumEditDate');
const albumEditDescription = document.getElementById('albumEditDescription');
const albumSaveBtn = document.getElementById('albumSaveBtn');
const albumUploadInput = document.getElementById('albumUploadInput');
const albumUploadBtn = document.getElementById('albumUploadBtn');
const wishlistForm = document.getElementById('wishlistForm');
const wishlistList = document.getElementById('wishlistList');
const wishTitleInput = document.getElementById('wishTitleInput');
const wishDateInput = document.getElementById('wishDateInput');
const wishlistSyncStatus = document.getElementById('wishlistSyncStatus');
const wishlistLoginBtn = document.getElementById('wishlistLoginBtn');
const wishlistLogoutBtn = document.getElementById('wishlistLogoutBtn');
const wishlistUserInfo = document.getElementById('wishlistUserInfo');
const wishlistUserPhoto = document.getElementById('wishlistUserPhoto');
const wishlistUserName = document.getElementById('wishlistUserName');
const heroMedia = document.querySelector('.hero-media');
const heroCoverInput = document.getElementById('heroCoverInput');
const hisAvatar = document.getElementById('hisAvatar');
const herAvatar = document.getElementById('herAvatar');
const hisAvatarInput = document.getElementById('hisAvatarInput');
const herAvatarInput = document.getElementById('herAvatarInput');
const capsuleForm = document.getElementById('capsuleForm');
const capsuleTitleInput = document.getElementById('capsuleTitleInput');
const capsuleUnlockInput = document.getElementById('capsuleUnlockInput');
const capsuleMessageInput = document.getElementById('capsuleMessageInput');
const capsuleSyncStatus = document.getElementById('capsuleSyncStatus');
const capsuleList = document.getElementById('capsuleList');
const placeForm = document.getElementById('placeForm');
const placeTitleInput = document.getElementById('placeTitleInput');
const placeDateInput = document.getElementById('placeDateInput');
const placeLocationInput = document.getElementById('placeLocationInput');
const mapRegionOptions = document.getElementById('mapRegionOptions');
const placeStatusInput = document.getElementById('placeStatusInput');
const placeColorInput = document.getElementById('placeColorInput');
const placePhotoInput = document.getElementById('placePhotoInput');
const placeStoryInput = document.getElementById('placeStoryInput');
const mapSyncStatus = document.getElementById('mapSyncStatus');
const loveMapCanvas = document.getElementById('loveMapCanvas');
const placeList = document.getElementById('placeList');
const mapImageInput = document.getElementById('mapImageInput');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const globalEditToggle = document.getElementById('globalEditToggle');
const editModeCloseBtn = document.getElementById('editModeCloseBtn');
const timelineForm = document.getElementById('timelineForm');
const timelineDateInput = document.getElementById('timelineDateInput');
const timelineTitleInput = document.getElementById('timelineTitleInput');
const timelineDescriptionInput = document.getElementById('timelineDescriptionInput');
const timelineSyncStatus = document.getElementById('timelineSyncStatus');
const timelineList = document.getElementById('timelineList');
const privateNotice = document.getElementById('privateNotice');
const privateLoginBtn = document.getElementById('privateLoginBtn');
const sitePublicSelect = document.getElementById('sitePublicSelect');
const privacyModuleInputs = document.querySelectorAll('[data-privacy-module]');
const eventForm = document.getElementById('eventForm');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventDateInput = document.getElementById('eventDateInput');
const eventLocationInput = document.getElementById('eventLocationInput');
const eventStatusInput = document.getElementById('eventStatusInput');
const eventDescriptionInput = document.getElementById('eventDescriptionInput');
const eventAlbumSelect = document.getElementById('eventAlbumSelect');
const eventPlaceSelect = document.getElementById('eventPlaceSelect');
const eventWishSelect = document.getElementById('eventWishSelect');
const eventTimelineSelect = document.getElementById('eventTimelineSelect');
const eventSyncStatus = document.getElementById('eventSyncStatus');
const eventList = document.getElementById('eventList');

const wishlistStorageKey = 'loveWishlistItems.v1';
const albumsStorageKey = 'loveAlbums.v1';
const siteSettingsStorageKey = 'loveSiteSettings.v1';
const capsulesStorageKey = 'loveTimeCapsules.v1';
const placesStorageKey = 'loveMapPlaces.v1';
const timelineStorageKey = 'loveTimelineEvents.v1';
const eventsStorageKey = 'loveEvents.v1';
let currentImageIndex = 0;
let loadedImages = [];
let leftArrow;
let rightArrow;
let wishlistItems = [];
let wishlistDbRef = null;
let wishlistAuth = null;
let wishlistUnsubscribe = null;
let albums = [];
let albumsDbRef = null;
let albumsUnsubscribe = null;
let albumStorage = null;
let currentAlbumId = null;
let siteSettings = {};
let settingsDbRef = null;
let settingsUnsubscribe = null;
let capsules = [];
let capsulesDbRef = null;
let capsulesUnsubscribe = null;
let places = [];
let placesDbRef = null;
let placesUnsubscribe = null;
let loveMap = null;
let chinaGeoLayer = null;
let regionLayers = {};
let chinaGeoJsonLoaded = false;
let currentLocationMarker = null;
let timelineEvents = [];
let timelineDbRef = null;
let timelineUnsubscribe = null;
let loveEvents = [];
let eventsDbRef = null;
let eventsUnsubscribe = null;
let isEditMode = false;

const localChinaCityGeoJsonUrl = 'data/china-city.json';
const localChinaProvinceGeoJsonUrl = 'data/china-province.json';
const chinaProvinceGeoJsonUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';
const chinaProvinceAdcodes = [
    '110000', '120000', '130000', '140000', '150000',
    '210000', '220000', '230000',
    '310000', '320000', '330000', '340000', '350000', '360000', '370000',
    '410000', '420000', '430000', '440000', '450000', '460000',
    '500000', '510000', '520000', '530000', '540000',
    '610000', '620000', '630000', '640000', '650000',
    '710000', '810000', '820000',
];

const firebaseConfig = {
    apiKey: "AIzaSyAhD0Kbk6EZqqCN1L-G8_9OiMlNVhyu7uA",
    authDomain: "love-guestbook.firebaseapp.com",
    databaseURL: "https://love-guestbook-default-rtdb.firebaseio.com",
    projectId: "love-guestbook",
    storageBucket: "love-guestbook.firebasestorage.app",
    messagingSenderId: "976044421335",
    appId: "1:976044421335:web:89c2c62f91e3d3af9a0092"
};

const ownerUids = new Set([
    '0VG0tBgS8XfLSkpk4ZhngCYenb43',
    'BRhYkarzpRdUdnf0jbErxigbrRy1',
]);

const defaultPrivacySettings = {
    sitePublic: true,
    modules: {
        timeline: true,
        events: true,
        wishlist: true,
        capsules: true,
        map: true,
        albums: true,
        messages: true,
        bottleNotes: true,
    },
};

const defaultWishlistItems = [
    { id: 'wish-1', title: '一起拍一组纪念照片', expectedDate: '2026-06-16', completed: true },
    { id: 'wish-2', title: '去一个新的城市旅行', expectedDate: '2026-08-01', completed: false },
    { id: 'wish-3', title: '看一场喜欢的演唱会', expectedDate: '2026-10-25', completed: false },
    { id: 'wish-4', title: '拥有一个属于我们的小窝', expectedDate: '2027-06-16', completed: false },
];

const loveAlbums = [
    {
        id: 'album-start',
        title: '故事正式开始',
        date: '2025.06.16',
        description: '从这一天起，很多普通的日子开始有了新的意义。',
        cover: 'images/thumbs/0.jpg',
        coverPhotoId: 'photo-0',
        photos: createAlbumPhotos(0, 4, '故事正式开始'),
    },
    {
        id: 'album-days',
        title: '一起走过的风景',
        date: '2025.10.25',
        description: '把一起经过的街道、晚风和笑容都放进这里。',
        cover: 'images/thumbs/5.jpg',
        coverPhotoId: 'photo-5',
        photos: createAlbumPhotos(5, 9, '一起走过的风景'),
    },
    {
        id: 'album-life',
        title: '日常里的闪光',
        date: '2026.02.21',
        description: '生活里那些轻轻一看就会想起彼此的瞬间。',
        cover: 'images/thumbs/10.jpg',
        coverPhotoId: 'photo-10',
        photos: createAlbumPhotos(10, 13, '日常里的闪光'),
    },
];

const defaultSiteSettings = {
    heroCover: 'images/0.jpg',
    hisAvatar: '',
    herAvatar: '',
    mapImage: '',
    currentLocation: null,
    privacy: defaultPrivacySettings,
};

const defaultCapsules = [
    {
        id: 'capsule-1',
        title: '写给一周年的我们',
        unlockDate: '2026-06-16',
        message: '等这一天到来时，再一起打开这段话。',
        createdAt: Date.now(),
    },
];

const defaultPlaces = [
    {
        id: 'place-1',
        title: '故事开始的地方',
        date: '2025.06.16',
        location: '我们的起点',
        story: '从这里开始，地图上每一个点都有了新的意义。',
        status: 'visited',
        color: '#c95f66',
        photo: '',
        photoPath: '',
        x: 50,
        y: 48,
    },
];

const defaultTimelineEvents = [
    {
        id: 'timeline-1',
        date: '2025-06-16',
        title: '故事正式开始',
        description: '从这一天起，很多普通的日子开始有了新的意义。',
    },
    {
        id: 'timeline-2',
        date: '2025-10-25',
        title: '一起庆祝生日',
        description: '把仪式感留给重要的人，也把愿望认真写进未来。',
    },
    {
        id: 'timeline-3',
        date: '2026-02-21',
        title: '继续收集新回忆',
        description: '新的照片、新的歌、新的城市，还有越来越默契的我们。',
    },
];

const defaultLoveEvents = [
    {
        id: 'event-1',
        title: '故事正式开始',
        date: '2025-06-16',
        location: '我们的起点',
        status: 'done',
        description: '把这一天作为所有回忆的起点，后面的照片、地点和愿望都从这里慢慢长出来。',
        links: {
            albumId: 'album-start',
            placeId: 'place-1',
            wishId: 'wish-1',
            timelineId: 'timeline-1',
        },
    },
];

function createAlbumPhotos(start, end, caption) {
    const photos = [];
    for (let i = start; i <= end; i++) {
        photos.push({
            id: `photo-${i}`,
            src: `images/${i}.jpg`,
            thumb: `images/thumbs/${i}.jpg`,
            caption: `${caption} #${i - start + 1}`,
            storagePath: '',
        });
    }
    return photos;
}

function calculateLoveDays() {
    const startDate = new Date('2025-06-16');
    const today = new Date();
    startDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const timeDiff = today - startDate;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById('loveDays').innerText = days;
}

function isLoggedInForEdit() {
    return isOwnerUser(wishlistAuth && wishlistAuth.currentUser);
}

function isOwnerUser(user) {
    return Boolean(user && ownerUids.has(user.uid));
}

function canEditPrivateSections() {
    return isLoggedInForEdit() && isEditMode;
}

function setGlobalEditMode(enabled) {
    isEditMode = Boolean(enabled && isLoggedInForEdit());
    document.body.classList.toggle('edit-mode', isEditMode);
    if (globalEditToggle) {
        globalEditToggle.hidden = !isLoggedInForEdit();
        globalEditToggle.textContent = isEditMode ? '关闭编辑' : '开启编辑';
        globalEditToggle.classList.toggle('active', isEditMode);
    }
    setTimelineEditEnabled(canEditPrivateSections());
    setEventEditEnabled(Boolean(eventsDbRef) && canEditPrivateSections());
    setWishlistEditEnabled(Boolean(wishlistDbRef) && canEditPrivateSections());
    setCapsuleEditEnabled(Boolean(capsulesDbRef) && canEditPrivateSections());
    setPlaceEditEnabled(canEditPrivateSections());
    setSettingsEditEnabled(canEditPrivateSections());
    setAlbumEditEnabled(Boolean(albumsDbRef) && canEditPrivateSections());
    syncPrivacyControls();
    applyPrivacySettings();
    renderTimeline();
    renderEvents();
    renderWishlist();
    renderPlaces();
    if (currentAlbumId) {
        openAlbum(currentAlbumId);
    } else {
        renderAlbumFolders();
    }
}

function getPrivacySettings() {
    const privacy = siteSettings && siteSettings.privacy ? siteSettings.privacy : {};
    return {
        sitePublic: privacy.sitePublic !== false,
        modules: {
            ...defaultPrivacySettings.modules,
            ...(privacy.modules || {}),
        },
    };
}

function updatePrivacySettings(updates) {
    const current = getPrivacySettings();
    persistSiteSettings({
        privacy: {
            ...current,
            ...updates,
            modules: {
                ...current.modules,
                ...(updates.modules || {}),
            },
        },
    });
}

function applyPrivacySettings() {
    const privacy = getPrivacySettings();
    const owner = isLoggedInForEdit();
    const siteVisible = owner || privacy.sitePublic;
    const moduleTargets = {
        timeline: ['#timeline', 'a[href="#timeline"]'],
        events: ['#event-center', 'a[href="#event-center"]'],
        wishlist: ['#wishlist', 'a[href="#wishlist"]'],
        capsules: ['#capsules'],
        map: ['#map-section', 'a[href="#map-section"]', 'a[href="index.html#map-section"]'],
        albums: ['#gallery-section', 'a[href="#gallery-section"]', 'a[href="index.html#gallery-section"]'],
        messages: ['a[href="message-board.html"]'],
        bottleNotes: ['a[href="bottle-game.html"]'],
    };

    Object.entries(moduleTargets).forEach(([module, selectors]) => {
        const visible = siteVisible && (owner || privacy.modules[module] !== false);
        selectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((element) => {
                element.hidden = !visible;
            });
        });
    });

    document.querySelectorAll('.entry-card').forEach((card) => {
        const href = card.getAttribute('href') || '';
        const module = href.includes('timeline') ? 'timeline'
            : href.includes('event-center') ? 'events'
            : href.includes('wishlist') ? 'wishlist'
                : href.includes('gallery') ? 'albums'
                    : href.includes('message-board') ? 'messages'
                        : href.includes('bottle-game') ? 'bottleNotes'
                            : null;
        if (module) card.hidden = !(siteVisible && (owner || privacy.modules[module] !== false));
    });

    if (privateNotice) privateNotice.hidden = siteVisible;
    syncPrivacyControls();
}

function syncPrivacyControls() {
    const privacy = getPrivacySettings();
    if (sitePublicSelect) sitePublicSelect.value = privacy.sitePublic ? 'public' : 'private';
    privacyModuleInputs.forEach((input) => {
        input.checked = privacy.modules[input.dataset.privacyModule] !== false;
        input.disabled = !canEditPrivateSections();
    });
    if (sitePublicSelect) sitePublicSelect.disabled = !canEditPrivateSections();
}

function initTimelineStore() {
    const storedEvents = normalizeTimelineEvents(loadStoredArray(timelineStorageKey, []));
    timelineEvents = storedEvents.length ? storedEvents : getDefaultTimelineEvents();
    renderTimeline();
    setTimelineEditEnabled(false);
}

function initEventStore() {
    loveEvents = normalizeLoveEvents(loadStoredArray(eventsStorageKey, []));
    if (!loveEvents.length) loveEvents = normalizeLoveEvents(defaultLoveEvents);
    renderEventLinkOptions();
    renderEvents();
    setEventEditEnabled(false);
}

function normalizeLoveEvents(items) {
    const source = Array.isArray(items) ? items : (items && typeof items === 'object' ? Object.values(items) : []);
    return source.filter(Boolean).map((item, index) => ({
        id: item.id || `event-${Date.now()}-${index}`,
        title: item.title || '未命名事件',
        date: normalizeDateValue(item.date),
        location: item.location || '',
        status: item.status || 'done',
        description: item.description || '',
        links: {
            albumId: item.links?.albumId || '',
            placeId: item.links?.placeId || '',
            wishId: item.links?.wishId || '',
            timelineId: item.links?.timelineId || '',
        },
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function connectEventsDatabase() {
    disconnectEventsDatabase();
    eventsDbRef = firebase.database().ref('loveEvents');
    setEventEditEnabled(canEditPrivateSections());
    setEventSyncStatus('已登录，正在读取云端事件中心...');
    eventsUnsubscribe = eventsDbRef.on('value', (snapshot) => {
        const cloudEvents = normalizeLoveEvents(snapshot.val());
        if (cloudEvents.length) {
            loveEvents = cloudEvents;
            localStorage.setItem(eventsStorageKey, JSON.stringify(loveEvents));
        } else {
            loveEvents = loveEvents.length ? normalizeLoveEvents(loveEvents) : normalizeLoveEvents(defaultLoveEvents);
            localStorage.setItem(eventsStorageKey, JSON.stringify(loveEvents));
            eventsDbRef.set(loveEvents).catch((error) => console.warn('Failed to initialize events:', error));
        }
        renderEventLinkOptions();
        renderEvents();
        setEventSyncStatus('事件中心已连接云端同步。');
    }, (error) => {
        console.warn('Failed to sync events:', error);
        setEventSyncStatus('事件中心同步失败，请检查数据库规则。');
        renderEvents();
    });
}

function disconnectEventsDatabase() {
    if (eventsDbRef && eventsUnsubscribe) eventsDbRef.off('value', eventsUnsubscribe);
    eventsDbRef = null;
    eventsUnsubscribe = null;
}

function setEventSyncStatus(message) {
    if (eventSyncStatus) eventSyncStatus.textContent = message;
}

function setEventEditEnabled(enabled) {
    if (!eventForm) return;
    eventForm.querySelectorAll('input, textarea, select, button').forEach((control) => {
        control.disabled = !enabled;
    });
    if (eventList) {
        eventList.querySelectorAll('button').forEach((control) => {
            control.disabled = !enabled;
        });
    }
}

function persistLoveEvents(items) {
    loveEvents = normalizeLoveEvents(items);
    localStorage.setItem(eventsStorageKey, JSON.stringify(loveEvents));
    renderEvents();
    if (eventsDbRef) {
        eventsDbRef.set(loveEvents).catch((error) => {
            console.warn('Failed to save events:', error);
            setEventSyncStatus('事件中心保存失败，请检查数据库规则。');
        });
    }
}

function addLoveEvent(eventData) {
    persistLoveEvents([...loveEvents, {
        id: `event-${Date.now()}`,
        ...eventData,
    }]);
}

function deleteLoveEvent(id) {
    persistLoveEvents(loveEvents.filter((event) => event.id !== id));
}

function getLinkedName(collection, id, fallback = '') {
    const item = collection.find((candidate) => candidate.id === id);
    return item ? (item.title || item.location || fallback) : fallback;
}

function renderEventLinkOptions() {
    fillEventSelect(eventAlbumSelect, albums, '不关联相册');
    fillEventSelect(eventPlaceSelect, places, '不关联地点', (place) => `${place.location} · ${place.title}`);
    fillEventSelect(eventWishSelect, wishlistItems, '不关联愿望');
    fillEventSelect(eventTimelineSelect, timelineEvents, '不关联时光轴');
}

function fillEventSelect(select, items, placeholder, labelGetter = (item) => item.title) {
    if (!select) return;
    const current = select.value;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    items.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = labelGetter(item);
        select.appendChild(option);
    });
    select.value = current;
}

function renderEvents() {
    if (!eventList) return;
    eventList.innerHTML = '';
    if (!loveEvents.length) {
        eventList.innerHTML = '<article class="timeline-empty"><strong>还没有事件</strong><p>开启编辑模式后，可以把分散的回忆串成事件。</p></article>';
        return;
    }
    loveEvents.forEach((event) => {
        const linked = [
            event.links.albumId ? `相册：${escapeHtml(getLinkedName(albums, event.links.albumId, '已关联'))}` : '',
            event.links.placeId ? `地点：${escapeHtml(getLinkedName(places, event.links.placeId, '已关联'))}` : '',
            event.links.wishId ? `愿望：${escapeHtml(getLinkedName(wishlistItems, event.links.wishId, '已关联'))}` : '',
            event.links.timelineId ? `时光：${escapeHtml(getLinkedName(timelineEvents, event.links.timelineId, '已关联'))}` : '',
        ].filter(Boolean);
        const item = document.createElement('article');
        item.className = 'event-item story-card';
        item.innerHTML = `
            <div class="story-card-meta">
                <span class="story-card-tag ${event.status === 'planned' || event.status === 'wish' ? 'wish' : 'done'}">${getEventStatusText(event.status)}</span>
                <time>${escapeHtml(formatDateForAlbum(event.date))}</time>
            </div>
            <h3>${escapeHtml(event.title)}</h3>
            ${event.location ? `<small>${escapeHtml(event.location)}</small>` : ''}
            <p>${escapeHtml(event.description)}</p>
            ${linked.length ? `<div class="event-links">${linked.map((text) => `<span>${text}</span>`).join('')}</div>` : ''}
        `;
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'owner-edit-only';
        deleteBtn.textContent = '删除事件';
        deleteBtn.disabled = !canEditPrivateSections();
        deleteBtn.addEventListener('click', () => deleteLoveEvent(event.id));
        item.appendChild(deleteBtn);
        eventList.appendChild(item);
    });
}

function getEventStatusText(status) {
    if (status === 'planned') return '计划中';
    if (status === 'wish') return '想实现';
    return '已完成';
}

function normalizeTimelineEvents(items) {
    const source = Array.isArray(items) ? items : (items && typeof items === 'object' ? Object.values(items) : []);
    return source.filter(Boolean).map((item, index) => ({
        id: item.id || `timeline-${Date.now()}-${index}`,
        date: normalizeDateValue(item.date),
        title: item.title || '未命名事件',
        description: item.description || '',
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getDefaultTimelineEvents() {
    return normalizeTimelineEvents(defaultTimelineEvents);
}

function normalizeDateValue(date) {
    return String(date || '').replace(/\./g, '-');
}

function connectTimelineDatabase() {
    disconnectTimelineDatabase();
    timelineDbRef = firebase.database().ref('timelineEvents');
    setTimelineEditEnabled(canEditPrivateSections());
    setTimelineSyncStatus('已登录，正在读取云端时光轴...');
    timelineUnsubscribe = timelineDbRef.on('value', (snapshot) => {
        const cloudEvents = normalizeTimelineEvents(snapshot.val());
        if (cloudEvents.length) {
            timelineEvents = cloudEvents;
            localStorage.setItem(timelineStorageKey, JSON.stringify(timelineEvents));
        } else {
            timelineEvents = timelineEvents.length ? normalizeTimelineEvents(timelineEvents) : getDefaultTimelineEvents();
            localStorage.setItem(timelineStorageKey, JSON.stringify(timelineEvents));
            timelineDbRef.set(timelineEvents).catch((error) => console.warn('Failed to initialize timeline:', error));
        }
        renderTimeline();
        setTimelineSyncStatus('时光轴已连接云端同步。');
    }, (error) => {
        console.warn('Failed to sync timeline:', error);
        setTimelineSyncStatus('时光轴同步失败，请检查数据库规则。');
        renderTimeline();
    });
}

function disconnectTimelineDatabase() {
    if (timelineDbRef && timelineUnsubscribe) timelineDbRef.off('value', timelineUnsubscribe);
    timelineDbRef = null;
    timelineUnsubscribe = null;
}

function setTimelineSyncStatus(message) {
    if (timelineSyncStatus) timelineSyncStatus.textContent = message;
}

function setTimelineEditEnabled(enabled) {
    if (timelineForm) {
        timelineForm.querySelectorAll('input, textarea, button').forEach((control) => {
            control.disabled = !enabled;
        });
    }
    if (timelineList) {
        timelineList.querySelectorAll('input, textarea, button').forEach((control) => {
            control.disabled = !enabled;
        });
    }
}

function persistTimelineEvents(items) {
    timelineEvents = normalizeTimelineEvents(items);
    localStorage.setItem(timelineStorageKey, JSON.stringify(timelineEvents));
    renderTimeline();
    if (timelineDbRef) {
        timelineDbRef.set(timelineEvents).catch((error) => {
            console.warn('Failed to save timeline:', error);
            setTimelineSyncStatus('时光轴保存失败，请检查数据库规则。');
        });
    }
}

function addTimelineEvent(date, title, description) {
    persistTimelineEvents([...timelineEvents, {
        id: `timeline-${Date.now()}`,
        date,
        title,
        description,
    }]);
}

function updateTimelineEvent(id, updates) {
    persistTimelineEvents(timelineEvents.map((event) => (
        event.id === id ? { ...event, ...updates } : event
    )));
}

function deleteTimelineEvent(id) {
    persistTimelineEvents(timelineEvents.filter((event) => event.id !== id));
}

function renderTimeline() {
    if (!timelineList) return;
    timelineList.innerHTML = '';
    timelineList.classList.toggle('is-empty', !timelineEvents.length);
    if (!timelineEvents.length) {
        const empty = document.createElement('article');
        empty.className = 'timeline-empty';
        empty.innerHTML = `
            <strong>还没有时光事件</strong>
            <p>开启编辑模式后，可以把重要日子添加进来。</p>
        `;
        timelineList.appendChild(empty);
        return;
    }
    timelineEvents.forEach((event) => {
        const item = document.createElement('article');
        item.className = 'timeline-item';
        item.innerHTML = `
            <time>${formatDateForAlbum(event.date)}</time>
            <div class="timeline-card story-card">
                <div class="timeline-view">
                    <div class="story-card-meta">
                        <span class="story-card-tag">时光</span>
                        <time>${escapeHtml(formatDateForAlbum(event.date))}</time>
                    </div>
                    <h3>${escapeHtml(event.title)}</h3>
                    <p>${escapeHtml(event.description)}</p>
                </div>
                <div class="timeline-edit-fields owner-edit-only">
                    <input type="date" value="${escapeHtml(normalizeDateValue(event.date))}" aria-label="事件日期">
                    <input type="text" value="${escapeHtml(event.title)}" maxlength="40" aria-label="事件标题">
                    <textarea maxlength="180" aria-label="事件描述">${escapeHtml(event.description)}</textarea>
                </div>
                <div class="timeline-actions owner-edit-only">
                    <button type="button" data-save-timeline="${escapeHtml(event.id)}">保存</button>
                    <button type="button" data-delete-timeline="${escapeHtml(event.id)}">删除</button>
                </div>
            </div>
        `;
        timelineList.appendChild(item);
    });
    setTimelineEditEnabled(canEditPrivateSections());
    renderEventLinkOptions();
}

function initWishlistStore() {
    wishlistItems = loadLocalWishlistItems();
    renderWishlist();

    if (window.location.protocol === 'file:') {
        setWishlistEditEnabled(false);
        setWishlistSyncStatus('当前是 file:// 打开，Google 登录不可用。请用 http://localhost:8000/index.html 或部署后的网址打开。');
        return;
    }

    if (!window.firebase) {
        setWishlistSyncStatus('云端同步不可用，当前只保存在本机。');
        return;
    }

    try {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        wishlistAuth = firebase.auth();
        setWishlistEditEnabled(false);
        setWishlistSyncStatus('请先 Google 登录，登录后愿望清单会同步到云端。');
        setupWishlistAuthControls();
        wishlistAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((error) => {
            console.warn('Failed to set auth persistence:', error);
        });
        wishlistAuth.onAuthStateChanged((user) => {
            if (user) {
                showWishlistUser(user);
                connectWishlistDatabase();
                connectAlbumsDatabase();
                connectSiteSettings();
                connectCapsulesDatabase();
                connectPlacesDatabase();
                connectTimelineDatabase();
                connectEventsDatabase();
                setGlobalEditMode(false);
            } else {
                setGlobalEditMode(false);
                disconnectWishlistDatabase();
                disconnectAlbumsDatabase();
                disconnectSiteSettings();
                disconnectCapsulesDatabase();
                disconnectPlacesDatabase();
                disconnectTimelineDatabase();
                disconnectEventsDatabase();
                hideWishlistUser();
                setWishlistEditEnabled(false);
                setWishlistSyncStatus('请先 Google 登录，登录后愿望清单会同步到云端。');
                setAlbumEditEnabled(false);
                setAlbumSyncStatus('登录后可以编辑相册、上传图片和设置封面。');
                setSettingsEditEnabled(false);
                setCapsuleEditEnabled(false);
                setPlaceEditEnabled(false);
                setTimelineEditEnabled(false);
                setEventEditEnabled(false);
                setTimelineSyncStatus('登录后可以编辑时光轴。');
                renderAlbumFolders();
            }
        });
    } catch (error) {
        console.warn('Firebase wishlist sync is unavailable:', error);
        setWishlistSyncStatus('云端同步不可用，当前只保存在本机。');
    }
}

function setupWishlistAuthControls() {
    wishlistLoginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        wishlistAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => wishlistAuth.signInWithPopup(provider))
            .then((result) => {
                if (result && result.user) {
                    showWishlistUser(result.user);
                    connectWishlistDatabase();
                    connectAlbumsDatabase();
                    connectSiteSettings();
                    connectCapsulesDatabase();
                    connectPlacesDatabase();
                    connectTimelineDatabase();
                    connectEventsDatabase();
                    setGlobalEditMode(false);
                }
            })
            .catch((error) => {
                if (error && error.code === 'auth/popup-blocked') {
                    wishlistAuth.signInWithRedirect(provider).catch((redirectError) => {
                        console.warn('Wishlist redirect login failed:', redirectError);
                        setWishlistSyncStatus(getAuthErrorMessage(redirectError));
                    });
                    return;
                }
                console.warn('Wishlist popup login failed:', error);
                setWishlistSyncStatus(getAuthErrorMessage(error));
            });
    });

    wishlistAuth.getRedirectResult().then((result) => {
        if (result && result.user) {
            showWishlistUser(result.user);
            connectWishlistDatabase();
            connectAlbumsDatabase();
            connectSiteSettings();
            connectCapsulesDatabase();
            connectPlacesDatabase();
            connectTimelineDatabase();
            connectEventsDatabase();
            setGlobalEditMode(false);
        }
    }).catch((error) => {
        console.warn('Wishlist redirect login failed:', error);
        setWishlistSyncStatus(getAuthErrorMessage(error));
    });

    wishlistLogoutBtn.addEventListener('click', () => {
        wishlistAuth.signOut();
    });
    renderEventLinkOptions();
}

function getAuthErrorMessage(error) {
    const code = error && error.code ? error.code : 'unknown';
    const message = error && error.message ? error.message : 'No detail';

    if (code === 'auth/operation-not-allowed') {
        return 'Google 登录未启用：请在 Firebase Authentication 的“登录方法”里启用 Google。';
    }
    if (code === 'auth/unauthorized-domain') {
        return `当前域名未授权：请把 ${window.location.hostname || window.location.origin} 加入 Authorized domains。错误码：${code}`;
    }
    if (code === 'auth/popup-blocked') {
        return '登录弹窗被浏览器拦截。当前版本已改为跳转登录，请刷新后再试。';
    }
    if (code === 'auth/popup-closed-by-user') {
        return '登录窗口被关闭，请重新点击 Google 登录。';
    }
    if (code === 'auth/network-request-failed') {
        return '网络请求失败，请确认能访问 Firebase 和 Google 登录服务。';
    }

    return `Google 登录失败：${code}。${message}`;
}

function connectWishlistDatabase() {
    disconnectWishlistDatabase();
    wishlistDbRef = firebase.database().ref('wishlistItems');
    setWishlistEditEnabled(canEditPrivateSections());
    setWishlistSyncStatus('已登录，正在读取云端愿望清单...');

    wishlistUnsubscribe = wishlistDbRef.on('value', (snapshot) => {
        const cloudItems = normalizeWishlistItems(snapshot.val());
        if (cloudItems.length) {
            wishlistItems = cloudItems;
            saveLocalWishlistItems(wishlistItems);
        } else {
            wishlistDbRef.set(wishlistItems).catch((error) => {
                console.warn('Failed to initialize wishlist in Firebase:', error);
                setWishlistSyncStatus('云端初始化失败，请检查数据库规则。');
            });
        }
        setWishlistSyncStatus('已连接云端同步。');
        renderWishlist();
    }, (error) => {
        console.warn('Failed to sync wishlist from Firebase:', error);
        setWishlistSyncStatus('云端同步失败，请检查 Firebase 数据库规则。');
    });
}

function disconnectWishlistDatabase() {
    if (wishlistDbRef && wishlistUnsubscribe) {
        wishlistDbRef.off('value', wishlistUnsubscribe);
    }
    wishlistDbRef = null;
    wishlistUnsubscribe = null;
}

function showWishlistUser(user) {
    wishlistLoginBtn.hidden = true;
    wishlistUserInfo.hidden = false;
    wishlistUserPhoto.src = user.photoURL || '';
    wishlistUserName.textContent = isOwnerUser(user)
        ? (user.displayName || user.email || '已登录')
        : '当前账号无编辑权限';
}

function hideWishlistUser() {
    wishlistLoginBtn.hidden = false;
    wishlistUserInfo.hidden = true;
    wishlistUserPhoto.src = '';
    wishlistUserName.textContent = '';
    if (globalEditToggle) globalEditToggle.hidden = true;
}

function setWishlistEditEnabled(enabled) {
    wishlistForm.querySelectorAll('input, button').forEach((control) => {
        control.disabled = !enabled;
    });
    wishlistList.querySelectorAll('input, button').forEach((control) => {
        control.disabled = !enabled;
    });
}

function setWishlistSyncStatus(message) {
    if (wishlistSyncStatus) {
        wishlistSyncStatus.textContent = message;
    }
}

function normalizeWishlistItems(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
        return value.filter(Boolean);
    }
    return Object.values(value).filter(Boolean);
}

function loadLocalWishlistItems() {
    try {
        const storedItems = JSON.parse(localStorage.getItem(wishlistStorageKey));
        if (Array.isArray(storedItems) && storedItems.length) {
            return storedItems;
        }
    } catch (error) {
        console.warn('Failed to read wishlist data:', error);
    }
    return defaultWishlistItems;
}

function saveLocalWishlistItems(items) {
    localStorage.setItem(wishlistStorageKey, JSON.stringify(items));
}

function persistWishlistItems(items) {
    wishlistItems = items;
    saveLocalWishlistItems(items);
    renderWishlist();

    if (wishlistDbRef) {
        wishlistDbRef.set(items).then(() => {
            setWishlistSyncStatus('已保存至云端。');
        }).catch((error) => {
            console.warn('Failed to save wishlist to Firebase:', error);
            setWishlistSyncStatus('云端保存失败，当前改动会先保存在本机。');
        });
    }
}

function renderWishlist() {
    const items = wishlistItems;
    wishlistList.innerHTML = '';

    items.forEach((item, index) => {
        const itemEl = document.createElement('article');
        itemEl.className = `wish-item story-card ${item.completed ? 'completed' : ''}`;
        const canEdit = Boolean(wishlistDbRef) && canEditPrivateSections();

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'wish-checkbox owner-edit-only';
        checkbox.checked = item.completed;
        checkbox.disabled = !canEdit;
        checkbox.setAttribute('aria-label', '标记完成状态');
        checkbox.addEventListener('change', () => {
            updateWishlistItem(item.id, { completed: checkbox.checked });
        });

        const view = document.createElement('div');
        view.className = 'story-card-view wish-view';
        view.innerHTML = `
            <div class="story-card-meta">
                <span class="story-card-tag ${item.completed ? 'done' : ''}">${item.completed ? '已完成' : '计划中'}</span>
                <time>${escapeHtml(formatDateForAlbum(item.expectedDate))}</time>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.completed ? (item.completedNote || '这件事已经被好好完成。') : '一起把这件事写进未来。')}</p>
        `;

        const fields = document.createElement('div');
        fields.className = 'wish-fields owner-edit-only';

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = item.title;
        titleInput.maxLength = 40;
        titleInput.className = 'wish-title-input';
        titleInput.disabled = !canEdit;
        titleInput.setAttribute('aria-label', '愿望事件');
        titleInput.addEventListener('change', () => {
            updateWishlistItem(item.id, { title: titleInput.value.trim() || item.title });
        });

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = item.expectedDate;
        dateInput.className = 'wish-date-input';
        dateInput.disabled = !canEdit;
        dateInput.setAttribute('aria-label', '预计完成时间');
        dateInput.addEventListener('change', () => {
            updateWishlistItem(item.id, { expectedDate: dateInput.value });
        });

        fields.append(titleInput, dateInput);

        const controls = document.createElement('div');
        controls.className = 'wish-controls owner-edit-only';

        const upBtn = createWishButton('↑', '上移优先级', () => moveWishlistItem(index, -1));
        const downBtn = createWishButton('↓', '下移优先级', () => moveWishlistItem(index, 1));
        const deleteBtn = createWishButton('×', '删除事件', () => deleteWishlistItem(item.id));
        upBtn.disabled = !canEdit || index === 0;
        downBtn.disabled = !canEdit || index === items.length - 1;
        deleteBtn.disabled = !canEdit;

        controls.append(upBtn, downBtn, deleteBtn);
        itemEl.append(checkbox, view, fields, controls);

        if (item.completed) {
            const completion = document.createElement('div');
            completion.className = 'wish-completion';

            const completionView = document.createElement('div');
            completionView.className = 'wish-completion-view';
            completionView.innerHTML = `
                <span>${escapeHtml(item.completedDate ? formatDateForAlbum(item.completedDate) : '完成记录')}</span>
                <p>${escapeHtml(item.completedNote || '完成后的记录可以在编辑模式里补上。')}</p>
            `;

            const completedDateInput = document.createElement('input');
            completedDateInput.type = 'date';
            completedDateInput.value = item.completedDate || '';
            completedDateInput.disabled = !canEdit;
            completedDateInput.className = 'owner-edit-only';
            completedDateInput.addEventListener('change', () => {
                updateWishlistItem(item.id, { completedDate: completedDateInput.value });
            });

            const completedNoteInput = document.createElement('input');
            completedNoteInput.type = 'text';
            completedNoteInput.placeholder = '完成这件事时的记录';
            completedNoteInput.value = item.completedNote || '';
            completedNoteInput.maxLength = 100;
            completedNoteInput.disabled = !canEdit;
            completedNoteInput.className = 'owner-edit-only';
            completedNoteInput.addEventListener('change', () => {
                updateWishlistItem(item.id, { completedNote: completedNoteInput.value.trim() });
            });

            const photoLabel = document.createElement('label');
            photoLabel.className = 'wish-photo-upload owner-edit-only';
            photoLabel.textContent = item.completedPhoto ? '更换完成照片' : '上传完成照片';
            const photoInput = document.createElement('input');
            photoInput.type = 'file';
            photoInput.accept = 'image/*';
            photoInput.disabled = !canEdit;
            photoInput.addEventListener('change', () => {
                uploadWishlistCompletionPhoto(item.id, photoInput.files[0]).catch((error) => {
                    console.warn('Failed to upload completion photo:', error);
                    setWishlistSyncStatus('完成照片上传失败，请检查 Storage 规则。');
                });
            });
            photoLabel.appendChild(photoInput);

            completion.append(completionView, completedDateInput, completedNoteInput, photoLabel);
            if (item.completedPhoto) {
                const photo = document.createElement('img');
                photo.src = item.completedPhoto;
                photo.alt = item.title;
                completion.appendChild(photo);
            }
            itemEl.appendChild(completion);
        }
        wishlistList.appendChild(itemEl);
    });
}

function createWishButton(text, label, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = text;
    button.setAttribute('aria-label', label);
    button.addEventListener('click', onClick);
    return button;
}

function updateWishlistItem(id, updates) {
    const items = wishlistItems.map((item) => (
        item.id === id ? { ...item, ...updates } : item
    ));
    persistWishlistItems(items);
}

function moveWishlistItem(index, direction) {
    const items = [...wishlistItems];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const [item] = items.splice(index, 1);
    items.splice(targetIndex, 0, item);
    persistWishlistItems(items);
}

function deleteWishlistItem(id) {
    const items = wishlistItems.filter((item) => item.id !== id);
    persistWishlistItems(items);
}

function addWishlistItem(title, expectedDate) {
    const items = [...wishlistItems];
    items.push({
        id: `wish-${Date.now()}`,
        title,
        expectedDate,
        completed: false,
    });
    persistWishlistItems(items);
}

async function uploadWishlistCompletionPhoto(wishId, file) {
    if (!file || !firebase.storage) return;
    const storagePath = `wishlist/${wishId}-${Date.now()}-${sanitizeFileName(file.name)}`;
    const url = await uploadCompressedFile(storagePath, file, 1400, 0.82);
    updateWishlistItem(wishId, { completedPhoto: url, completedPhotoPath: storagePath });
}

function initSiteFeatures() {
    siteSettings = normalizeSiteSettings(loadStoredObject(siteSettingsStorageKey, defaultSiteSettings));
    capsules = loadStoredArray(capsulesStorageKey, defaultCapsules);
    places = loadStoredArray(placesStorageKey, defaultPlaces);
    applySiteSettings();
    renderCapsules();
    renderPlaces();
    setSettingsEditEnabled(false);
    setCapsuleEditEnabled(false);
    setPlaceEditEnabled(false);
}

function normalizeSiteSettings(settings) {
    const privacy = settings && settings.privacy ? settings.privacy : {};
    return {
        ...defaultSiteSettings,
        ...(settings || {}),
        privacy: {
            ...defaultPrivacySettings,
            ...privacy,
            modules: {
                ...defaultPrivacySettings.modules,
                ...(privacy.modules || {}),
            },
        },
    };
}

function loadStoredObject(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        if (value && typeof value === 'object') return { ...fallback, ...value };
    } catch (error) {
        console.warn(`Failed to read ${key}:`, error);
    }
    return { ...fallback };
}

function loadStoredArray(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(value)) return value;
    } catch (error) {
        console.warn(`Failed to read ${key}:`, error);
    }
    return fallback;
}

function connectSiteSettings() {
    disconnectSiteSettings();
    settingsDbRef = firebase.database().ref('siteSettings');
    setSettingsEditEnabled(canEditPrivateSections());
    settingsUnsubscribe = settingsDbRef.on('value', (snapshot) => {
        const cloudSettings = snapshot.val();
        if (cloudSettings) {
            siteSettings = normalizeSiteSettings(cloudSettings);
            localStorage.setItem(siteSettingsStorageKey, JSON.stringify(siteSettings));
        } else {
            settingsDbRef.set(siteSettings).catch((error) => console.warn('Failed to initialize site settings:', error));
        }
        applySiteSettings();
    }, (error) => console.warn('Failed to sync site settings:', error));
}

function disconnectSiteSettings() {
    if (settingsDbRef && settingsUnsubscribe) settingsDbRef.off('value', settingsUnsubscribe);
    settingsDbRef = null;
    settingsUnsubscribe = null;
}

function applySiteSettings() {
    siteSettings = normalizeSiteSettings(siteSettings);
    const cover = siteSettings.heroCover || defaultSiteSettings.heroCover;
    if (heroMedia) {
        heroMedia.style.backgroundImage = `linear-gradient(90deg, rgba(34, 25, 22, 0.72), rgba(34, 25, 22, 0.32) 48%, rgba(34, 25, 22, 0.56)), url("${cover}")`;
    }
    if (hisAvatar) hisAvatar.src = siteSettings.hisAvatar || 'assets/favicon/android-chrome-192x192.png';
    if (herAvatar) herAvatar.src = siteSettings.herAvatar || 'assets/favicon/apple-touch-icon.png';
    applyPrivacySettings();
    renderPlaces();
}

function persistSiteSettings(updates) {
    siteSettings = normalizeSiteSettings({ ...siteSettings, ...updates });
    localStorage.setItem(siteSettingsStorageKey, JSON.stringify(siteSettings));
    applySiteSettings();
    if (settingsDbRef) settingsDbRef.set(siteSettings).catch((error) => console.warn('Failed to save site settings:', error));
}

async function uploadSettingImage(key, file, maxSize) {
    if (!file) return;
    if (!settingsDbRef) {
        setWishlistSyncStatus('请先登录，再修改首页封面或头像。');
        return;
    }
    setWishlistSyncStatus('正在上传图片...');
    setAlbumSyncStatus('正在上传首页封面/头像...');
    const storagePath = `site/${key}-${Date.now()}-${sanitizeFileName(file.name)}`;
    console.log('Uploading site image', {
        key,
        storageBucket: firebaseConfig.storageBucket,
        storagePath,
        uid: wishlistAuth && wishlistAuth.currentUser ? wishlistAuth.currentUser.uid : null,
        size: file.size,
        type: file.type,
    });
    const url = await uploadCompressedFile(storagePath, file, maxSize, 0.84);
    persistSiteSettings({ [key]: url });
    setWishlistSyncStatus('首页封面/头像已更新。');
    setAlbumSyncStatus('首页封面/头像已更新。');
}

function setSettingsEditEnabled(enabled) {
    [heroCoverInput, hisAvatarInput, herAvatarInput].forEach((control) => {
        if (control) control.disabled = !enabled;
    });
}

function connectCapsulesDatabase() {
    disconnectCapsulesDatabase();
    capsulesDbRef = firebase.database().ref('timeCapsules');
    setCapsuleEditEnabled(canEditPrivateSections());
    setCapsuleSyncStatus('时间胶囊已连接云端同步。');
    capsulesUnsubscribe = capsulesDbRef.on('value', (snapshot) => {
        const value = snapshot.val();
        if (Array.isArray(value) && value.length) {
            capsules = value;
            localStorage.setItem(capsulesStorageKey, JSON.stringify(capsules));
        } else if (!value) {
            capsulesDbRef.set(capsules).catch((error) => console.warn('Failed to initialize capsules:', error));
        }
        renderCapsules();
    }, (error) => {
        console.warn('Failed to sync capsules:', error);
        setCapsuleSyncStatus('时间胶囊同步失败，请检查数据库规则。');
    });
}

function disconnectCapsulesDatabase() {
    if (capsulesDbRef && capsulesUnsubscribe) capsulesDbRef.off('value', capsulesUnsubscribe);
    capsulesDbRef = null;
    capsulesUnsubscribe = null;
}

function setCapsuleSyncStatus(message) {
    if (capsuleSyncStatus) capsuleSyncStatus.textContent = message;
}

function setCapsuleEditEnabled(enabled) {
    capsuleForm.querySelectorAll('input, textarea, button').forEach((control) => {
        control.disabled = !enabled;
    });
}

function persistCapsules(items) {
    capsules = items;
    localStorage.setItem(capsulesStorageKey, JSON.stringify(capsules));
    renderCapsules();
    if (capsulesDbRef) capsulesDbRef.set(capsules).catch((error) => console.warn('Failed to save capsules:', error));
}

function renderCapsules() {
    capsuleList.innerHTML = '';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    capsules.slice().sort((a, b) => new Date(a.unlockDate) - new Date(b.unlockDate)).forEach((capsule) => {
        const unlockDate = new Date(capsule.unlockDate);
        unlockDate.setHours(0, 0, 0, 0);
        const unlocked = unlockDate <= today;
        const item = document.createElement('article');
        item.className = `capsule-item story-card ${unlocked ? 'unlocked' : 'locked'}`;
        item.innerHTML = `
            <div class="story-card-meta">
                <span class="story-card-tag ${unlocked ? 'done' : 'wish'}">${unlocked ? '已解锁' : '待解锁'}</span>
                <time>${formatDateForAlbum(capsule.unlockDate)}</time>
            </div>
            <div class="capsule-content">
                <h3>${escapeHtml(capsule.title)}</h3>
                <p>${unlocked ? escapeHtml(capsule.message) : '这颗胶囊还没有到打开的时间。'}</p>
            </div>
        `;
        capsuleList.appendChild(item);
    });
}

function addCapsule(title, unlockDate, message) {
    persistCapsules([...capsules, {
        id: `capsule-${Date.now()}`,
        title,
        unlockDate,
        message,
        createdAt: Date.now(),
    }]);
}

function connectPlacesDatabase() {
    disconnectPlacesDatabase();
    placesDbRef = firebase.database().ref('mapPlaces');
    setPlaceEditEnabled(canEditPrivateSections());
    setMapSyncStatus('情侣地图已连接云端同步。');
    placesUnsubscribe = placesDbRef.on('value', (snapshot) => {
        const value = snapshot.val();
        if (Array.isArray(value) && value.length) {
            places = value;
            localStorage.setItem(placesStorageKey, JSON.stringify(places));
        } else if (!value) {
            placesDbRef.set(places).catch((error) => console.warn('Failed to initialize places:', error));
        }
        renderPlaces();
    }, (error) => {
        console.warn('Failed to sync places:', error);
        setMapSyncStatus('情侣地图同步失败，请检查数据库规则。');
    });
}

function disconnectPlacesDatabase() {
    if (placesDbRef && placesUnsubscribe) placesDbRef.off('value', placesUnsubscribe);
    placesDbRef = null;
    placesUnsubscribe = null;
}

function setMapSyncStatus(message) {
    if (mapSyncStatus) mapSyncStatus.textContent = message;
}

function setPlaceEditEnabled(enabled) {
    placeForm.querySelectorAll('input, textarea, button').forEach((control) => {
        control.disabled = !enabled;
    });
    placeForm.querySelectorAll('select').forEach((control) => {
        control.disabled = !enabled;
    });
    [mapImageInput, currentLocationBtn].forEach((control) => {
        if (control) control.disabled = !enabled;
    });
    placeList.querySelectorAll('button, input, select, textarea').forEach((control) => {
        control.disabled = !enabled;
    });
}

function persistPlaces(items) {
    places = items;
    localStorage.setItem(placesStorageKey, JSON.stringify(places));
    renderPlaces();
    if (placesDbRef) placesDbRef.set(places).catch((error) => console.warn('Failed to save places:', error));
}

async function addPlace(title, date, location, story, status, color, file) {
    let photo = '';
    let photoPath = '';
    if (file) {
        photoPath = `places/place-${Date.now()}-${sanitizeFileName(file.name)}`;
        photo = await uploadCompressedFile(photoPath, file, 1400, 0.82);
    }

    persistPlaces([...places, {
        id: `place-${Date.now()}`,
        title,
        date: formatDateForAlbum(date),
        location,
        story,
        status,
        color,
        photo,
        photoPath,
        x: 12 + Math.random() * 76,
        y: 18 + Math.random() * 64,
    }]);
}

function initLeafletMap() {
    if (loveMap || !window.L || !loveMapCanvas) return;
    loveMap = L.map(loveMapCanvas, {
        zoomControl: true,
        attributionControl: true,
        minZoom: 3,
        maxZoom: 9,
    }).setView([35.8, 104.2], 4);
}

async function loadChinaGeoJson() {
    if (chinaGeoJsonLoaded || !loveMap || !window.L) return;
    try {
        setMapSyncStatus('正在加载本地中国市级边界地图...');
        const geojson = await fetchGeoJson(localChinaCityGeoJsonUrl);
        renderGeoJsonMap(geojson);
        chinaGeoJsonLoaded = true;
        setMapSyncStatus('中国市级地图已加载，可按城市记录故事。');
        renderPlaces();
    } catch (error) {
        console.warn('Failed to load local city GeoJSON, falling back to province GeoJSON:', error);
        try {
            const geojson = await fetchGeoJson(localChinaProvinceGeoJsonUrl);
            renderGeoJsonMap(geojson);
            chinaGeoJsonLoaded = true;
            setMapSyncStatus('本地市级地图加载失败，已回退到本地省级地图。');
            renderPlaces();
        } catch (fallbackError) {
            console.warn('Failed to load local China GeoJSON, trying remote data source:', fallbackError);
            try {
                const geojson = await loadChinaCityGeoJson();
                renderGeoJsonMap(geojson);
                chinaGeoJsonLoaded = true;
                setMapSyncStatus('中国市级地图已加载，可按城市记录故事。');
                renderPlaces();
            } catch (remoteCityError) {
                console.warn('Failed to load remote city GeoJSON, falling back to remote province GeoJSON:', remoteCityError);
                try {
                    const geojson = await fetchGeoJson(chinaProvinceGeoJsonUrl);
                    renderGeoJsonMap(geojson);
                    chinaGeoJsonLoaded = true;
                    setMapSyncStatus('市级地图加载失败，已回退到省级地图。');
                    renderPlaces();
                } catch (remoteProvinceError) {
                    console.warn('Failed to load China GeoJSON:', remoteProvinceError);
                    setMapSyncStatus('中国地图边界加载失败，请检查网络；地点列表仍可使用。');
                }
            }
        }
    }
}

async function fetchGeoJson(url) {
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    return response.json();
}

async function loadChinaCityGeoJson() {
    const results = await Promise.allSettled(chinaProvinceAdcodes.map(async (adcode) => {
        const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${adcode}`);
        }
        return response.json();
    }));

    const features = results.flatMap((result) => {
        if (result.status !== 'fulfilled' || !result.value || !Array.isArray(result.value.features)) {
            return [];
        }
        return result.value.features;
    });

    if (!features.length) {
        throw new Error('No city GeoJSON features loaded.');
    }

    return {
        type: 'FeatureCollection',
        features,
    };
}

function renderGeoJsonMap(geojson) {
    if (!loveMap || !window.L) return;
    if (chinaGeoLayer) {
        loveMap.removeLayer(chinaGeoLayer);
    }
    regionLayers = {};
    mapRegionOptions.innerHTML = '';
    chinaGeoLayer = L.geoJSON(geojson, {
        style: (feature) => getRegionStyle(getFeatureName(feature)),
        onEachFeature: (feature, layer) => {
            const name = getFeatureName(feature);
            if (!name) return;
            regionLayers[normalizeRegionName(name)] = layer;
            const option = document.createElement('option');
            option.value = name;
            mapRegionOptions.appendChild(option);
            layer.on('click', () => {
                const related = findPlacesForRegion(name);
                layer.bindPopup(buildRegionPopup(name, related)).openPopup();
            });
        },
    }).addTo(loveMap);
    loveMap.fitBounds(chinaGeoLayer.getBounds(), { padding: [12, 12] });
}

function getFeatureName(feature) {
    const props = feature && feature.properties ? feature.properties : {};
    return props.name || props.NAME || props.fullname || props.fullName || props.adcode || '';
}

function loadCustomGeoJsonFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const geojson = JSON.parse(reader.result);
            chinaGeoJsonLoaded = true;
            renderGeoJsonMap(geojson);
            renderPlaces();
            setMapSyncStatus('自定义 GeoJSON 地图已导入。');
        } catch (error) {
            console.warn('Failed to parse GeoJSON:', error);
            setMapSyncStatus('GeoJSON 解析失败，请确认文件格式正确。');
        }
    };
    reader.readAsText(file);
}

function renderPlaces() {
    initLeafletMap();
    loadChinaGeoJson();
    refreshRegionStyles();
    placeList.innerHTML = '';
    places.forEach((place, index) => {
        const item = document.createElement('article');
        item.className = 'place-item story-card';
        item.innerHTML = `
            <div class="story-card-meta">
                <span class="story-card-tag ${place.status === 'wish' ? 'wish' : 'visited'}"><i style="background:${escapeHtml(place.color || '#c95f66')}"></i>${place.status === 'wish' ? '想去' : '去过'}</span>
                <time>${escapeHtml(place.date)}</time>
            </div>
            <h3>${escapeHtml(place.title)}</h3>
            <small>${escapeHtml(place.location)}</small>
            <p>${escapeHtml(place.story)}</p>
            ${place.photo ? `<img src="${escapeHtml(place.photo)}" alt="${escapeHtml(place.title)}">` : ''}
        `;
        const locateBtn = document.createElement('button');
        locateBtn.type = 'button';
        locateBtn.textContent = '高亮';
        locateBtn.className = 'owner-edit-only';
        locateBtn.addEventListener('click', () => focusRegion(place.location));
        const colorWrap = document.createElement('label');
        colorWrap.className = 'place-color-edit owner-edit-only';
        colorWrap.textContent = '颜色';
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = place.color || '#c95f66';
        colorInput.disabled = !placesDbRef;
        colorInput.setAttribute('aria-label', `${place.title} 标记颜色`);
        colorInput.addEventListener('change', () => {
            persistPlaces(places.map((candidate) => (
                candidate.id === place.id ? { ...candidate, color: colorInput.value } : candidate
            )));
            setMapSyncStatus('地点颜色已更新。');
        });
        colorWrap.appendChild(colorInput);
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'owner-edit-only';
        deleteBtn.disabled = !placesDbRef;
        deleteBtn.addEventListener('click', () => {
            persistPlaces(places.filter((candidate) => candidate.id !== place.id));
        });
        item.append(locateBtn, colorWrap, deleteBtn);
        placeList.appendChild(item);
    });

    if (siteSettings.currentLocation) {
        const lat = Number(siteSettings.currentLocation.latitude);
        const lng = Number(siteSettings.currentLocation.longitude);
        if (!Number.isNaN(lat) && !Number.isNaN(lng) && loveMap) {
            if (currentLocationMarker) {
                loveMap.removeLayer(currentLocationMarker);
            }
            currentLocationMarker = L.marker([lat, lng], { title: '当前位置' }).addTo(loveMap)
                .bindPopup(`当前位置<br>${escapeHtml(siteSettings.currentLocation.label || '')}`);
        }
    }
    renderEventLinkOptions();
}

function normalizeRegionName(name) {
    return String(name || '').replace(/省|市|自治区|壮族|回族|维吾尔|特别行政区/g, '').trim();
}

function findPlacesForRegion(name) {
    const normalized = normalizeRegionName(name);
    return places.filter((place) => {
        const location = normalizeRegionName(place.location);
        return location === normalized || location.includes(normalized) || normalized.includes(location);
    });
}

function getRegionStyle(name) {
    const related = findPlacesForRegion(name);
    if (!related.length) {
        return {
            color: '#ffffff',
            weight: 1,
            fillColor: '#d7d1c9',
            fillOpacity: 0.28,
        };
    }
    const latest = related[related.length - 1];
    return {
        color: '#ffffff',
        weight: 1.4,
        fillColor: latest.color || (latest.status === 'wish' ? '#6e8d7a' : '#c95f66'),
        fillOpacity: latest.status === 'wish' ? 0.48 : 0.72,
    };
}

function refreshRegionStyles() {
    if (!chinaGeoLayer) return;
    chinaGeoLayer.setStyle((feature) => getRegionStyle(getFeatureName(feature)));
}

function buildRegionPopup(name, related) {
    if (!related.length) {
        return `
            <div class="map-popup-card empty">
                <span class="map-popup-region">${escapeHtml(name)}</span>
                <strong>还没有记录</strong>
                <p>以后可以把这里变成你们的故事地点。</p>
            </div>
        `;
    }
    return `
        <div class="map-popup-card">
            <span class="map-popup-region">${escapeHtml(name)}</span>
            ${related.map((place) => `
                <article class="map-popup-place">
                    <div class="map-popup-meta">
                        <span class="map-popup-badge ${place.status === 'wish' ? 'wish' : 'visited'}">${place.status === 'wish' ? '想去' : '去过'}</span>
                        <time>${escapeHtml(place.date || '')}</time>
                    </div>
                    <strong>${escapeHtml(place.title)}</strong>
                    <p>${escapeHtml(place.story)}</p>
                    ${place.photo ? `<img src="${escapeHtml(place.photo)}" alt="${escapeHtml(place.title)}">` : ''}
                </article>
            `).join('')}
        </div>
    `;
}

function focusRegion(location) {
    const normalized = normalizeRegionName(location);
    const layer = regionLayers[normalized] || Object.entries(regionLayers).find(([name]) => (
        name.includes(normalized) || normalized.includes(name)
    ))?.[1];
    if (!layer || !loveMap) return;
    loveMap.fitBounds(layer.getBounds(), { padding: [24, 24] });
    const featureName = getFeatureName(layer.feature);
    layer.bindPopup(buildRegionPopup(featureName || location, findPlacesForRegion(featureName || location))).openPopup();
}

function escapeHtml(text) {
    return String(text || '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }[char]));
}

function initAlbumStore() {
    albums = loadLocalAlbums();
    setAlbumEditEnabled(false);
    renderAlbumFolders();
}

function connectAlbumsDatabase() {
    disconnectAlbumsDatabase();
    if (!window.firebase || !firebase.storage) {
        setAlbumSyncStatus('Firebase Storage 不可用，无法上传图片。');
        return;
    }

    albumsDbRef = firebase.database().ref('albums');
    albumStorage = firebase.storage();
    setAlbumEditEnabled(canEditPrivateSections());
    setAlbumSyncStatus('已登录，正在读取云端相册...');

    albumsUnsubscribe = albumsDbRef.on('value', (snapshot) => {
        const cloudAlbums = normalizeAlbums(snapshot.val());
        if (cloudAlbums.length) {
            albums = cloudAlbums;
            saveLocalAlbums(albums);
        } else {
            albumsDbRef.set(albums).catch((error) => {
                console.warn('Failed to initialize albums:', error);
                setAlbumSyncStatus('相册云端初始化失败，请检查 Realtime Database 规则。');
            });
        }
        setAlbumSyncStatus('相册已连接云端同步。');
        renderCurrentAlbumView();
    }, (error) => {
        console.warn('Failed to sync albums:', error);
        setAlbumSyncStatus('相册云端同步失败，请检查 Realtime Database 规则。');
    });
}

function disconnectAlbumsDatabase() {
    if (albumsDbRef && albumsUnsubscribe) {
        albumsDbRef.off('value', albumsUnsubscribe);
    }
    albumsDbRef = null;
    albumsUnsubscribe = null;
    albumStorage = null;
    currentAlbumId = null;
    albumEditor.hidden = true;
}

function normalizeAlbums(value) {
    const rawAlbums = Array.isArray(value) ? value : Object.values(value || {});
    return rawAlbums.filter(Boolean).map((album) => ({
        id: album.id || `album-${Date.now()}`,
        title: album.title || '未命名事件',
        date: album.date || '',
        description: album.description || '',
        cover: album.cover || '',
        coverPhotoId: album.coverPhotoId || '',
        photos: Array.isArray(album.photos) ? album.photos.filter(Boolean).map(normalizePhoto) : [],
    }));
}

function normalizePhoto(photo) {
    return {
        id: photo.id || `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        src: photo.src || '',
        thumb: photo.thumb || photo.src || '',
        caption: photo.caption || '',
        storagePath: photo.storagePath || '',
    };
}

function loadLocalAlbums() {
    try {
        const storedAlbums = JSON.parse(localStorage.getItem(albumsStorageKey));
        if (Array.isArray(storedAlbums) && storedAlbums.length) {
            return normalizeAlbums(storedAlbums);
        }
    } catch (error) {
        console.warn('Failed to read local albums:', error);
    }
    return normalizeAlbums(loveAlbums);
}

function saveLocalAlbums(items) {
    localStorage.setItem(albumsStorageKey, JSON.stringify(items));
}

function persistAlbums(items) {
    albums = normalizeAlbums(items);
    saveLocalAlbums(albums);
    renderCurrentAlbumView();

    if (albumsDbRef) {
        albumsDbRef.set(albums).then(() => {
            setAlbumSyncStatus('相册已保存至云端。');
        }).catch((error) => {
            console.warn('Failed to save albums:', error);
            setAlbumSyncStatus('相册云端保存失败，请检查数据库规则。');
        });
    }
}

function renderCurrentAlbumView() {
    if (currentAlbumId && albums.some((album) => album.id === currentAlbumId)) {
        openAlbum(currentAlbumId);
    } else {
        renderAlbumFolders();
    }
}

function setAlbumSyncStatus(message) {
    if (albumSyncStatus) {
        albumSyncStatus.textContent = message;
    }
}

function setAlbumEditEnabled(enabled) {
    albumForm.querySelectorAll('input, button').forEach((control) => {
        control.disabled = !enabled;
    });
    albumEditor.querySelectorAll('input, button, select').forEach((control) => {
        control.disabled = !enabled;
    });
    imageContainer.querySelectorAll('.album-action, .photo-action, .photo-move-select').forEach((control) => {
        control.disabled = !enabled;
    });
}

function getAlbumCover(album) {
    const coverPhoto = album.photos.find((photo) => photo.id === album.coverPhotoId);
    return (coverPhoto && (coverPhoto.thumb || coverPhoto.src)) || album.cover || (album.photos[0] && (album.photos[0].thumb || album.photos[0].src)) || '';
}

function renderAlbumFolders() {
    loadedImages = [];
    imageContainer.className = 'album-grid';
    imageContainer.innerHTML = '';
    albumToolbar.hidden = true;
    albumEditor.hidden = true;
    currentAlbumId = null;

    albums.forEach((album) => {
        const albumCard = document.createElement('article');
        albumCard.className = 'album-card story-card';

        const cover = document.createElement('img');
        cover.src = getAlbumCover(album);
        cover.alt = album.title;
        cover.loading = 'lazy';
        cover.addEventListener('click', () => openAlbum(album.id));

        const content = document.createElement('span');
        content.className = 'album-card-content';
        content.addEventListener('click', () => openAlbum(album.id));

        const meta = document.createElement('small');
        meta.innerHTML = `<span class="story-card-tag">相册</span><time>${escapeHtml(album.date)}</time><em>${album.photos.length} 张照片</em>`;

        const title = document.createElement('strong');
        title.textContent = album.title;

        const description = document.createElement('span');
        description.textContent = album.description;

        const actions = document.createElement('span');
        actions.className = 'album-card-actions owner-edit-only';
        const openBtn = document.createElement('button');
        openBtn.type = 'button';
        openBtn.textContent = '打开';
        openBtn.addEventListener('click', () => openAlbum(album.id));
        actions.appendChild(openBtn);

        content.append(meta, title, description);
        albumCard.append(cover, content, actions);
        imageContainer.appendChild(albumCard);
    });
    setAlbumEditEnabled(Boolean(albumsDbRef) && canEditPrivateSections());
    renderEventLinkOptions();
}

function openAlbum(albumId) {
    const album = albums.find((item) => item.id === albumId);
    if (!album) return;
    currentAlbumId = albumId;

    loadedImages = album.photos.map((photo) => ({
        id: photo.id,
        src: photo.src,
        thumb: photo.thumb,
        date: album.date,
        caption: photo.caption,
        storagePath: photo.storagePath,
    }));

    albumViewTitle.textContent = album.title;
    albumViewMeta.textContent = `${album.date} · ${album.description}`;
    albumToolbar.hidden = false;
    albumEditor.hidden = !canEditPrivateSections();
    albumEditTitle.value = album.title;
    albumEditDate.value = normalizeDateForInput(album.date);
    albumEditDescription.value = album.description;
    imageContainer.className = 'photo-gallery';
    imageContainer.innerHTML = '';

    loadedImages.forEach((photo, index) => {
        const photoCard = document.createElement('article');
        photoCard.className = 'photo-card';

        const imgElement = document.createElement('img');
        imgElement.src = photo.thumb;
        imgElement.dataset.large = photo.src;
        imgElement.alt = photo.caption;
        imgElement.loading = 'lazy';
        imgElement.addEventListener('click', () => {
            showPopup(photo.src, formatImageMeta(photo), index);
        });

        const captionInput = document.createElement('input');
        captionInput.type = 'text';
        captionInput.value = photo.caption;
        captionInput.placeholder = '照片说明';
        captionInput.className = 'photo-caption-input';
        captionInput.classList.add('owner-edit-only');
        captionInput.disabled = !albumsDbRef;
        captionInput.addEventListener('change', () => {
            updatePhoto(photo.id, { caption: captionInput.value.trim() });
        });

        const actions = document.createElement('div');
        actions.className = 'photo-actions owner-edit-only';

        const coverBtn = createPhotoAction('设为封面', () => setAlbumCover(album.id, photo.id));
        const moveSelect = document.createElement('select');
        moveSelect.className = 'photo-move-select';
        moveSelect.disabled = !albumsDbRef;
        albums.filter((item) => item.id !== album.id).forEach((targetAlbum) => {
            const option = document.createElement('option');
            option.value = targetAlbum.id;
            option.textContent = targetAlbum.title;
            moveSelect.appendChild(option);
        });

        const moveBtn = createPhotoAction('移动', () => movePhotoToAlbum(photo.id, moveSelect.value));
        moveBtn.disabled = !albumsDbRef || !moveSelect.options.length;
        const deleteBtn = createPhotoAction('删除', () => deletePhoto(photo.id));

        actions.append(coverBtn, moveSelect, moveBtn, deleteBtn);
        photoCard.append(imgElement, captionInput, actions);
        imageContainer.appendChild(photoCard);
    });
    setAlbumEditEnabled(Boolean(albumsDbRef) && canEditPrivateSections());
}

function createPhotoAction(text, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-action';
    button.textContent = text;
    button.disabled = !albumsDbRef;
    button.addEventListener('click', onClick);
    return button;
}

function normalizeDateForInput(dateText) {
    if (!dateText) return '';
    return dateText.replace(/\./g, '-');
}

function formatDateForAlbum(dateText) {
    if (!dateText) return '';
    return dateText.replace(/-/g, '.');
}

function updateCurrentAlbum(updates) {
    const items = albums.map((album) => (
        album.id === currentAlbumId ? { ...album, ...updates } : album
    ));
    persistAlbums(items);
}

function updatePhoto(photoId, updates) {
    const items = albums.map((album) => {
        if (album.id !== currentAlbumId) return album;
        return {
            ...album,
            photos: album.photos.map((photo) => (
                photo.id === photoId ? { ...photo, ...updates } : photo
            )),
        };
    });
    persistAlbums(items);
}

function setAlbumCover(albumId, photoId) {
    const items = albums.map((album) => {
        if (album.id !== albumId) return album;
        const coverPhoto = album.photos.find((photo) => photo.id === photoId);
        return {
            ...album,
            coverPhotoId: photoId,
            cover: coverPhoto ? (coverPhoto.thumb || coverPhoto.src) : album.cover,
        };
    });
    persistAlbums(items);
}

function movePhotoToAlbum(photoId, targetAlbumId) {
    if (!targetAlbumId || targetAlbumId === currentAlbumId) return;
    let movedPhoto = null;
    const items = albums.map((album) => {
        if (album.id !== currentAlbumId) return album;
        movedPhoto = album.photos.find((photo) => photo.id === photoId);
        return {
            ...album,
            coverPhotoId: album.coverPhotoId === photoId ? '' : album.coverPhotoId,
            photos: album.photos.filter((photo) => photo.id !== photoId),
        };
    }).map((album) => {
        if (album.id !== targetAlbumId || !movedPhoto) return album;
        return {
            ...album,
            coverPhotoId: album.coverPhotoId || movedPhoto.id,
            cover: album.cover || movedPhoto.thumb || movedPhoto.src,
            photos: [...album.photos, movedPhoto],
        };
    });
    persistAlbums(items);
}

function deletePhoto(photoId) {
    const album = albums.find((item) => item.id === currentAlbumId);
    const photo = album && album.photos.find((item) => item.id === photoId);
    if (!album || !photo || !confirm('确定要从当前相册删除这张照片吗？')) return;

    const removePhotoFromAlbums = () => {
        const items = albums.map((item) => {
            if (item.id !== currentAlbumId) return item;
            return {
                ...item,
                coverPhotoId: item.coverPhotoId === photoId ? '' : item.coverPhotoId,
                photos: item.photos.filter((candidate) => candidate.id !== photoId),
            };
        });
        persistAlbums(items);
    };

    if (photo.storagePath && albumStorage) {
        albumStorage.ref(photo.storagePath).delete()
            .catch((error) => console.warn('Failed to delete image file from storage:', error))
            .finally(removePhotoFromAlbums);
    } else {
        removePhotoFromAlbums();
    }
}

function addAlbum(title, date, description) {
    const id = `album-${Date.now()}`;
    const items = [...albums, {
        id,
        title,
        date: formatDateForAlbum(date),
        description,
        cover: '',
        coverPhotoId: '',
        photos: [],
    }];
    persistAlbums(items);
    currentAlbumId = id;
    openAlbum(id);
}

function sanitizeFileName(name) {
    return name.replace(/[^a-zA-Z0-9._-]/g, '-');
}

function getStorageService() {
    return albumStorage || (window.firebase && firebase.storage ? firebase.storage() : null);
}

function compressImage(file, maxSize = 1600, quality = 0.82) {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            reject(new Error('Only image files can be compressed.'));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                try {
                    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.max(1, Math.round(img.width * scale));
                    canvas.height = Math.max(1, Math.round(img.height * scale));
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    if (canvas.toBlob) {
                        canvas.toBlob((blob) => {
                            if (!blob) {
                                reject(new Error('Image compression failed.'));
                                return;
                            }
                            resolve(blob);
                        }, 'image/jpeg', quality);
                    } else {
                        const dataUrl = canvas.toDataURL('image/jpeg', quality);
                        resolve(dataUrlToBlob(dataUrl));
                    }
                } catch (error) {
                    reject(error);
                }
            };
            img.onerror = reject;
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const binary = atob(parts[1]);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
}

function withTimeout(promise, ms, label) {
    let timeoutId;
    const timeout = new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error(`${label} timed out`)), ms);
    });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timeoutId));
}

async function uploadCompressedFile(storagePath, file, maxSize = 1600, quality = 0.82) {
    const storage = getStorageService();
    if (!storage) throw new Error('Firebase Storage is unavailable.');
    const blob = file.size < 200 * 1024 ? file : await withTimeout(compressImage(file, maxSize, quality), 20000, 'Image compression');
    const storageRef = storage.ref(storagePath);
    await uploadWithProgress(storageRef, blob, {
        contentType: blob.type || 'image/jpeg',
        onProgress: (percent) => {
            setWishlistSyncStatus(`正在上传图片... ${Math.round(percent)}%`);
            setAlbumSyncStatus(`正在上传图片... ${Math.round(percent)}%`);
        },
    });
    return withTimeout(storageRef.getDownloadURL(), 20000, 'Download URL');
}

function uploadWithProgress(storageRef, blob, options = {}) {
    return new Promise((resolve, reject) => {
        let lastProgressAt = Date.now();
        let lastPercent = 0;
        const task = storageRef.put(blob, { contentType: options.contentType });
        const timeoutId = setInterval(() => {
            if (Date.now() - lastProgressAt > 45000) {
                clearInterval(timeoutId);
                task.cancel();
                reject(new Error(`Firebase upload stalled at ${Math.round(lastPercent)}%`));
            }
        }, 5000);

        task.on('state_changed', (snapshot) => {
            lastProgressAt = Date.now();
            lastPercent = snapshot.totalBytes ? (snapshot.bytesTransferred / snapshot.totalBytes) * 100 : 0;
            if (options.onProgress) options.onProgress(lastPercent);
        }, (error) => {
            clearInterval(timeoutId);
            reject(error);
        }, () => {
            clearInterval(timeoutId);
            resolve(task.snapshot);
        });
    });
}

function getStorageErrorMessage(error) {
    const code = error && error.code ? error.code : 'unknown';
    if (code === 'storage/unauthorized') {
        return '没有 Storage 写入权限，请检查 site/ 路径规则和当前登录 UID。';
    }
    if (code === 'storage/canceled') {
        return '上传已取消。';
    }
    if (code === 'storage/quota-exceeded') {
        return 'Storage 配额或预算限制。';
    }
    if (error && error.message && error.message.includes('timed out')) {
        return '上传超时，请检查网络或稍后重试。';
    }
    if (error && error.message && error.message.includes('stalled')) {
        return `${error.message}。Firebase Storage 请求无进展，请检查 Storage bucket 是否启用、规则和网络。`;
    }
    return `${code}`;
}

async function uploadPhotosToCurrentAlbum() {
    const album = albums.find((item) => item.id === currentAlbumId);
    const files = Array.from(albumUploadInput.files || []);
    if (!album || !albumStorage || !files.length) return;

    setAlbumSyncStatus(`正在上传 ${files.length} 张图片...`);
    const uploadedPhotos = [];

    for (const file of files) {
        const photoId = `photo-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const storagePath = `albums/${album.id}/${photoId}-${sanitizeFileName(file.name)}`;
        const url = await uploadCompressedFile(storagePath, file, 1600, 0.82);
        uploadedPhotos.push({
            id: photoId,
            src: url,
            thumb: url,
            caption: file.name.replace(/\.[^.]+$/, ''),
            storagePath,
        });
    }

    const items = albums.map((item) => {
        if (item.id !== album.id) return item;
        const photos = [...item.photos, ...uploadedPhotos];
        return {
            ...item,
            photos,
            coverPhotoId: item.coverPhotoId || (uploadedPhotos[0] && uploadedPhotos[0].id) || '',
            cover: item.cover || (uploadedPhotos[0] && uploadedPhotos[0].src) || '',
        };
    });
    albumUploadInput.value = '';
    persistAlbums(items);
}

function formatImageMeta(photo) {
    return [photo.date, photo.caption].filter(Boolean).join(' · ');
}

function showPopup(src, date, index) {
    currentImageIndex = index;
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    const imgDate = document.getElementById('imgDate');

    popup.style.display = 'block';
    popupImg.style.display = 'none';
    imgDate.innerText = '';

    const fullImg = new Image();
    fullImg.src = src;

    fullImg.onload = function () {
        popupImg.src = src;
        popupImg.style.display = 'block';
        imgDate.innerText = date;
    };

    fullImg.onerror = function () {
        imgDate.innerText = 'Load failed';
    };

    leftArrow.style.display = 'flex';
    rightArrow.style.display = 'flex';
    leftArrow.classList.toggle('disabled', currentImageIndex <= 0);
    rightArrow.classList.toggle('disabled', !loadedImages[currentImageIndex + 1]);
}

function closePopup() {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popupImg');
    const imgDate = document.getElementById('imgDate');
    popup.style.display = 'none';
    popupImg.src = '';
    imgDate.innerText = '';
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
}

function showPreviousImage() {
    const prevIndex = currentImageIndex - 1;
    if (prevIndex < 0 || !loadedImages[prevIndex]) return;
    const imgData = loadedImages[prevIndex];
    showPopup(imgData.src, formatImageMeta(imgData), prevIndex);
}

function showNextImage() {
    const nextIndex = currentImageIndex + 1;
    if (!loadedImages[nextIndex]) return;
    const imgData = loadedImages[nextIndex];
    showPopup(imgData.src, formatImageMeta(imgData), nextIndex);
}

window.addEventListener('keydown', function (event) {
    const popup = document.getElementById('popup');
    if (popup.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            closePopup();
        }
    }
});

function setupMusicPlayer() {
    const audio = document.getElementById('bgm');
    const selector = document.getElementById('bgmSelector');
    const progress = document.getElementById('bgmProgress');
    const volume = document.getElementById('bgmVolume');
    const playPauseBtn = document.getElementById('bgmPlayPause');
    const timeDisplay = document.getElementById('bgmTime');
    if (!audio || !selector || !progress || !volume || !playPauseBtn) return;
    let isPlaying = false;

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    }

    audio.src = selector.value;
    audio.volume = volume.value / 100;
    playPauseBtn.textContent = 'Play';

    document.body.addEventListener('click', () => {
        audio.play().then(() => {
            isPlaying = true;
            playPauseBtn.textContent = 'Pause';
        }).catch(() => console.log('浏览器阻止了自动播放'));
    }, { once: true });

    selector.addEventListener('change', function () {
        audio.src = this.value;
        audio.play();
        isPlaying = true;
        playPauseBtn.textContent = 'Pause';
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    volume.addEventListener('input', () => {
        audio.volume = volume.value / 100;
    });

    progress.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = audio.duration * (progress.value / 100);
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progress.value = (audio.currentTime / audio.duration) * 100;
            if (timeDisplay) {
                timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            }
        }
    });
}

window.onload = function () {
    calculateLoveDays();
    initEventStore();
    initTimelineStore();
    initSiteFeatures();
    initAlbumStore();
    initWishlistStore();
    setupMusicPlayer();

    if (globalEditToggle) {
        globalEditToggle.addEventListener('click', () => {
            setGlobalEditMode(!isEditMode);
        });
    }
    if (editModeCloseBtn) {
        editModeCloseBtn.addEventListener('click', () => {
            setGlobalEditMode(false);
        });
    }
    if (sitePublicSelect) {
        sitePublicSelect.addEventListener('change', () => {
            updatePrivacySettings({ sitePublic: sitePublicSelect.value === 'public' });
            setWishlistSyncStatus('隐私设置已更新。');
        });
    }
    privacyModuleInputs.forEach((input) => {
        input.addEventListener('change', () => {
            updatePrivacySettings({
                modules: {
                    [input.dataset.privacyModule]: input.checked,
                },
            });
            setWishlistSyncStatus('模块可见性已更新。');
        });
    });
    if (privateLoginBtn) {
        privateLoginBtn.addEventListener('click', () => {
            wishlistLoginBtn.click();
        });
    }

    document.getElementById('closeBtn').addEventListener('click', closePopup);
    leftArrow = document.getElementById('leftArrow');
    rightArrow = document.getElementById('rightArrow');
    leftArrow.addEventListener('click', showPreviousImage);
    rightArrow.addEventListener('click', showNextImage);
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';

    backToAlbumsBtn.addEventListener('click', renderAlbumFolders);

    albumForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addAlbum(
            albumTitleInput.value.trim(),
            albumDateInput.value,
            albumDescriptionInput.value.trim()
        );
        albumForm.reset();
    });

    albumSaveBtn.addEventListener('click', () => {
        updateCurrentAlbum({
            title: albumEditTitle.value.trim() || '未命名事件',
            date: formatDateForAlbum(albumEditDate.value),
            description: albumEditDescription.value.trim(),
        });
    });

    albumUploadBtn.addEventListener('click', () => {
        uploadPhotosToCurrentAlbum().catch((error) => {
            console.warn('Photo upload failed:', error);
            setAlbumSyncStatus('图片上传失败，请检查 Firebase Storage 是否已启用及规则是否允许写入。');
        });
    });

    heroCoverInput.addEventListener('change', () => {
        uploadSettingImage('heroCover', heroCoverInput.files[0], 1920).catch((error) => {
            console.warn('Hero cover upload failed:', error);
            setWishlistSyncStatus(`封面上传失败：${getStorageErrorMessage(error)}`);
        });
    });

    hisAvatarInput.addEventListener('change', () => {
        uploadSettingImage('hisAvatar', hisAvatarInput.files[0], 512).catch((error) => {
            console.warn('His avatar upload failed:', error);
            setWishlistSyncStatus(`His 头像上传失败：${getStorageErrorMessage(error)}`);
        });
    });

    herAvatarInput.addEventListener('change', () => {
        uploadSettingImage('herAvatar', herAvatarInput.files[0], 512).catch((error) => {
            console.warn('Her avatar upload failed:', error);
            setWishlistSyncStatus(`Her 头像上传失败：${getStorageErrorMessage(error)}`);
        });
    });

    mapImageInput.addEventListener('change', () => {
        loadCustomGeoJsonFile(mapImageInput.files[0]);
    });

    currentLocationBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            setMapSyncStatus('当前浏览器不支持定位。');
            return;
        }
        setMapSyncStatus('等待浏览器定位授权...');
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude.toFixed(5);
            const longitude = position.coords.longitude.toFixed(5);
            persistSiteSettings({
                currentLocation: {
                    latitude,
                    longitude,
                    label: `${latitude}, ${longitude}`,
                    updatedAt: Date.now(),
                },
            });
            setMapSyncStatus('当前位置已更新。');
        }, (error) => {
            console.warn('Geolocation failed:', error);
            setMapSyncStatus('定位失败，请确认浏览器允许位置权限。');
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
        });
    });

    capsuleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addCapsule(
            capsuleTitleInput.value.trim(),
            capsuleUnlockInput.value,
            capsuleMessageInput.value.trim()
        );
        capsuleForm.reset();
    });

    placeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addPlace(
            placeTitleInput.value.trim(),
            placeDateInput.value,
            placeLocationInput.value.trim(),
            placeStoryInput.value.trim(),
            placeStatusInput.value,
            placeColorInput.value,
            placePhotoInput.files[0]
        ).catch((error) => {
            console.warn('Failed to add place:', error);
            setMapSyncStatus('地点保存失败，请检查 Storage 或数据库规则。');
        });
        placeForm.reset();
        placeColorInput.value = '#c95f66';
    });

    timelineForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTimelineEvent(
            timelineDateInput.value,
            timelineTitleInput.value.trim(),
            timelineDescriptionInput.value.trim()
        );
        timelineForm.reset();
        setTimelineSyncStatus(timelineDbRef ? '时光轴事件已保存。' : '时光轴事件已保存在本机。');
    });

    if (eventForm) {
        eventForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addLoveEvent({
                title: eventTitleInput.value.trim(),
                date: eventDateInput.value,
                location: eventLocationInput.value.trim(),
                status: eventStatusInput.value,
                description: eventDescriptionInput.value.trim(),
                links: {
                    albumId: eventAlbumSelect.value,
                    placeId: eventPlaceSelect.value,
                    wishId: eventWishSelect.value,
                    timelineId: eventTimelineSelect.value,
                },
            });
            eventForm.reset();
            setEventSyncStatus(eventsDbRef ? '事件已保存。' : '事件已保存在本机。');
        });
    }

    timelineList.addEventListener('click', (event) => {
        const saveBtn = event.target.closest('[data-save-timeline]');
        const deleteBtn = event.target.closest('[data-delete-timeline]');

        if (saveBtn) {
            const card = saveBtn.closest('.timeline-card');
            const [dateInput, titleInput] = card.querySelectorAll('input');
            const descriptionInput = card.querySelector('textarea');
            updateTimelineEvent(saveBtn.dataset.saveTimeline, {
                date: dateInput.value,
                title: titleInput.value.trim() || '未命名事件',
                description: descriptionInput.value.trim(),
            });
            setTimelineSyncStatus('时光轴事件已更新。');
        }

        if (deleteBtn) {
            deleteTimelineEvent(deleteBtn.dataset.deleteTimeline);
            setTimelineSyncStatus('时光轴事件已删除。');
        }
    });

    wishlistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = wishTitleInput.value.trim();
        const expectedDate = wishDateInput.value;
        if (!title || !expectedDate) return;
        addWishlistItem(title, expectedDate);
        wishlistForm.reset();
    });
};
