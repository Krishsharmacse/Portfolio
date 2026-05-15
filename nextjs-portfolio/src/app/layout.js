import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300','400','500','600','700','800','900'],
});

export const metadata = {
  metadataBase: new URL('https://krishsharma.dev'),
  title: {
    default: 'Krish Sharma — AI/ML Engineer & Developer',
    template: '%s | Krish Sharma',
  },
  description:
    'Krish Sharma is an AI/ML Engineer based in New Delhi, India, specialising in Generative AI, Large Language Models, Computer Vision, and full-stack ML systems.',
  keywords: [
    'Krish Sharma',
    'AI Engineer',
    'ML Engineer',
    'Machine Learning',
    'Generative AI',
    'LLM',
    'Deep Learning',
    'Computer Vision',
    'RAG',
    'LangChain',
    'PyTorch',
    'TensorFlow',
    'Next.js',
    'Portfolio',
    'New Delhi',
    'India',
  ],
  authors: [{ name: 'Krish Sharma', url: 'https://krishsharma.dev' }],
  creator: 'Krish Sharma',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://krishsharma.dev',
    siteName: 'Krish Sharma — AI/ML Engineer',
    title: 'Krish Sharma — AI/ML Engineer & Developer',
    description:
      'Building intelligent systems with Generative AI, Machine Learning, and Data Science.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Krish Sharma — AI/ML Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krish Sharma — AI/ML Engineer & Developer',
    description:
      'Building intelligent systems with Generative AI, Machine Learning, and Data Science.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://krishsharma.dev" />
      </head>
      <body>{children}</body>
    </html>
  );
}
