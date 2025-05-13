// app/[category]/page.tsx

import { fetchTopHeadlines } from '@/helpers/fetchNews';
import NewsCard from '@/components/NewsCard';
import { NewsArticle } from '@/types/news';

interface CategoryPageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category;
  const news: NewsArticle[] = await fetchTopHeadlines(category);

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 sm:p-10 overflow-hidden text-white">
      {/* Decorative blurred circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-red-100 rounded-full filter blur-2xl opacity-30 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-10 border-l-8 border-red-500 pl-4 shadow-sm capitalize">
          {category} News
        </h1>

        {news.length === 0 ? (
          <div className="text-center text-white text-lg">No news available for this category.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <NewsCard
                key={index}
                id={String(index)}
                title={item.title}
                description={item.description ?? ''}
                imageUrl={item.urlToImage ?? ''}
                sourceUrl={item.url}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
