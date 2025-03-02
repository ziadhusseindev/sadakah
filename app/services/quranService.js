// خدمة للتعامل مع API القرآن الكريم
const API_BASE_URL = 'http://api.alquran.cloud/v1';

// الحصول على قائمة القراء المتاحين
export const getAvailableReciters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/edition?format=audio&language=ar`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      // تصفية النتائج للحصول على القراء العرب فقط مع تنسيق الصوت
      return data.data.filter(edition => 
        edition.format === 'audio' && 
        edition.language === 'ar' &&
        edition.type === 'versebyverse'
      );
    }
    return [];
  } catch (error) {
    console.error('Error fetching reciters:', error);
    return [];
  }
};

// الحصول على سورة معينة بصوت قارئ محدد
export const getSurahAudio = async (surahId, reciterId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahId}/${reciterId}`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching surah ${surahId} with reciter ${reciterId}:`, error);
    return null;
  }
};

// الحصول على قائمة السور
export const getSurahs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return [];
  }
};

// الحصول على آيات سورة معينة بالنص العربي
export const getSurahText = async (surahId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahId}/ar.alafasy`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching surah ${surahId} text:`, error);
    return null;
  }
};

// الحصول على قائمة الترجمات المتاحة
export const getAvailableTranslations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/edition?format=text&type=translation`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data.filter(edition => edition.format === 'text' && edition.type === 'translation');
    }
    return [];
  } catch (error) {
    console.error('Error fetching translations:', error);
    return [];
  }
};

// الحصول على ترجمة سورة معينة
export const getSurahTranslation = async (surahId, translationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/surah/${surahId}/${translationId}`);
    const data = await response.json();
    
    if (data.code === 200 && data.status === 'OK') {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching surah ${surahId} translation:`, error);
    return null;
  }
}; 