'use client';

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700 dark:text-gray-300 text-center md:text-right">
              صدقة جارية للمرحوم{'  والدي '}
              <span className="font-semibold"> </span>{' '}
              رحمه الله تعالى وأسكنه فسيح جناته
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
           
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link href="/quran" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                القرآن الكريم
              </Link>
              <Link href="/adhkar" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                الأذكار
              </Link>
              <Link href="/prayer-times" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 gap-2">
                مواقيت الصلاة
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
            &copy; {currentYear} صدقة جارية | تم إنشاؤه بـ{' '}
            <FaHeart className="inline text-red-500 mx-1" /> لوجه الله تعالى
          </p>
        </div>
      </div>
    </footer>
  );
} 