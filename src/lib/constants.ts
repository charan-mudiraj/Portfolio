import {
  BlogPost,
  CaseStudy,
  Experience,
  Profile,
  Project,
  Skill,
  Testimonial,
} from "./types";

// Used for absolute URLs in link previews (metadataBase in layout.tsx).
// bio.charan-mudiraj.top stopped resolving in Nov 2026; switch back here if
// the custom domain is renewed.
export const siteUrl = "https://portfolio-charan-mudirajs-projects.vercel.app";

// Top-of-page intro. From "About Charan" in CLAUDE.md.
export const profile: Profile = {
  name: "Charan Mudiraj",
  tagline: "Full-stack developer",
  location: "Hyderabad, India",
  links: [
    {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/Charan-Mudiraj",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/charan-mudiraj-868086230",
    },
    {
      kind: "blog",
      label: "Blog",
      href: "https://code-with-charan.hashnode.dev",
    },
  ],
  // To update the resume, replace public/Charan_Mudiraj_Resume.pdf and keep
  // the same file name.
  resume: {
    href: "/Charan_Mudiraj_Resume.pdf",
    fileName: "Charan_Mudiraj_Resume.pdf",
  },
  // Country code + number, digits only (no "+", spaces or dashes).
  whatsapp: {
    number: "917993292606",
    message:
      "Hi Charan, I came across your portfolio and would like to connect.",
  },
  email: {
    address: "r.charan.m.gm@gmail.com",
    subject: "Reaching out from your portfolio",
  },
};

// Real messages from Slack, supplied by Charan as screenshots on 2026-11-10.
// Each message is word for word; some messages were left out, none reworded.
// Rudra's message originally started with "Btw ", dropped at Charan's request.
// Dates aren't shown because the screenshots don't include them.
export const testimonials: Testimonial[] = [
  {
    messages: [
      "I really like your thought process and your approach towards the problem. It doesn't matter you work on frontend or backend, you're going to be a really good engineer",
    ],
    highlight: "you're going to be a really good engineer",
    source: "Slack",
    name: "Rudra Gupta",
    role: "Co-founder",
    company: "GrowMeOrganic",
    companyLink: "https://www.linkedin.com/company/growmeorganic/",
    link: "https://www.linkedin.com/in/rudra-gupta-6381951a0/",
  },
  {
    messages: [
      "Great work",
      "And in the last couple of weeks you are able to think about corner cases and failure scenarios, which will make this system quite stable.",
      "Your logic for adding last updated time in trigger function makes sense as it will take care of all the updates",
    ],
    highlight: "able to think about corner cases and failure scenarios",
    source: "Slack",
    context: "On my fix for the dashboard's repeated Firestore reads",
    name: "Akshay Megharaj",
    role: "Co-founder",
    company: "Wuri",
    companyLink: "https://www.linkedin.com/company/wuri-ai/",
    link: "https://www.linkedin.com/in/akshay-megharaj-aba3646/",
  },
  {
    messages: [
      "So congratulations on your first deployment",
      "Great work last week",
      "This was literally completed in one week only",
    ],
    highlight: "literally completed in one week only",
    source: "Slack",
    context:
      "On the IFF24 submission site (form + landing page), built and shipped in my first week",
    name: "Akshay Megharaj",
    role: "Co-founder",
    company: "Wuri",
    companyLink: "https://www.linkedin.com/company/wuri-ai/",
    link: "https://www.linkedin.com/in/akshay-megharaj-aba3646/",
  },
];

