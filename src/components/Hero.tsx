import React from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-32 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Stay Informed, Stay Ahead<br />
          <span className="text-red-600">News that Matters. Reels that Engage.</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          NewsKnock brings you lightning-fast news updates and short-form video reels — all curated by category and designed for your lifestyle.
          No noise. Just what you care about.
        </p>

        <ul className="text-gray-600 mb-10 max-w-2xl mx-auto text-sm sm:text-base space-y-2">
          <li>✔ Curated news by category: Business, Health, Sports, Tech & more</li>
          <li>✔ Short-form reels for quick updates on trending topics</li>
          <li>✔ Personalized experience based on your interests</li>
        </ul>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/signup">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-base font-medium shadow-lg hover:shadow-xl transition duration-300">
              🔥 Get Started — It's Free
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-white text-red-600 border border-red-600 px-8 py-3 rounded-full text-base font-medium hover:bg-red-50 transition duration-300">
              Already a member? Login
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
