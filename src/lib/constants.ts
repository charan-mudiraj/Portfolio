import { Project, Skill } from "./types";

export const fallbackUserIdEncryptionKey = "123";

export const localStorageKeys = {
  userId: "userID",
};

export const firebaseCollectionsNames = {
  backgroud: "backgroud",
  users: "users",
};

export const errorMessages = {
  userIdNotFound: "User ID not found",
  userNotFound: "User Not Found",
  userNotCreated: "Failed creating a user",
  messageNotSent: "Failed to send a message",
};

export const successMessages = {
  userNameUpdated: "Username updated successfully",
  userCreated: "New user created successfully",
  messagesSent: "Messages sent successfully",
  userFound: "User Found",
};

export const skillIconsKeywords: Record<string, Skill> = {
  javascript: {
    code: "js",
    title: "Javascript",
  },
  typescript: {
    code: "ts",
    title: "Typescript",
  },
  firebase: {
    code: "firebase",
    title: "Firebase",
  },
  html: {
    code: "html",
    title: "HTML",
  },
  nodeJS: {
    code: "nodejs",
    title: "NodeJS",
  },
  reactJS: {
    code: "react",
    title: "ReactJS",
  },
  nectJS: {
    code: "next",
    title: "NextJS",
  },
  tailwindCss: {
    code: "tailwind",
    title: "Tailwind",
  },
  css: {
    code: "css",
    title: "CSS",
  },
  bootstrap: {
    code: "bootstrap",
    title: "Bootstrap",
  },
  expressJS: {
    code: "expressjs",
    title: "ExpressJS",
  },
  materialUI: {
    code: "materialui",
    title: "Material UI",
  },
  dart: {
    code: "dart",
    title: "Dart",
  },
  flutter: {
    code: "flutter",
    title: "Flutter",
  },
  mongoDB: {
    code: "mongodb",
    title: "MongoDB",
  },
  docker: {
    code: "docker",
    title: "Docker",
  },
  aws: {
    code: "aws",
    title: "AWS(Amazon Web Services)",
  },
  c: {
    code: "c",
    title: "C Language",
  },
  java: {
    code: "java",
    title: "Java",
  },
  photoshop: {
    code: "ps",
    title: "Adobe Photoshop",
  },
};

