# صدقة جارية - Sadakah Jariyah

<div dir="rtl">

## مشروع صدقة جارية

هذا المشروع هو موقع إلكتروني للصدقة الجارية مخصص لإحياء ذكرى الوالد المرحوم. يهدف الموقع إلى توفير مصدر للقرآن الكريم وأذكار الصباح والمساء ومواقيت الصلاة، مما يسمح للمستخدمين بالاستفادة من هذه الموارد الدينية وإهداء ثوابها للمتوفى.

</div>

## About This Project

This website is a charitable project (Sadakah Jariyah) dedicated to the memory of a beloved father. The site provides access to the complete Quran, morning and evening supplications, and prayer time notifications, allowing users to benefit from these religious resources and dedicate the rewards to the deceased.

## Features

- **Complete Quran**
  - Browse all 114 Surahs
  - Read Quranic verses with beautiful typography
  - Listen to Quran recitations from various reciters
  - Filter Surahs by Meccan or Medinan revelation
  - Search for Surahs by name or number

- **Morning and Evening Supplications**
  - Access authentic morning and evening supplications
  - Beautiful presentation with Arabic text

- **Prayer Times**
  - Get accurate prayer times based on location
  - Receive notifications for prayer times

- **Responsive Design**
  - Beautiful Islamic-themed UI
  - Fully responsive for all devices
  - Light and dark mode support

## Technologies Used

- **Next.js** - React framework for server-side rendering and static site generation
- **Tailwind CSS** - Utility-first CSS framework for styling
- **React Icons** - Icon library
- **Axios** - Promise-based HTTP client for API requests
- **Alquran.cloud API** - API for Quran text and audio

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sadakah.git
cd sadakah
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
sadakah/
├── app/                  # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout component
│   ├── page.js           # Homepage
│   ├── quran/            # Quran section
│   │   ├── page.js       # Surah list page
│   │   └── [surahId]/    # Dynamic route for individual Surahs
│   │       └── page.js   # Surah detail page
│   └── services/         # API services
│       └── quranService.js # Service for Quran API
├── public/               # Static assets
└── package.json          # Project dependencies
```

## API Integration

The project uses the [Alquran.cloud API](https://alquran.cloud/api) to fetch Quran data, including:
- List of Surahs
- Surah details and verses
- Audio recitations
- List of available reciters

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Alquran.cloud](https://alquran.cloud/) for providing the Quran API
- All the reciters whose beautiful voices are featured in this application
- The open-source community for the amazing tools and libraries

---

<div dir="rtl">

## صدقة جارية

هذا المشروع هو صدقة جارية، نسأل الله أن يجعله في ميزان حسنات المرحوم وأن يرفع درجاته في الجنة.

</div>
