import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked } from "marked";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cropPhoto = (imageUrl: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Allow loading images from different origins
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const minSize = Math.min(img.width, img.height);
      const squareSize = 200;
      const x = (img.width - minSize) / 2;
      const y = (img.height - minSize) / 2;
      canvas.width = squareSize;
      canvas.height = squareSize;
      ctx?.drawImage(img, x, y, minSize, minSize, 0, 0, squareSize, squareSize);

      const croppedPhotoSrc = canvas.toDataURL();
      resolve(croppedPhotoSrc);
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = imageUrl;
  });
};

async function fetchReadme(path: string, branch = "main") {
  const url = `https://raw.githubusercontent.com/${path}/${branch}/README.md`;
  const response = await fetch(url);
  if (!response.ok) {
    if (branch === "master") {
      throw new Error("Failed to fetch README.md");
    } else {
      return await fetchReadme(path, "master");
    }
  }
  const projectContentInMarkDown = await response.text(); // Raw Markdown
  let projectContentInHTML = await marked(projectContentInMarkDown);
  projectContentInHTML = projectContentInHTML
    .replace(
      /src="\.\//g,
      `src="https://raw.githubusercontent.com/${path}/${branch}/`
    )
    .replace(/height="(\d+px)"/g, 'style="height:$1"')
    .replace(/width="(\d+px)"/g, 'style="width:$1"');
  return projectContentInHTML;
}

export async function getProjectContent(repoURL: string) {
  const parsedURL = new URL(repoURL);
  const path = parsedURL.pathname.substring(1);
  const projectContent = await fetchReadme(path);
  return projectContent;
}

export const getUniqueID = () => {
  const date = new Date();
  // 16-digit ID
  const id =
    date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0") +
    date.getHours().toString().padStart(2, "0") +
    date.getMinutes().toString().padStart(2, "0") +
    date.getSeconds().toString().padStart(2, "0") +
    date.getMilliseconds().toString().substring(0, 2);

  return id;
};

export const getCurrentTime = () => {
  const date = new Date();
  // 07:57 PM
  const period = date.getHours() < 12 ? "AM" : "PM";
  const hours = date.getHours() % 12 || 12;
  const time =
    hours + ":" + date.getMinutes().toString().padStart(2, "0") + " " + period;
  return time;
};
