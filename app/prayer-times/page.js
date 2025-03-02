'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMosque, FaMapMarkerAlt, FaClock, FaBell, FaCalendarAlt, FaSun, FaMoon, FaArrowUp, FaRegClock } from 'react-icons/fa';

export default function PrayerTimesPage() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [notifications, setNotifications] = useState({
    fajr: false,
    dhuhr: false,
    asr: false,
    maghrib: false,
    isha: false
  });
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            
            // Get location name
            const locationResponse = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`
            );
            setLocationName(locationResponse.data.city || locationResponse.data.locality || 'موقعك الحالي');
            
            // Get prayer times
            const today = new Date();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            
            const prayerResponse = await axios.get(
              `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`
            );
            
            const day = today.getDate();
            const todayPrayerTimes = prayerResponse.data.data[day - 1].timings;
            
            // Clean up the prayer times (remove the +03 suffix)
            Object.keys(todayPrayerTimes).forEach(key => {
              todayPrayerTimes[key] = todayPrayerTimes[key].split(' ')[0];
            });
            
            setPrayerTimes(todayPrayerTimes);
            setLoading(false);
            setTimeout(() => setFadeIn(true), 100);
            
            // Load notifications from localStorage
            const savedNotifications = localStorage.getItem('prayerNotifications');
            if (savedNotifications) {
              setNotifications(JSON.parse(savedNotifications));
            }
          } catch (err) {
            console.error('Error fetching prayer times:', err);
            setError('حدث خطأ أثناء جلب مواقيت الصلاة. يرجى المحاولة مرة أخرى.');
            setLoading(false);
          }
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('يرجى السماح بالوصول إلى موقعك لعرض مواقيت الصلاة الدقيقة.');
          setLoading(false);
        }
      );
    } else {
      setError('متصفحك لا يدعم تحديد الموقع. يرجى استخدام متصفح آخر.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Save notifications to localStorage
    if (Object.values(notifications).some(value => value)) {
      localStorage.setItem('prayerNotifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  useEffect(() => {
    if (prayerTimes) {
      const calculateNextPrayer = () => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        
        const prayers = [
          { name: 'الفجر', time: prayerTimes.Fajr, key: 'fajr' },
          { name: 'الشروق', time: prayerTimes.Sunrise, key: 'sunrise' },
          { name: 'الظهر', time: prayerTimes.Dhuhr, key: 'dhuhr' },
          { name: 'العصر', time: prayerTimes.Asr, key: 'asr' },
          { name: 'المغرب', time: prayerTimes.Maghrib, key: 'maghrib' },
          { name: 'العشاء', time: prayerTimes.Isha, key: 'isha' }
        ];
        
        // Find the next prayer
        let next = null;
        for (const prayer of prayers) {
          if (currentTime < prayer.time) {
            next = prayer;
            break;
          }
        }
        
        // If no next prayer found, it means all prayers for today have passed
        // So the next prayer is Fajr of tomorrow
        if (!next) {
          next = { ...prayers[0], isNextDay: true };
        }
        
        setNextPrayer(next);
        
        // Calculate time remaining
        const [nextHours, nextMinutes] = next.time.split(':').map(Number);
        let nextTimeInMinutes = nextHours * 60 + nextMinutes;
        
        const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
        let currentTimeInMinutes = currentHours * 60 + currentMinutes;
        
        // If next prayer is tomorrow, add 24 hours
        if (next.isNextDay) {
          nextTimeInMinutes += 24 * 60;
        }
        
        const diffInMinutes = nextTimeInMinutes - currentTimeInMinutes;
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        
        setTimeRemaining(`${hours} ساعة و ${minutes} دقيقة`);
      };
      
      calculateNextPrayer();
      const interval = setInterval(calculateNextPrayer, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [prayerTimes]);

  const toggleNotification = (prayer) => {
    setNotifications(prev => ({
      ...prev,
      [prayer]: !prev[prayer]
    }));
    
    // Here you would implement the actual notification logic
    // This is just a placeholder for demonstration
    if (!notifications[prayer]) {
      // Request notification permission
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const getPrayerIcon = (prayer) => {
    switch (prayer) {
      case 'fajr':
        return <FaSun className="text-yellow-500" />;
      case 'sunrise':
        return <FaArrowUp className="text-orange-500" />;
      case 'dhuhr':
        return <FaSun className="text-yellow-600" />;
      case 'asr':
        return <FaSun className="text-orange-400" />;
      case 'maghrib':
        return <FaSun className="text-red-500" />;
      case 'isha':
        return <FaMoon className="text-indigo-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-lg">جاري تحميل مواقيت الصلاة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-red-500">
        <p className="text-xl mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="btn btn-primary"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${fadeIn ? 'fade-in' : 'opacity-0'}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">مواقيت الصلاة</h1>
      
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <FaMapMarkerAlt className="text-primary ml-2 text-xl" />
            <h2 className="text-xl font-bold">{locationName}</h2>
          </div>
          
          <div className="flex items-center">
            <FaCalendarAlt className="text-primary ml-2" />
            <span>{new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        {nextPrayer && (
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-lg font-medium mb-1">الصلاة القادمة</h3>
                <div className="flex items-center">
                  <div className="text-4xl font-bold">{nextPrayer.name}</div>
                  <div className="mr-4 text-2xl">{formatTime(nextPrayer.time)}</div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <FaRegClock className="text-white ml-2 text-xl" />
                <div className="text-lg">متبقي: {timeRemaining}</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayerTimes && [
            { name: 'الفجر', time: prayerTimes.Fajr, key: 'fajr' },
            { name: 'الشروق', time: prayerTimes.Sunrise, key: 'sunrise' },
            { name: 'الظهر', time: prayerTimes.Dhuhr, key: 'dhuhr' },
            { name: 'العصر', time: prayerTimes.Asr, key: 'asr' },
            { name: 'المغرب', time: prayerTimes.Maghrib, key: 'maghrib' },
            { name: 'العشاء', time: prayerTimes.Isha, key: 'isha' }
          ].map((prayer) => (
            <div 
              key={prayer.key} 
              className={`p-4 rounded-lg border transition-all ${
                nextPrayer && nextPrayer.key === prayer.key
                  ? 'bg-primary-light bg-opacity-10 border-primary'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                    {getPrayerIcon(prayer.key)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{prayer.name}</h3>
                    <p className="text-2xl font-medium">{formatTime(prayer.time)}</p>
                  </div>
                </div>
                
                {prayer.key !== 'sunrise' && (
                  <button 
                    onClick={() => toggleNotification(prayer.key)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      notifications[prayer.key]
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    aria-label={notifications[prayer.key] ? 'إيقاف التنبيه' : 'تفعيل التنبيه'}
                  >
                    <FaBell />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-bold mb-4">إعدادات التنبيهات</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          يمكنك تفعيل التنبيهات لكل صلاة بالضغط على زر الجرس بجانب وقت الصلاة.
          سيتم تنبيهك قبل موعد الصلاة بخمس دقائق.
        </p>
        
        <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <p className="text-yellow-800 dark:text-yellow-200">
            <strong>ملاحظة:</strong> يجب أن تكون قد منحت الإذن للموقع بإرسال الإشعارات لكي تعمل التنبيهات.
          </p>
        </div>
      </div>
    </div>
  );
} 