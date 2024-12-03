import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

// Génère les chemins statiques pour chaque article
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

// Composant pour afficher un article
export default async function BlogPost({ params }: BlogPostProps) {
  const resolvedParams = await params; // Résout la promesse
  const { slug } = resolvedParams;

  if (!slug) {
    notFound(); // Renvoie une page 404 si `slug` est introuvable
  }

  // Chemin vers le fichier Markdown
  const markdownPath = path.join(process.cwd(), "posts", `${slug}.md`);

  // Vérifie si le fichier existe
  if (!fs.existsSync(markdownPath)) {
    notFound(); // Génère une page 404 si l'article n'existe pas
  }

  // Lit et analyse le contenu du fichier Markdown
  const markdownWithMeta = fs.readFileSync(markdownPath, "utf-8");
  const { data: frontMatter, content } = matter(markdownWithMeta);

  return (
    <div className="h-min-screen my-24 w-[900px] m-auto">
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
