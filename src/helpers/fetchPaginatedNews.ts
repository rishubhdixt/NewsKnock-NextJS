import axios from 'axios';
const apiDomain = 'https://newsapi.org/v2';
const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export async function fetchPaginatedNews(
  category: string = '',
  page: number = 1,
  pageSize: number = 5
) {
  try {
    const url = `${apiDomain}/top-headlines?apiKey=${apiKey}&country=us&page=${page}&pageSize=${pageSize}${
      category ? `&category=${category}` : ''
    }`;
    const response = await axios.get(url);
    console.log('Fetched News Data:', response.data.articles); // Log to ensure data is being fetched
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching paginated news:', error);
    return [];
  }
}