// Drafted from the resume and the blog post; Charan to review. No numbers
// unless Charan provides them.
export const caseStudies: CaseStudy[] = [
  {
    id: "dependent-loaders",
    title: "Child routes reading data their parent hadn't loaded yet",
    context: "GrowMeOrganic · React Router",
    problem:
      "React Router runs the loaders of all matched routes at the same time. Some child loaders needed state that a parent loader sets, for example the signed-in user. On a fresh page load they read it before the parent's request had finished, and got null.",
    challenge:
      "The obvious fix is to run the loaders one after another. That works, but it turns every page load into a waterfall: the deeper the route, the longer the wait, even for loaders that don't depend on anything.",
    approach: [
      "Each route lists the loaders it depends on in its `handle`, e.g. `dependencies: [rootLoader]`.",
      "A custom `dataStrategy` still starts every loader at once, but passes each dependent loader a promise for the parent loaders it listed.",
      "The child loader awaits that promise before reading the shared state. Loaders without dependencies never wait, and on client-side navigations where the parent doesn't run again, there's nothing to wait for.",
    ],
    result:
      "Child loaders always see the data they need, and pages still load their data in parallel. Each route declares its own dependencies instead of having them wired into the loaders.",
    code: {
      caption: "Simplified from the blog post",
      snippet: `// The route declares what it depends on
{ path: "user-profile/", loader: userProfileLoader,
  handle: { dependencies: [rootLoader] } }

// dataStrategy: start every loader, but hand
// dependents their parents' promises
promises.push(
  match.resolve((callLoader) =>
    callLoader(Promise.all(parentPromises)))
);

// The child loader waits only for what it needs
async function userProfileLoader(args, parentsLoaded) {
  await parentsLoaded;
  const user = store.get(userAtom);
  // ...
}`,
    },
    link: {
      label: "Read the full write-up",
      href: "https://code-with-charan.hashnode.dev/handling-dependent-loaders-in-react-router-accessing-parent-loaders-promise-in-a-child-loader",
    },
  },
  {
    // From Charan's explanation and a screenshot of the Firestore data
    // (writers/{date}/iff24-submissions/{id}), 2026-11-10.
    id: "firestore-cache",
    title: "A dashboard that kept re-reading data that never changed",
    context: "Wuri (Y Combinator W24) · Firestore, Cloud Functions",
    problem:
      "Wuri's internal dashboard listed every IFF24 form submission from Firestore, grouped by day. Each time it opened, it read every past day's submissions again, even though older days almost never change. As the days added up, the reads went past Firebase's free limit and started costing money. The co-founder flagged the cost, and I worked out the fix on my own.",
    challenge:
      "Caching the old days would cut the reads, but a plain cache shows stale data as soon as an older submission is edited. The dashboard needed a cheap way to tell which days had actually changed, without reading their submissions.",
    approach: [
      "Gave each day's document (the parent of that day's `iff24-submissions` collection) a `lastModifiedTimestamp` field.",
      "Wrote a Cloud Function trigger that sets it to the current time whenever a submission in that day's collection is created or updated.",
      "The dashboard keeps each day's submissions in localStorage along with the timestamp it saw. On open it reads only the day documents, and fetches a day's submissions again only if its timestamp is newer than the cached one.",
    ],
    result:
      "Unnecessary reads dropped significantly, and edits to older submissions still show up, so the dashboard never shows stale data.",
    link: {
      label: "What Wuri's co-founder said about it",
      href: "#testimonials",
    },
  },
];

// From the blog's RSS feed (code-with-charan.hashnode.dev/rss.xml).
export const blogPosts: BlogPost[] = [
  {
    title:
      "Handling Dependent Loaders in React Router | Accessing Parent Loader's Promise in a Child Loader",
    date: "Nov 2024",
    href: "https://code-with-charan.hashnode.dev/handling-dependent-loaders-in-react-router-accessing-parent-loaders-promise-in-a-child-loader",
    coverImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1730419525646/ef04a3c9-9109-4a9e-88e0-c737b7545d79.png",
  },
  {
    title:
      "How to Build a Chat App / WhatsApp Clone (Technologies, Methods and Architecture)",
    date: "Apr 2024",
    href: "https://code-with-charan.hashnode.dev/how-to-build-a-chat-app",
    coverImage:
      "https://cdn.hashnode.com/res/hashnode/image/upload/v1714142124112/ab2e64ae-5ab9-452f-b097-de144660e3e2.png",
  },
];

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

