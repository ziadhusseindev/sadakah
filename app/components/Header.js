'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaQuran, FaPray, FaSun, FaMoon } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              صدقة جارية
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
              الرئيسية
            </Link>
            <Link href="/quran" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
              <FaQuran className="ml-1" /> القرآن الكريم
            </Link>
            <Link href="/adhkar" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400">
              الأذكار
            </Link>
            <Link href="/prayer-times" className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 flex items-center">
              <FaPray className="ml-1" /> مواقيت الصلاة
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <Link href="/" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 py-2">
              الرئيسية
            </Link>
            <Link href="/quran" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 py-2 flex items-center">
              <FaQuran className="ml-2" /> القرآن الكريم
            </Link>
            <Link href="/adhkar" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 py-2">
              الأذكار
            </Link>
            <Link href="/prayer-times" className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 py-2 flex items-center">
              <FaPray className="ml-2" /> مواقيت الصلاة
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
} 