'use client';

import Link from 'next/link';
import { FaHeart, FaQuran, FaHome, FaHandHoldingHeart, FaGithub, FaSun } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-950 shadow-inner py-12 mt-auto border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold text-primary mb-4">صدقة جارية</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              صدقة جارية للمرحوم
              <span className="font-bold text-accent mx-2 bg-accent/10 px-2 py-1 rounded-md">حسين محمد</span>
              رحمه الله تعالى وأسكنه فسيح جناته
            </p>
            <div className="flex justify-center md:justify-end mt-4">
              <div className="bg-primary/10 text-primary rounded-lg p-3 inline-flex items-center">
                <FaHandHoldingHeart className="ml-2 text-xl" />
                <span className="text-sm">اللهم اجعله صدقة جارية</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center justify-center">
                  <FaHome className="ml-2" /> الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/quran" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center justify-center">
                  <FaQuran className="ml-2" /> القرآن الكريم
                </Link>
              </li>
              <li>
                <Link href="/adhkar" className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center justify-center">
                  <FaSun className="ml-2" /> الأذكار
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-primary mb-4">دعاء</h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed arabic-text">
                اللهم ارحمه رحمة واسعة، وأسكنه فسيح جناتك، واغفر له وارحمه، وعافه واعف عنه، وأكرم نزله، ووسع مدخله، واغسله بالماء والثلج والبرد، ونقه من الخطايا كما ينقى الثوب الأبيض من الدنس
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center flex-wrap">
            <span className="mx-2">&copy; {currentYear} صدقة جارية</span>
            <span className="mx-2 inline-flex items-center">
              <FaHeart className="text-red-500 mx-1 animate-pulse" /> تم إنشاؤه لوجه الله تعالى
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
} 