// The "Technologies" row, in this order. Every icon also filters the
// projects; skills no project uses show "No projects to show" (Charan's
// choice, 2026-11-10). Order and names follow the resume's Technical Skills,
// then older skills Charan asked to keep. Keys are referenced by `projects`.
// `src` = own tile in public/skills/ (skillicons.dev has no icon for these).
export const skillIconsKeywords: Record<string, Skill> = {
  // Languages
  javascript: { code: "js", title: "JavaScript" },
  typescript: { code: "ts", title: "TypeScript" },
  python: { code: "py", title: "Python" },
  sql: { code: "sql", title: "SQL", src: "/skills/sql.svg" },
  java: { code: "java", title: "Java" },
  html: { code: "html", title: "HTML" },
  css: { code: "css", title: "CSS" },
  // Frontend
  reactJS: { code: "react", title: "React" },
  reactRouter: {
    code: "reactrouter",
    title: "React Router",
    src: "/skills/reactrouter.svg",
  },
  astro: { code: "astro", title: "Astro.js" },
  nextJS: { code: "next", title: "Next.js" },
  recoil: { code: "recoil", title: "Recoil", src: "/skills/recoil.svg" },
  tailwindCss: { code: "tailwind", title: "Tailwind CSS" },
  // Backend
  django: { code: "django", title: "Django" },
  restApis: { code: "rest", title: "REST APIs", src: "/skills/rest.svg" },
  fastApi: { code: "fastapi", title: "FastAPI" },
  nodeJS: { code: "nodejs", title: "Node.js" },
  expressJS: { code: "expressjs", title: "Express.js" },
  // Databases
  postgres: { code: "postgres", title: "PostgreSQL" },
  mongoDB: { code: "mongodb", title: "MongoDB" },
  firebase: { code: "firebase", title: "Firebase (Firestore, Cloud Functions)" },
  // Cloud & tools
  aws: { code: "aws", title: "AWS (S3, EC2, CloudFront)" },
  gcp: { code: "gcp", title: "Google Cloud Platform" },
  git: { code: "git", title: "Git" },
  github: { code: "github", title: "GitHub" },
  claudeCode: {
    code: "claude",
    title: "Claude Code",
    src: "/skills/claude.svg",
  },
  // Older skills, kept at Charan's request
  bootstrap: { code: "bootstrap", title: "Bootstrap" },
  materialUI: { code: "materialui", title: "Material UI" },
  dart: { code: "dart", title: "Dart" },
  flutter: { code: "flutter", title: "Flutter" },
  docker: { code: "docker", title: "Docker" },
  c: { code: "c", title: "C" },
  photoshop: { code: "ps", title: "Adobe Photoshop" },
};

// Newest first. Text is copied from "About Charan" in CLAUDE.md; keep the two in sync.
export const experience: Experience[] = [
  {
    company: "GrowMeOrganic",
    roles: [
      {
        title: "Frontend Developer",
        employmentType: "Full-time",
        dates: "Sep 2025 – present",
        note: "Has also worked on the Django backend since Jan 2026.",
        isCurrent: true,
      },
      {
        title: "Frontend Developer Intern",
        dates: "Sep 2024 – Aug 2025",
      },
    ],
    highlights: [
      {
        text: "Backend features in Django and PostgreSQL: reviewing UI designs, planning the architecture, writing DB migrations and REST APIs.",
      },
      {
        text: "Led the project to build an internal tool that creates and maintains designs using Claude Code.",
      },
      {
        text: "CSV upload and download that goes straight between the browser and S3, using presigned URLs.",
      },
      {
        text: "Internal React tools for tracking revenue, subscriptions and users, built on the Django backend.",
      },
      {
        text: "Pages, components and features for the main React app and the Astro.js marketing site.",
      },
      {
        text: "A custom React Router dataStrategy that lets child loaders await their parent loader's promise",
        link: {
          label: "blog post",
          href: "https://code-with-charan.hashnode.dev/handling-dependent-loaders-in-react-router-accessing-parent-loaders-promise-in-a-child-loader",
        },
      },
      {
        text: "Interviewed React intern candidates and co-led the intern team.",
      },
    ],
    // From the highlights above (Python because Django is Python). Charan to
    // confirm anything else he used here, e.g. TypeScript.
    stack: [
      skillIconsKeywords.reactJS,
      skillIconsKeywords.reactRouter,
      skillIconsKeywords.astro,
      skillIconsKeywords.python,
      skillIconsKeywords.django,
      skillIconsKeywords.restApis,
      skillIconsKeywords.postgres,
      { ...skillIconsKeywords.aws, title: "AWS S3" },
      skillIconsKeywords.claudeCode,
    ],
  },
  {
    company: "Wuri",
    companyNote: "Y Combinator W24",
    roles: [
      {
        title: "Software Developer Intern",
        dates: "Jun – Jul 2024",
      },
    ],
    highlights: [
      { text: "The only full-stack developer at the startup." },
      {
        text: "Built the IFF24 submission site (React, Firebase), which got 900+ submissions.",
      },
      { text: "Built the first company website from Figma designs." },
      { text: "Built a Firestore admin dashboard." },
      {
        text: "Wrote Firebase Cloud Functions and the Firebase-to-MongoDB migration.",
      },
    ],
    // From the highlights above and the resume ("Cloud Functions on GCP").
    stack: [
      skillIconsKeywords.reactJS,
      { ...skillIconsKeywords.firebase, title: "Firestore" },
      { ...skillIconsKeywords.firebase, title: "Firebase Cloud Functions" },
      skillIconsKeywords.gcp,
      skillIconsKeywords.mongoDB,
    ],
  },
];

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
