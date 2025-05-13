import axios from 'axios';

const apiDomain = 'https://newsapi.org/v2';
const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function fetchPaginatedNews(
  category: string = '',
  page: number = 1,
  pageSize: number = 5
) {
  try {
    const url = `${apiDomain}/top-headlines?country=us&page=${page}&pageSize=${pageSize}${
      category ? `&category=${category}` : ''
    }&apiKey=${apiKey}`;

    const response = await axios.get(url);
    if (response.data?.articles?.length) {
      return response.data.articles;
    } else {
      console.warn('Empty articles array returned.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching paginated news:', error);
    return [];
  }
}
