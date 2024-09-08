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

async function fetchReadme(repoURL: string) {
  const parsedURL = new URL(repoURL);
  const path = parsedURL.pathname.substring(1);
  const url = `https://raw.githubusercontent.com/${path}/main/README.md`; // readme from `main` branch
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch README.md");
  return await response.text(); // Return the raw Markdown
}

function convertMarkdownToHtml(markdownContent: string) {
  return marked(markdownContent);
}

export async function getProjectContent(repoURL: string) {
  const projectContentInMarkDown = await fetchReadme(repoURL);
  const projectContentInHTML = await convertMarkdownToHtml(
    projectContentInMarkDown
  );
  return projectContentInHTML;
}
