'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaArrowRight, FaPlay, FaPause, FaBookOpen, FaInfoCircle, FaDownload, FaShare, FaVolumeUp, FaUserAlt, FaExchangeAlt } from 'react-icons/fa';
import { getAvailableReciters, getSurahAudio } from '../../services/quranService';

export default function SurahPage({ params }) {
  // استخدام React.use لفك الـ Promise الخاص بالـ params
  const unwrappedParams = use(params);
  const surahId = unwrappedParams.surahId;
  
  const [surah, setSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState('');
  const [audioElement, setAudioElement] = useState(null);
  const [activeAyah, setActiveAyah] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [reciters, setReciters] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState('ar.alafasy');
  const [showReciterSelector, setShowReciterSelector] = useState(false);
  const [ayahAudios, setAyahAudios] = useState({});
  const [playingAyah, setPlayingAyah] = useState(null);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        // Fetch surah metadata
        const surahResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
        setSurah(surahResponse.data.data);
        
        // Fetch ayahs with Arabic text
        const ayahsResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}/${selectedReciter}`);
        setAyahs(ayahsResponse.data.data.ayahs);
        
        // Set audio source for full surah
        setAudioSrc(`https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${surahId}.mp3`);
        
        // Fetch available reciters
        const availableReciters = await getAvailableReciters();
        setReciters(availableReciters);
        
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
  }, [surahId, selectedReciter]);

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

  const handleAyahClick = (ayah) => {
    // إذا كان هناك آية قيد التشغيل، قم بإيقافها
    if (playingAyah) {
      const currentAudio = new Audio();
      currentAudio.pause();
      if (playingAyah === ayah.number) {
        setPlayingAyah(null);
        return;
      }
    }

    // تشغيل الآية المحددة
    const ayahAudio = new Audio();
    ayahAudio.src = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayah.number}.mp3`;
    ayahAudio.onended = () => {
      setPlayingAyah(null);
    };
    ayahAudio.play().catch(e => console.error('Error playing ayah audio:', e));
    setPlayingAyah(ayah.number);
    setActiveAyah(ayah.numberInSurah);
  };

  const changeReciter = (reciterId) => {
    setSelectedReciter(reciterId);
    setShowReciterSelector(false);
    // إيقاف أي صوت قيد التشغيل
    if (audioPlaying) {
      audioElement.pause();
      setAudioPlaying(false);
    }
    if (playingAyah) {
      setPlayingAyah(null);
    }
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
              <div className="relative">
                <button 
                  onClick={() => setShowReciterSelector(!showReciterSelector)} 
                  className="btn flex items-center gap-2 bg-primary-light bg-opacity-20 text-primary hover:bg-primary-light hover:bg-opacity-30"
                >
                  <FaUserAlt />
                  {reciters.find(r => r.identifier === selectedReciter)?.name || 'مشاري العفاسي'}
                  <FaExchangeAlt className="mr-1" />
                </button>
                
                {showReciterSelector && (
                  <div className="absolute z-50 mt-2 w-64 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 left-0">
                    <div className="p-2 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-bold text-primary">اختر القارئ</h3>
                    </div>
                    <ul className="py-2">
                      {reciters.map((reciter) => (
                        <li 
                          key={reciter.identifier} 
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedReciter === reciter.identifier ? 'bg-primary-light bg-opacity-10 text-primary font-bold' : ''}`}
                          onClick={() => changeReciter(reciter.identifier)}
                        >
                          {reciter.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
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
                >
                  <div className="flex justify-between items-center">
                    <span className="quran-text text-right">{ayah.text}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleAyahClick(ayah)} 
                        className={`p-2 rounded-full ${playingAyah === ayah.number ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                        title="استماع للآية"
                      >
                        {playingAyah === ayah.number ? <FaPause size={14} /> : <FaPlay size={14} />}
                      </button>
                      <span className="inline-block p-1 bg-gradient-to-br from-primary to-primary-light text-white rounded-full w-8 h-8 text-center text-sm shadow-sm">
                        {ayah.numberInSurah}
                      </span>
                    </div>
                  </div>
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