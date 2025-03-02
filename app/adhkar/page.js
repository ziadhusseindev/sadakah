'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaMosque, FaHome, FaCheck, FaRedo, FaHeart, FaBookmark, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

// Sample data for adhkar categories
const adhkarCategories = [
  { 
    id: 'morning', 
    name: 'أذكار الصباح', 
    icon: <FaSun className="text-yellow-500" />,
    description: 'الأذكار التي تقال في الصباح بعد صلاة الفجر إلى طلوع الشمس',
    count: 22
  },
  { 
    id: 'evening', 
    name: 'أذكار المساء', 
    icon: <FaMoon className="text-indigo-500" />,
    description: 'الأذكار التي تقال في المساء بعد صلاة العصر إلى غروب الشمس',
    count: 21
  },
  { 
    id: 'prayer', 
    name: 'أذكار بعد الصلاة', 
    icon: <FaMosque className="text-green-600" />,
    description: 'الأذكار التي تقال بعد الانتهاء من الصلوات المفروضة',
    count: 15
  },
  { 
    id: 'home', 
    name: 'أذكار المنزل', 
    icon: <FaHome className="text-blue-500" />,
    description: 'الأذكار المتعلقة بدخول المنزل والخروج منه والنوم والاستيقاظ',
    count: 18
  },
];

// Sample data for morning adhkar
const morningAdhkar = [
  {
    id: 1,
    text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    fadl: 'من قالها حين يصبح أجير من الجن حتى يمسي ومن قالها حين يمسي أجير من الجن حتى يصبح.',
    count: 1,
    source: 'رواه الحاكم'
  },
  {
    id: 2,
    text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    fadl: 'من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء.',
    count: 3,
    source: 'رواه أبو داود والترمذي'
  },
  {
    id: 3,
    text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    fadl: 'من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء.',
    count: 3,
    source: 'رواه أبو داود والترمذي'
  },
  {
    id: 4,
    text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    fadl: 'من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء.',
    count: 3,
    source: 'رواه أبو داود والترمذي'
  },
  {
    id: 5,
    text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَـهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ',
    fadl: 'من قالها في المساء قال: أمسينا وأمسى الملك لله.',
    count: 1,
    source: 'رواه مسلم'
  },
];

export default function AdhkarPage() {
  const [activeCategory, setActiveCategory] = useState('morning');
  const [adhkar, setAdhkar] = useState([]);
  const [completedAdhkar, setCompletedAdhkar] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch the adhkar data based on the active category
    // For now, we'll just use our sample data
    setAdhkar(morningAdhkar);
    
    // Load completed adhkar from localStorage
    const savedCompletedAdhkar = localStorage.getItem('completedAdhkar');
    if (savedCompletedAdhkar) {
      setCompletedAdhkar(JSON.parse(savedCompletedAdhkar));
    }
    
    setTimeout(() => setFadeIn(true), 100);
  }, [activeCategory]);

  useEffect(() => {
    // Save completed adhkar to localStorage
    localStorage.setItem('completedAdhkar', JSON.stringify(completedAdhkar));
  }, [completedAdhkar]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100);
  };

  const toggleAdhkarCompletion = (adhkarId) => {
    setCompletedAdhkar(prev => {
      const key = `${activeCategory}-${adhkarId}`;
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const resetCompletedAdhkar = () => {
    // Only reset the current category
    const newCompletedAdhkar = { ...completedAdhkar };
    Object.keys(newCompletedAdhkar).forEach(key => {
      if (key.startsWith(`${activeCategory}-`)) {
        delete newCompletedAdhkar[key];
      }
    });
    setCompletedAdhkar(newCompletedAdhkar);
  };

  const filteredAdhkar = adhkar.filter(dhikr => 
    dhikr.text.includes(searchQuery) || 
    dhikr.fadl.includes(searchQuery)
  );

  const completedCount = adhkar.filter(dhikr => 
    completedAdhkar[`${activeCategory}-${dhikr.id}`]
  ).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">الأذكار</h1>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {adhkarCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`card flex flex-col items-center p-6 transition-all ${
                activeCategory === category.id 
                  ? 'border-2 border-primary shadow-md transform scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">{category.description}</p>
              <span className="bg-primary-light bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                {category.count} ذكر
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={`card mb-6 ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">
            {adhkarCategories.find(c => c.id === activeCategory)?.name}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="ابحث في الأذكار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              onClick={resetCompletedAdhkar}
              className="btn flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <FaRedo />
              إعادة ضبط
            </button>
          </div>
        </div>
        
        <div className="mb-4 bg-primary-light bg-opacity-10 rounded-lg p-4 flex justify-between items-center">
          <div>
            <span className="font-bold">{completedCount}</span> من أصل <span className="font-bold">{adhkar.length}</span> ذكر مكتمل
          </div>
          <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-primary to-primary-light h-2.5 rounded-full" 
              style={{ width: `${(completedCount / adhkar.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {filteredAdhkar.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">لا توجد نتائج مطابقة لبحثك</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAdhkar.map((dhikr) => {
              const isCompleted = completedAdhkar[`${activeCategory}-${dhikr.id}`];
              
              return (
                <div 
                  key={dhikr.id} 
                  className={`p-4 rounded-lg transition-all ${
                    isCompleted 
                      ? 'bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-800' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleAdhkarCompletion(dhikr.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-primary-light hover:text-white'
                        }`}
                        aria-label={isCompleted ? 'تم الانتهاء' : 'تحديد كمنتهي'}
                      >
                        {isCompleted && <FaCheck />}
                      </button>
                      <span className="bg-primary-light bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm">
                        {dhikr.count} مرات
                      </span>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-primary"
                      aria-label="حفظ الذكر"
                    >
                      <FaBookmark />
                    </button>
                  </div>
                  
                  <div className="arabic-text text-lg leading-loose mb-4 whitespace-pre-line">
                    {dhikr.text}
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <div className="flex items-center text-primary mb-1">
                      <FaHeart className="ml-1" />
                      <span className="font-bold">الفضل:</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mr-6">{dhikr.fadl}</p>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-left">
                    {dhikr.source}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 