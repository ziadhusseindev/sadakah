'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuran, FaSun, FaHeart, FaHandHoldingHeart, FaArrowRight, FaLeaf, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <main className={`min-h-screen ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 z-0"></div>
        <div className="absolute inset-0 islamic-pattern z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">صدقة جارية</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              اللهم اجعل هذا العمل في ميزان حسنات <span className="text-accent font-bold mx-2 text-3xl bg-accent/10 px-3 py-1 rounded-lg">حسين محمد</span> واجعله صدقة جارية له
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/quran" className="btn btn-primary flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 px-8 py-4 rounded-xl text-lg transform transition-all hover:scale-105">
                <FaQuran className="text-xl" />
                القرآن الكريم
              </Link>
              <Link href="/adhkar" className="btn btn-secondary flex items-center gap-2 shadow-lg shadow-secondary/20 hover:shadow-secondary/30 px-8 py-4 rounded-xl text-lg transform transition-all hover:scale-105">
                <FaSun className="text-xl" />
                الأذكار
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">محتويات الموقع</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card text-center hover:shadow-lg transition-all transform hover:-translate-y-2 border-t-4 border-primary h-full">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center text-primary text-3xl shadow-md">
                  <FaQuran />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">القرآن الكريم</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                قراءة القرآن الكريم كاملاً مع إمكانية البحث والتصفح حسب السور
              </p>
              <Link href="/quran" className="text-primary flex items-center justify-center gap-1 hover:underline font-semibold group">
                قراءة القرآن <FaArrowRight className="text-sm transition-transform group-hover:translate-x-[-4px]" />
              </Link>
            </div>
            
            <div className="card text-center hover:shadow-lg transition-all transform hover:-translate-y-2 border-t-4 border-secondary h-full">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center text-secondary text-3xl shadow-md">
                  <FaSun className="text-yellow-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-secondary">أذكار الصباح والمساء</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                مجموعة من أذكار الصباح والمساء والأذكار اليومية المختلفة
              </p>
              <Link href="/adhkar" className="text-secondary flex items-center justify-center gap-1 hover:underline font-semibold group">
                قراءة الأذكار <FaArrowRight className="text-sm transition-transform group-hover:translate-x-[-4px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 islamic-pattern opacity-50 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">عن هذا المشروع</h2>
            
            <div className="card mb-8 bg-white dark:bg-gray-800 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden text-white shadow-lg">
                  <FaHandHoldingHeart className="text-5xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-primary">صدقة جارية</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    هذا الموقع هو صدقة جارية عن روح المرحوم والدي الغالي 
                    <span className="font-bold text-accent mx-2 bg-accent/10 px-2 py-1 rounded-md">حسين محمد</span>
                    رحمه الله تعالى وأسكنه فسيح جناته.
                    كل عمل صالح يقوم به زائر هذا الموقع من قراءة القرآن أو ذكر الله، نسأل الله أن يكون في ميزان حسناته.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary-light bg-opacity-10 rounded-lg p-6 border border-primary/10">
                <div className="flex items-start gap-4">
                  <FaLeaf className="text-primary text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2 text-lg">الصدقة الجارية</h4>
                    <p className="text-gray-700 dark:text-gray-300 arabic-text">
                      قال رسول الله صلى الله عليه وسلم: "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له"
                      <span className="block mt-1 text-sm text-gray-500 dark:text-gray-400">رواه مسلم</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link href="/quran" className="btn btn-primary flex items-center justify-center gap-2 mx-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 px-8 py-3 text-lg rounded-xl transform transition-all hover:scale-105">
                <FaBookOpen />
                ابدأ بقراءة القرآن الكريم
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
