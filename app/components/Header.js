'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaQuran, FaSun, FaHome, FaInfoCircle } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  useEffect(() => {
    // Set active link based on current path
    setActiveLink(window.location.pathname);
    
    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">☪</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">صدقة جارية</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link 
              href="/" 
              className={`nav-link flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${activeLink === '/' ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <FaHome className="ml-1" /> الرئيسية
            </Link>
            <Link 
              href="/quran" 
              className={`nav-link flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${activeLink.startsWith('/quran') ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <FaQuran className="ml-1" /> القرآن الكريم
            </Link>
            <Link 
              href="/adhkar" 
              className={`nav-link flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${activeLink.startsWith('/adhkar') ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              <FaSun className="ml-1" /> الأذكار
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 absolute left-4 right-4 border border-gray-200 dark:border-gray-700">
            <Link 
              href="/" 
              className={`block py-3 px-4 rounded-md ${activeLink === '/' ? 'bg-primary/10 text-primary font-bold' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="ml-2" /> الرئيسية
            </Link>
            <Link 
              href="/quran" 
              className={`block py-3 px-4 rounded-md ${activeLink.startsWith('/quran') ? 'bg-primary/10 text-primary font-bold' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaQuran className="ml-2" /> القرآن الكريم
            </Link>
            <Link 
              href="/adhkar" 
              className={`block py-3 px-4 rounded-md ${activeLink.startsWith('/adhkar') ? 'bg-primary/10 text-primary font-bold' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaSun className="ml-2" /> الأذكار
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
} 