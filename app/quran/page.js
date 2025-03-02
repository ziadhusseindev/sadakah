'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaSearch, FaBook, FaQuran, FaStar } from 'react-icons/fa';

export default function QuranPage() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        setSurahs(response.data.data);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السور. يرجى المحاولة مرة أخرى.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(surah => 
    surah.name.includes(searchTerm) || 
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.number.toString().includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          القرآن الكريم
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          اقرأ القرآن الكريم كاملاً مع إمكانية الاستماع إلى تلاوة الشيخ مشاري العفاسي
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="mb-12 max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث عن سورة..."
            className="w-full p-4 pr-12 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch size={18} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-lg">جاري تحميل السور...</p>
        </div>
      ) : error ? (
        <div className="text-center py-16 text-red-500">
          <p className="text-xl">{error}</p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
          {filteredSurahs.map((surah) => (
            <Link 
              href={`/quran/${surah.number}`} 
              key={surah.number}
              className="card surah-card hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white ml-3 shadow-md">
                    {surah.number}
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">{surah.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{surah.englishName}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm bg-primary-light bg-opacity-10 text-primary px-2 py-1 rounded-full mb-1">
                    {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <FaStar className="text-accent ml-1" size={12} />
                    <span className="text-sm">{surah.numberOfAyahs} آية</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && !error && filteredSurahs.length === 0 && (
        <div className="text-center py-16">
          <FaQuran size={48} className="text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-xl">لا توجد نتائج مطابقة للبحث</p>
        </div>
      )}
    </div>
  );
} 