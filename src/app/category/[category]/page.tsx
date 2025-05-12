'use client';

import { useState, useEffect } from 'react';
import { fetchTopHeadlines } from '@/helpers/fetchNews';
import NewsCard from '@/components/NewsCard';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const [category, setCategory] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      const resolvedParams = await params;
      setCategory(resolvedParams.category);
    };

    getCategory();
  }, [params]);

  useEffect(() => {
    if (category) {
      const fetchNews = async () => {
        setLoading(true);
        try {
          const data = await fetchTopHeadlines(category);
          setNews(data);
        } catch (error) {
          console.error('Error fetching news:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNews();
    }
  }, [category]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (news.length === 0) {
    return <div className="text-center text-white">No news available for this category.</div>;
  }

  return (
    <div className="p-6 space-y-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center">{category} News</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item: any, index: number) => (
          <NewsCard
            key={index}
            id={String(index)}
            title={item.title}
            description={item.description}
            imageUrl={item.urlToImage}
            sourceUrl={item.url} // ✅ use the actual article URL
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
