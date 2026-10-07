import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import RandomDistrictShopList, { ShopItem } from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

const serviceKeywordPatterns = [
  "맞춤", "홈스파", "타이스웨디시", "프리미엄", "릴렉싱",
  "아로마케어", "감성힐링", "밸런스케어", "딥티슈", "바디컨디션",
  "전신힐링", "스페셜", "호텔식", "프라이빗", "웰니스",
  "소프트터치", "오일바디", "활력충전", "체형맞춤", "건식타이"
];

const rawShopsData: Record<string, Omit<ShopItem, "id">> = {
  "1": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true }
        ]
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["100% 안심 후불제", "25분 내 신속 방문", "24시간 상시 운영", "전문 관리사 1:1 배정"]
  },
  "2": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 제휴 샵.",
    courses: [
      {
        category: "아로디시 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true }
        ]
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      }
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"]
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 힐링 테라피부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true }
        ]
      }
    ],
    features: ["선입금 없는 100% 후불제", "평균 25분 빠른 방문", "24시간 상담 가능", "최고급 오일 사용"]
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "수도권 전지역 출장 방문", "24시간 예약 가능"]
  },
  "5": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 타이부터 스웨디시까지 완벽하게 날려버리세요.",
    courses: [
      {
        category: "건식 코스",
        desc: "오일 없이 정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true }
        ]
      }
    ],
    features: ["100% 안심 후불제", "수도권 전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;

  const seedString = `${cityName}-${districtName}-homethaizone-district-v2026`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const keyword = serviceKeywordPatterns[charSum % serviceKeywordPatterns.length];

  const finalTitle = `${districtName} 출장 ${keyword} 마사지·홈타이 | ${cityName} 안마 업체 | ${SITE_NAME}`;
  const finalDescription = `${cityName} ${districtName} 전 지역 출장마사지, 홈타이, 스웨디시 안내. 선입금 없는 100% 안심 후불 정찰제로 25분 내 빠른 방문과 투명한 가격을 약속합니다.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    keywords: [
      `${districtName} 출장마사지`,
      `${districtName} 홈타이`,
      `${districtName} 안마`,
      `${districtName} 스웨디시`,
      `${cityName} ${districtName} 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;

  const dongs = districtInfo?.dongs || [];
  const otherDistricts = Object.entries(region?.districts || {}).filter(([k]) => k !== district.toLowerCase());

  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${cityName} ${districtName} 출장 홈케어 서비스`,
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_NAME,
      "telephone": "0507-1280-3199",
      "url": SITE_URL
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `${cityName} ${districtName}`
    },
    "description": `${cityName} ${districtName} 전 지역 100% 안심 후불제 출장 홈타이 및 바디케어 서비스`
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs">존</span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">{SITE_NAME}</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="tel:050712803199" className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1.5 rounded-xl hover:opacity-90">📞 24시 전화예약</a>
            <Link href={`/${city}`} className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">&larr; {cityName} 전체</Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-2.5 px-4 text-xs text-gray-400">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <Link href={`/${city}`} className="hover:text-gray-200">{cityName}</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{districtName}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        {/* 인트로 배너 */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-8 space-y-3">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
            {cityName} {districtName} REGIONAL GUIDE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            <span className="text-amber-400">{districtName}</span> 출장 홈케어 마사지 &amp; 홈타이 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {cityName} {districtName} 전 지역 자택, 오피스텔, 호텔 어디든 25분 내 빠른 방문을 약속합니다. 
            선입금 0원 100% 현장 결제 원칙으로 운영되는 검증된 제휴 파트너 정보를 확인하세요.
          </p>
        </section>

        {/* 🌟 SEO 핵심: 관할 동(洞) 리스트 바로가기 (크롤러 색인 트리의 핵심) */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">📍</span> {districtName} 세부 관할 동별 안내 ({dongs.length}개 지역)
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {dongs.map((dongName, idx) => (
              <Link
                key={idx}
                href={`/${city}/${district}/${encodeURIComponent(dongName)}`}
                className="px-3.5 py-2 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              >
                {dongName}
              </Link>
            ))}
          </div>
        </section>

        {/* 제휴 샵 리스트 */}
        <RandomDistrictShopList 
          initialShops={shops}
          districtName={districtName}
          city={city}
          district={district}
        />

        {/* 🌟 SEO 누락 방지 1: 구 단위 방문 안내 (텍스트 볼륨) */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">🛡️</span> {districtName} 안심 방문 케어 특징
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 pt-2">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">사기 걱정 없는 100% 후불</span>
              <p className="text-gray-400 leading-relaxed">
                {districtName} 모든 제휴처는 예약금·선입금을 일체 요구하지 않으며 관리사 대면 후 결제합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">전문 테라피스트 직접 방문</span>
              <p className="text-gray-400 leading-relaxed">
                엄격한 테스트를 거친 베테랑 관리사가 청결한 매트와 최고급 오일을 직접 지참하여 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">24시간 신속 배정</span>
              <p className="text-gray-400 leading-relaxed">
                주야간 및 심야 시간대에도 추가 할증 없이 {districtName} 전역 25분 내 빠른 이동이 가능합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SEO 누락 방지 2: 구 단위 FAQ */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">❓</span> {districtName} 출장마사지 자주 묻는 질문
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {districtName} 전 지역 어디든 방문 가능한가요?</h3>
              <p className="text-gray-400 leading-relaxed">
                네, {districtName} 관내 모든 아파트, 주택, 오피스텔은 물론 비즈니스호텔 및 숙박시설까지 신속하게 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. 예약 후 도착까지 얼마나 걸리나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                {districtName} 인근 상주 힐러 배정 시스템으로 예약 완료 시점 기준 평균 20~30분 이내 도착합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SEO 누락 방지 3: 인접 구 연계 내부 링크 */}
        {otherDistricts.length > 0 && (
          <section className="bg-[#121214] border border-white/10 p-5 md:p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h2 className="text-xs md:text-sm font-bold text-gray-300">
                📍 {cityName} 다른 시·구·군 보러가기
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {otherDistricts.slice(0, 12).map(([dKey, dVal]) => (
                <Link
                  key={dKey}
                  href={`/${city}/${dKey}`}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                >
                  {dVal.name} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center