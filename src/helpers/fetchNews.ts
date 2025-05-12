import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const apiDomain = process.env.NEXT_PUBLIC_NEWS_API_DOMAIN;

const mockArticles = [
  {
    source: { id: null, name: "Freerepublic.com" },
    author: "Frontpage mag",
    title: "Fact Check: AP Falsely Claims Few Americans Believe in Communism",
    description: "\"There are very, very few people in the West who seriously believe that\"...",
    url: "https://freerepublic.com/focus/f-news/4315082/posts",
    urlToImage: null,
    publishedAt: "2025-05-05T10:31:25Z",
    content: "Fact Check full article content here...",
  },
  {
    source: { id: null, name: "Paul Tan's Automotive News" },
    author: "Mick Chan",
    title: "Zeekr 7X EV to be previewed in Malaysia this week",
    description: "The Zeekr 7X will be previewed at the upcoming Malaysia Autoshow...",
    url: "https://paultan.org/2025/05/05/zeekr-7x-ev...",
    urlToImage: "https://paultan.org/image/2025/03/2025_BIMS_Zeekr_7X-1-1200x801.jpg",
    publishedAt: "2025-05-05T10:31:01Z",
    content: "Zeekr preview content...",
  },
  {
    source: { id: "financial-post", name: "Financial Post" },
    author: "Martin Pelletier",
    title: "As tariffs threaten market stability and corporate profits...",
    description: "Martin Pelletier: With low growth, higher interest rates and trade uncertainty...",
    url: "https://financialpost.com/investing/as-tariffs-threaten...",
    urlToImage: "https://smartcdn.gprod.postmedia.digital/financialpost/wp-content/uploads/2025/05/0503-mg-stocks.jpg",
    publishedAt: "2025-05-05T10:00:48Z",
    content: "Market impact content...",
  },
  {
    source: { id: null, name: "CNBC" },
    author: null,
    title: "Inside GM’s decade-long battle to revive Cadillac...",
    description: "Here's how the brand is trying to get its portfolio back into shape...",
    url: "https://www.cnbc.com/2025/05/05/gm-general-motors-cadillac-luxury-brand.html",
    urlToImage: "https://image.cnbcfm.com/api/v1/image/107283877-1691591016525-IMG_7488.JPG?v=1691606946&w=1920&h=1080",
    publishedAt: "2025-05-05T10:00:01Z",
    content: "Cadillac revival details...",
  },
  {
    source: { id: "the-times-of-india", name: "The Times of India" },
    author: "ET Online",
    title: "Does Elon Musk regret supporting Donald Trump?",
    description: "During a recent Fox News interview...",
    url: "https://economictimes.indiatimes.com/news/international/...",
    urlToImage: "https://img.etimg.com/thumb/msid-120895674,width-1200,height-630,imgsize-1438895,overlay-economictimes/articleshow.jpg",
    publishedAt: "2025-05-05T09:22:52Z",
    content: "Musk-Trump interview content...",
  },
  {
    source: { id: null, name: "Biztoc.com" },
    author: "barrons.com",
    title: "Tesla Stock Is Falling. It’s Still Going for Three Straight Weekly Gains",
    description: "",
    url: "https://biztoc.com/x/e4a93b2ce5009aba",
    urlToImage: "https://biztoc.com/cdn/e4a93b2ce5009aba_s.webp",
    publishedAt: "2025-05-05T09:19:46Z",
    content: "Tesla stock movement summary...",
  },
];

export async function fetchTopHeadlines(category: string = '') {
  try {
    // ✅ Mocked data for development (prevents API exhaustion)
    // return mockArticles;

    // 🛑 Commented out production fetch
    
    const url = `${apiDomain}/top-headlines?apiKey=${apiKey}&country=us${
      category ? `&category=${category}` : ''
    }`;
    const response = await axios.get(url);
    return response.data.articles;
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}