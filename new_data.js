// data.js - 存储网站的所有数据

const myLoveData = {
    // 1. 基本信息
    coupleNames: "Jack & Rose", // 你们的名字
    startDate: "2022-05-20", // 在一起的日期，格式：YYYY-MM-DD

    // 2. 时光轴数据 (按时间倒序排列，最新的在最前面)
    timelineEvents: [
        {
            date: "2023-12-25",
            title: "一起度过的第二个圣诞节 🎄",
            description: "在家里煮了热红酒，看了两部老电影，虽然哪里都没去，但是非常温馨。",
            image: "https://source.unsplash.com/random/600x400/?christmas,couple" // 替换成你的照片路径，如 "./images/xmas2023.jpg"
        },
        {
            date: "2023-07-10",
            title: "第一次长途旅行 - 云南",
            description: "在洱海边骑行，虽然晒黑了两个度，但是风景真的太美了！",
            image: "https://source.unsplash.com/random/600x400/?travel,yunnan"
        },
        {
            date: "2022-05-20",
            title: "我们在一起啦！❤",
            description: "在那个有点紧张的夜晚，我们确认了彼此的心意。是故事的开始。",
            // 如果某个事件没有照片，可以不写 image 这一行
        }
    ],

    // 3. 影像馆照片链接
    galleryImages: [
        {
            src: "https://source.unsplash.com/random/400x400/?couple,smile", // 替换成你的照片路径
            caption: "傻笑的我们"
        },
        {
            src: "https://source.unsplash.com/random/400x400/?food,date",
            caption: "纪念日大餐"
        },
        {
            src: "https://source.unsplash.com/random/400x400/?holdinghands",
            caption: "牵手手"
        },
         {
            src: "https://source.unsplash.com/random/400x400/?cat",
            caption: "以后要养的猫"
        }
    ],

    // 4. 愿望清单 (completed: true 表示已完成，false 表示未完成)
    bucketList: [
        { task: "一起去看一场演唱会", completed: true },
        { task: "学会做一道对方最爱吃的菜", completed: false },
        { task: "去冰岛看极光", completed: false },
        { task: "拥有一个属于我们的小窝", completed: false },
        { task: "每年拍一套纪念照片", completed: true }
    ]
};