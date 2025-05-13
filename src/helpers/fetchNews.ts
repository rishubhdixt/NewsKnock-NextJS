// helpers/fetchNews.ts
import axios from 'axios';
import { NewsArticle } from '@/types/news';

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const apiDomain = process.env.NEXT_PUBLIC_NEWS_API_DOMAIN;

export async function fetchTopHeadlines(category: string = ''): Promise<NewsArticle[]> {
  try {
    const url = `${apiDomain}/top-headlines?apiKey=${apiKey}&country=us${
      category ? `&category=${category}` : ''
    }`;
    const response = await axios.get<{ articles: NewsArticle[] }>(url);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}
