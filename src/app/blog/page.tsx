import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

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
    <div className="h-screen my-24 w-[900px] m-auto">
      <h1>Blog sur la course à pied</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <div>{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
