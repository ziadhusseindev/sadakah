'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaQuran, FaBookOpen, FaFilter, FaArrowRight } from 'react-icons/fa';
import { getSurahs } from '../services/quranService';

export default function QuranIndex() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'meccan', 'medinan'
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const surahsData = await getSurahs();
        setSurahs(surahsData);
        setLoading(false);
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل قائمة السور. يرجى المحاولة مرة أخرى.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(surah => {
    const matchesSearch = 
      surah.name.includes(searchTerm) || 
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.number.toString().includes(searchTerm);
    
    const matchesFilter = 
      filterType === 'all' || 
      (filterType === 'meccan' && surah.revelationType === 'Meccan') ||
      (filterType === 'medinan' && surah.revelationType === 'Medinan');
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-lg">جاري تحميل قائمة السور...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        <p className="text-xl mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary inline-flex items-center gap-2"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">القرآن الكريم</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          اقرأ القرآن الكريم كاملاً مع إمكانية الاستماع إلى تلاوات بأصوات مختلفة للقراء
        </p>
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="ابحث عن اسم السورة أو رقمها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setFilterType('all')} 
            className={`btn ${filterType === 'all' ? 'btn-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilterType('meccan')} 
            className={`btn ${filterType === 'meccan' ? 'btn-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            مكية
          </button>
          <button 
            onClick={() => setFilterType('medinan')} 
            className={`btn ${filterType === 'medinan' ? 'btn-primary' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            مدنية
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSurahs.map((surah) => (
          <Link 
            key={surah.number} 
            href={`/quran/${surah.number}`}
            className="surah-card card hover:border-primary group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-lg font-bold shadow-md">
                {surah.number}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{surah.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{surah.englishName}</p>
              </div>
              <FaArrowRight className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <span className="bg-primary-light bg-opacity-10 text-primary px-2 py-1 rounded-full">
                {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
              </span>
              <span className="bg-primary-light bg-opacity-10 text-primary px-2 py-1 rounded-full">
                {surah.numberOfAyahs} آية
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <FaQuran className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-400">لا توجد نتائج مطابقة للبحث</p>
        </div>
      )}
    </div>
  );
} 