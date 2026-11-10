import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "../lib/constants";
import { card, mutedText } from "./styles";

export function Writing() {
  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="w-full scroll-mt-20"
    >
      <h2 id="writing-heading" className="text-2xl">
        Writing
      </h2>
      <p className={`mt-1 text-sm ${mutedText}`}>From my blog on Hashnode.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:px-5">
        {blogPosts.map((post) => (
          <li key={post.href} className="reveal">
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-full flex-col overflow-hidden transition-colors hover:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 dark:hover:border-zinc-300 ${card}`}
            >
              <img
                src={post.coverImage}
                alt=""
                loading="lazy"
                className="aspect-[1.91/1] w-full border-b border-zinc-500 object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className={`text-xs ${mutedText}`}>{post.date}</p>
                <h3 className="mt-1 leading-6 group-hover:underline">
                  {post.title}
                </h3>
                <span className="mt-auto inline-flex items-center pt-3 text-sm text-purple-700 dark:text-primary-color">
                  Read the post
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
