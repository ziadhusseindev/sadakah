'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaArrowRight, FaPlay, FaPause, FaBookOpen, FaInfoCircle, FaDownload, FaShare } from 'react-icons/fa';

export default function SurahPage({ params }) {
  const { surahId } = params;
  const [surah, setSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [audioElement, setAudioElement] = useState(null);
  const [activeAyah, setActiveAyah] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        // Fetch surah metadata
        const surahResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
        setSurah(surahResponse.data.data);
        
        // Fetch ayahs with Arabic text
        const ayahsResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`);
        setAyahs(ayahsResponse.data.data.ayahs);
        
        // Set audio source
        setAudioSrc(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahId}.mp3`);
        
        setLoading(false);
        setTimeout(() => setFadeIn(true), 100);
      } catch (err) {
        setError('حدث خطأ أثناء تحميل بيانات السورة. يرجى المحاولة مرة أخرى.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchSurah();
    
    // Initialize audio element
    const audio = new Audio();
    audio.addEventListener('ended', () => {
      setAudioPlaying(false);
      setActiveAyah(null);
    });
    
    setAudioElement(audio);
    
    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
        audio.removeEventListener('ended', () => {
          setAudioPlaying(false);
          setActiveAyah(null);
        });
      }
    };
  }, [surahId]);

  const toggleAudio = () => {
    if (!audioElement) return;
    
    if (audioPlaying) {
      audioElement.pause();
      setActiveAyah(null);
    } else {
      audioElement.src = audioSrc;
      audioElement.play().catch(e => console.error('Error playing audio:', e));
      setActiveAyah(1); // Start with first ayah
    }
    
    setAudioPlaying(!audioPlaying);
  };

  const handleAyahClick = (ayahNumber) => {
    // In a real implementation, we would seek to the specific ayah
    // For now, we'll just highlight it
    setActiveAyah(ayahNumber);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-lg">جاري تحميل السورة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        <p className="text-xl mb-6">{error}</p>
        <Link href="/quran" className="btn btn-primary inline-flex items-center gap-2">
          <FaArrowRight /> العودة إلى قائمة السور
        </Link>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
      {surah && (
        <>
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/quran" className="flex items-center text-primary hover:underline">
              <FaArrowRight className="ml-2" /> العودة إلى قائمة السور
            </Link>
            <div className="flex gap-3">
              <button 
                onClick={toggleAudio} 
                className="btn btn-primary flex items-center gap-2"
                aria-label={audioPlaying ? 'إيقاف الاستماع' : 'الاستماع للسورة'}
              >
                {audioPlaying ? <FaPause /> : <FaPlay />}
                {audioPlaying ? 'إيقاف' : 'استماع'}
              </button>
              <button className="btn flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                <FaShare />
                مشاركة
              </button>
            </div>
          </div>

          <div className="card mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {surah.number}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3">{surah.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">{surah.englishName}</p>
            <div className="flex justify-center gap-4 text-sm">
              <span className="bg-primary-light bg-opacity-10 text-primary px-3 py-1 rounded-full">
                {surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}
              </span>
              <span className="bg-primary-light bg-opacity-10 text-primary px-3 py-1 rounded-full">
                {surah.numberOfAyahs} آية
              </span>
            </div>
          </div>

          <div className="card arabic-text text-right">
            <div className="bismillah text-center mb-8 text-2xl">
              {surah.number !== 9 && 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
            </div>
            
            <div className="ayahs space-y-6">
              {ayahs.map((ayah) => (
                <div 
                  key={ayah.number} 
                  className={`leading-loose p-3 rounded-lg transition-all ${
                    activeAyah === ayah.numberInSurah 
                      ? 'bg-primary-light bg-opacity-10 border-r-4 border-primary' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                  onClick={() => handleAyahClick(ayah.numberInSurah)}
                >
                  <span>{ayah.text}</span>
                  <span className="inline-block mr-2 p-1 bg-gradient-to-br from-primary to-primary-light text-white rounded-full w-8 h-8 text-center text-sm shadow-sm">
                    {ayah.numberInSurah}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            {surah.number > 1 && (
              <Link 
                href={`/quran/${surah.number - 1}`}
                className="btn flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                السورة السابقة
              </Link>
            )}
            {surah.number < 114 && (
              <Link 
                href={`/quran/${surah.number + 1}`}
                className="btn flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                السورة التالية
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
} 