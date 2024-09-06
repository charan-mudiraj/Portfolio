const skillIconsKeywords = {
  javascript: "js",
  typescript: "ts",
  firebase: "firebase",
  html: "html",
  nodeJS: "nodejs",
  reactJS: "react",
  nectJS: "next",
  tailwindCss: "tailwind",
  css: "css",
  bootstrap: "bootstrap",
  expressJS: "express",
  materialUI: "materialui",
  dart: "dart",
  flutter: "flutter",
  mongoDB: "mongodb",
  docker: "docker",
  aws: "aws",
  c: "c",
  java: "java",
  photoshop: "ps",
};

export const projects = [
  {
    id: 1,
    title: "<b>Chat App</b><br/>(Whatsapp Clone)",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/chat-app.png?alt=media&token=4e378e43-1e1a-4966-b738-d3bf3ea819e4",
    youtubeVideoId: "5_Ouh0Q_aQo",
    liveLink: "https://chat-app-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Chat-App",
    about:
      "A <b>Chatting Web Application</b> similar to <b>WhatsApp</b> where users can share messages, images, videos, and any other files with a single (or) multiple recipients and make calls (Audio/Video) with P2P WebRTC Connection.",
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.typescript,
      skillIconsKeywords.firebase,
      skillIconsKeywords.tailwindCss,
    ],
  },
  {
    id: 2,
    title: "Get JSON<br/>(Web Scraper)",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/get-json.png?alt=media&token=58b0e6f2-a7d3-4cfe-a89a-be6a14b854c1",
    youtubeVideoId: "XYSKLEEvNYc",
    liveLink: "https://getjson.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Get-JSON---Frontend",
    about:
      '"Get JSON" is a simple web-scraping tool which provides JSON data from web-pages, required for your project. Thereby saving tons of copy-pasting time.',
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.css,
      skillIconsKeywords.expressJS,
      skillIconsKeywords.javascript,
    ],
  },
  {
    id: 3,
    title: "Amazon Clone",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/amazon-clone.png?alt=media&token=7946323b-39b0-42ba-b27d-6e3a4a056466",
    youtubeVideoId: "i4AHrKErNyk",
    liveLink: "https://amazon-clone-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Amazon-Clone",
    about:
      "Pixel Perfect and Fully Component based React Application. Similar to official Amazon",
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.css,
      skillIconsKeywords.javascript,
    ],
  },
  {
    id: 4,
    title: "Flash Chat",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/flash-chat.png?alt=media&token=23172113-a8ab-41c3-b6f4-0ef165c0de65",
    youtubeVideoId: "",
    liveLink:
      "https://github.com/Charan-Mudiraj/flashchat/raw/master/output_apk/Flash%20Chat.apk",
    codeLink: "https://github.com/charan-mudiraj/Flash-Chat",
    about:
      "Flash Chat is a Real-time messaging android app connected to Firebase DB to store and fetch the latest list of messages. Fireauth to authenticate users with Signup/Login features. Applied Producer-Consumer approach for getting messages in chronological order and avoiding Read-Write conflicts.",
    stack: [skillIconsKeywords.dart, skillIconsKeywords.firebase],
  },
  {
    id: 5,
    title: "Attendance Portal",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/attendance-portal.png?alt=media&token=6702133a-1d60-407d-a077-9a8664d9e9ec",
    youtubeVideoId: "",
    liveLink: "https://attendance-portal-5rtc.onrender.com/",
    codeLink: "https://github.com/charan-mudiraj/Attendance-Portal",
    about:
      "Attendance Portal is a responsive fullstack demo application were:<br/>1. Students can monitor their current attendance performance with userfriendly UI and strong input validation.<br/>2. Admins can post the attendance every day and the same may get updated into each user stats.",
    stack: [
      skillIconsKeywords.html,
      skillIconsKeywords.bootstrap,
      skillIconsKeywords.expressJS,
    ],
  },
  {
    id: 6,
    title: "Netflix Clone",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/netflix-clone.jpg?alt=media&token=815c74a1-578a-4af5-831e-7f9728b9de97",
    youtubeVideoId: "",
    liveLink: "https://netflix-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Netflix-Clone",
    about: "",
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.tailwindCss,
      skillIconsKeywords.firebase,
    ],
  },
];
