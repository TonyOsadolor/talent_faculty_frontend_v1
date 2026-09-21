import { ChevronRight } from "lucide-react";

const articles = [
  "How to submit an assignment",
  "How to take an assessment",
  "How to download a certificate",
  "How to track my progress",
  "How to change my password",
];

const ArticleList = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-black mb-5">
        Popular Articles
      </h2>

      <div className="space-y-4">
        {articles.map((article) => (
          <button
            key={article}
            className="flex items-center gap-3 text-green-700 hover:text-green-800 transition"
          >
            <ChevronRight size={16} />
            <span className="text-sm">{article}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;