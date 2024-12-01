import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

// Génère les chemins pour chaque article
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

// Composant pour afficher un article
export default function BlogPost({ params: { slug } }: BlogPostProps) {
  const markdownPath = path.join(process.cwd(), "posts", `${slug}.md`);
  const markdownWithMeta = fs.readFileSync(markdownPath, "utf-8");
  const { data: frontMatter, content } = matter(markdownWithMeta);

  return (
    <div className="h-screen my-24 w-[900px] m-auto">
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <article>{content}</article>
    </div>
  );
}
