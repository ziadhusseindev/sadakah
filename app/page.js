'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuran, FaPray, FaSun, FaMoon, FaHeart, FaHandHoldingHeart, FaArrowRight, FaGift, FaLeaf, FaBookOpen } from 'react-icons/fa';

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <main className={`min-h-screen ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-light to-primary opacity-10 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">صدقة جارية</h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              موقع إسلامي شامل يهدف إلى نشر الخير والمعرفة الإسلامية، صدقة جارية عن روح المرحوم
              <span className="text-primary font-bold mx-2 text-3xl text-blue-500"> والدي  الغالي حسين محمد </span>
             تقبله الله في الصالحين
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quran" className="btn btn-primary flex items-center gap-2">
                <FaQuran />
                القرآن الكريم
              </Link>
              <Link href="/adhkar" className="btn btn-secondary flex items-center gap-2">
                <FaPray />
                الأذكار
              </Link>
              <Link href="/prayer-times" className="btn btn-secondary flex items-center gap-2">
                <FaSun />
                مواقيت الصلاة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">محتويات الموقع</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center text-primary text-2xl">
                  <FaQuran />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">القرآن الكريم</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                قراءة القرآن الكريم كاملاً مع تلاوة صوتية بصوت الشيخ مشاري العفاسي، وإمكانية البحث في السور والآيات.
              </p>
              <Link href="/quran" className="text-primary flex items-center justify-center gap-1 hover:underline">
                قراءة القرآن <FaArrowRight className="text-sm" />
              </Link>
            </div>
            
            <div className="card text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center text-primary text-2xl">
                  <div className="flex">
                    <FaSun className="text-yellow-500" />
                    <FaMoon className="-mr-2 text-indigo-500" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">الأذكار</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                أذكار الصباح والمساء، أذكار بعد الصلاة، أذكار المنزل والمسجد، مع إمكانية تتبع الأذكار التي تم قراءتها.
              </p>
              <Link href="/adhkar" className="text-primary flex items-center justify-center gap-1 hover:underline">
                قراءة الأذكار <FaArrowRight className="text-sm" />
              </Link>
            </div>
            
            <div className="card text-center hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center text-primary text-2xl">
                  <FaPray />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">مواقيت الصلاة</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                مواقيت الصلاة حسب موقعك الجغرافي، مع إمكانية تفعيل التنبيهات قبل كل صلاة، وعرض الوقت المتبقي للصلاة القادمة.
              </p>
              <Link href="/prayer-times" className="text-primary flex items-center justify-center gap-1 hover:underline">
                عرض المواقيت <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-8">عن هذا المشروع</h2>
            
            <div className="card mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <FaHandHoldingHeart className="text-5xl text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">صدقة جارية</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    هذا الموقع هو صدقة جارية عن روح المرحوم والدي الغالي، أسأل الله أن يتقبلها منه وأن يجعلها في ميزان حسناته.
                    كل عمل صالح يقوم به زائر هذا الموقع من قراءة القرآن أو ذكر الله أو صلاة في وقتها، نسأل الله أن يكون في ميزان حسناته.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary-light bg-opacity-10 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <FaLeaf className="text-primary text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold mb-2">الصدقة الجارية</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      قال رسول الله صلى الله عليه وسلم: "إذا مات ابن آدم انقطع عمله إلا من ثلاث: صدقة جارية، أو علم ينتفع به، أو ولد صالح يدعو له"
                      <span className="block mt-1 text-sm text-gray-500 dark:text-gray-400">رواه مسلم</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/quran" className="btn btn-primary flex items-center justify-center gap-2 mx-auto">
                <FaBookOpen />
                ابدأ بقراءة القرآن الكريم
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            <FaHeart className="text-red-500 inline-block mx-1" />
            اللهم اغفر له وارحمه وعافه واعف عنه، وأكرم نزله، ووسع مدخله
            <FaHeart className="text-red-500 inline-block mx-1" />
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - صدقة جارية
          </p>
        </div>
      </footer>
    </main>
  );
}
