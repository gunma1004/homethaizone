import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "서울·경기·인천 출장 프라이빗 마사지 | 홈타이존",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "서울·경기·인천에서 출장마사지를 홈타이존에서 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  keywords: [
    "홈타이존",
    "서울 출장 프라이빗 마사지",
    "경기 출장 프라이빗 마사지",
    "인천 출장 프라이빗 마사지",
    "수도권 출장 프라이빗 마사지",
    "스웨디시",
    "아로마 테라피",
    "100% 후불제 마사지",
    "프라이빗 홈케어",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    other: {
      // 네이버 서치어드바이저 등록 후 발급받은 키를 넣어주세요
      "naver-site-verification": "1e793a8b3340c6956056198e4b985be1db40a74b",
    },
  },
  openGraph: {
    title: "서울·경기·인천 출장 프라이빗 마사지 | 홈타이존",
    description:
      "서울·경기·인천에서 출장마사지를 홈타이존에서 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "홈타이존 - 서울 경기 인천 24시 방문 홈케어",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "서울·경기·인천 출장 프라이빗 마사지 | 홈타이존",
    description:
      "서울·경기·인천에서 출장마사지를 홈타이존에서 살펴보세요. 프라이빗·스웨디시 타이 아로마 등 다양한 구성과 60·90·120분 코스의 시간·금액을 한눈에 확인할 수 있습니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}