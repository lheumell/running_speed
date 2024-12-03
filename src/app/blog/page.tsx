import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Card from "../components/Card";

const getPosts = () => {
  const files = fs.readdirSync(path.join(process.cwd(), "posts")); // Corrige le chemin ici
  return files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join(process.cwd(), "posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug: filename.replace(".md", ""),
      title: frontMatter.title,
    };
  });
};

export default function Blog() {
  const posts = getPosts();

  return (
    <div className="h-screen my-24 w-[1200px] m-auto">
      <h1 className="font-bold text-[48px] pb-12 text-run-800">
        Blog course à pied
      </h1>
      <ul className="grid grid-cols-4 gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Card title={post.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