export const projects: Project[] = [
  {
    id: 1,
    title: "<b>Chat App</b><br/>(Whatsapp Clone)",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fchat-app.png?alt=media&token=f2a1086a-bdd4-4bd1-80b0-b167db444987",
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
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fget-json.png?alt=media&token=2b202dd0-32f6-4cf9-bcbc-863e16d0cb93",
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
      skillIconsKeywords.nodeJS,
    ],
  },
  {
    id: 3,
    title: "Amazon Clone",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Famazon-clone.png?alt=media&token=46a9ef84-4b22-401b-badb-8d69dea2f4a2",
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
    type: "mobile",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fflash-chat.png?alt=media&token=afa21cc5-8669-4f93-9a48-c69e136457a6",
    youtubeVideoId: "",
    liveLink:
      "https://github.com/Charan-Mudiraj/flashchat/raw/master/output_apk/Flash%20Chat.apk",
    codeLink: "https://github.com/charan-mudiraj/Flash-Chat",
    about:
      "Flash Chat is a Real-time messaging android app connected to Firebase DB to store and fetch the latest list of messages. Fireauth to authenticate users with Signup/Login features. Applied Producer-Consumer approach for getting messages in chronological order and avoiding Read-Write conflicts.",
    stack: [
      skillIconsKeywords.flutter,
      skillIconsKeywords.dart,
      skillIconsKeywords.firebase,
    ],
  },
  {
    id: 5,
    title: "Attendance Portal",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fattendance-portal.png?alt=media&token=826ce698-3af6-4b9d-97f2-1234605375f9",
    youtubeVideoId: "",
    liveLink: "https://attendance-portal-5rtc.onrender.com/",
    codeLink: "https://github.com/charan-mudiraj/Attendance-Portal",
    about:
      "Attendance Portal is a responsive fullstack demo application were:<br/>1. Students can monitor their current attendance performance with userfriendly UI and strong input validation.<br/>2. Admins can post the attendance every day and the same may get updated into each user stats.",
    stack: [
      skillIconsKeywords.html,
      skillIconsKeywords.bootstrap,
      skillIconsKeywords.expressJS,
      skillIconsKeywords.nodeJS,
    ],
  },
  {
    id: 6,
    title: "Netflix Clone",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fnetflix-clone.jpg?alt=media&token=8ae2c3fe-8f7a-456e-8268-b6675e76fb4b",
    youtubeVideoId: "4yTfJ_uDS7U",
    liveLink: "https://netflix-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Netflix-Clone",
    about: "Simple Home page clone with autoplay video in background.",
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.tailwindCss,
      skillIconsKeywords.firebase,
    ],
  },
  {
    id: 7,
    title: "ODALS(Online Driving Assessment and Licensing Exam)",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fodals.png?alt=media&token=b0caf4bd-d195-47fa-ad2f-1131e6a52e1a",
    youtubeVideoId: "s74KGbOHtb8",
    liveLink: "https://odals.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/ODALS-frontend",
    about:
      "This web application streamlines the process of taking a driving assessment and obtaining a license online. It offers case-based input validations for seamless sign-in and sign-up. Users can take a timed 10-question exam, complete with a progress bar and real-time feedback on correct and incorrect answers. The platform allows users to view and update their profiles, and upon passing the exam, it generates a personalized driving license card.",
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.materialUI,
      skillIconsKeywords.javascript,
      skillIconsKeywords.expressJS,
      skillIconsKeywords.mongoDB,
      skillIconsKeywords.nodeJS,
    ],
  },
  {
    id: 8,
    title: "Amrutam(Healthcare E.com Store)",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Famrutam.png?alt=media&token=d5e9e766-bafc-4fa6-80bb-8a83ed7ca8eb",
    youtubeVideoId: "F-ckp7gk5Ik",
    liveLink: "https://amrutam-assignment-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/Amrutam-Pharma---Assignment",
    about: "",
    stack: [skillIconsKeywords.reactJS, skillIconsKeywords.javascript],
  },
  {
    id: 9,
    title: "News2Day(Daily News App)",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fnew-2-day.jpg?alt=media&token=00050b52-6ff8-4942-a6d8-2edefeca59c4",
    youtubeVideoId: "epSGZ8JQA2Y",
    liveLink: "https://news2day-frontend-assignment.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/News2Day-Frontend-Assignment",
    about:
      "News2Day is a comprehensive admin panel designed for managing a daily news application. It allows administrators to create news feeds with images, videos, titles, content, and categories. The platform provides tools for managing, editing, and deleting both published and draft news feeds. Admins can preview how the content will appear in a mobile view. Additionally, News2Day includes visual graphs, such as pie charts and bar graphs, to analyze performance metrics, including the most liked categories, total views and likes, and views over the past 12 months.",
    stack: [skillIconsKeywords.reactJS, skillIconsKeywords.javascript],
  },
  {
    id: 10,
    title: "Simple E.com App",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fecom.jpeg?alt=media&token=111ea079-5f80-4dd6-876a-8a3954beb7bd",
    youtubeVideoId: "",
    liveLink: "https://e-com-token-auth-frontend.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/e.com-token-auth-Frontend-",
    about:
      "The Simple Ecom Website is a streamlined e-commerce platform that integrates with an external API (dummyjson.com) for users login and products listing. Users can sign up, receive a token for authentication, and browse products fetched from the API. The platform also allows users to add products to their personal cart and search a product based on text and price range.",
    stack: [skillIconsKeywords.reactJS, skillIconsKeywords.javascript],
  },
  {
    id: 11,
    title: "Canva Editor",
    type: "web",
    imgSrc:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-4c137.appspot.com/o/projects_thumbs%2Fcanva.png?alt=media&token=4d4d5179-2f26-41d5-924b-188889b6b83a",
    youtubeVideoId: "",
    liveLink: "https://canva-by-charan.vercel.app/",
    codeLink: "https://github.com/charan-mudiraj/canva-editor",
    about:
      "Canva Editor is a user-friendly text editing tool that allows you to add and customize text widgets on a blank sheet. You can personalize the text with a variety of colors and fonts, and easily move the text widgets to any position on the canvas, giving you flexibility in designing and organizing your content.",
    stack: [skillIconsKeywords.reactJS, skillIconsKeywords.javascript],
  },
];
