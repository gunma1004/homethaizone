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

// 🌟 1단: '출장 {단어} 마사지' 수식어 패턴 (40종)
const spacedServicePatterns = [
  "출장 아로마 마사지",
  "출장 균형 케어 마사지",
  "출장 스웨디시 케어 마사지",
  "출장 릴렉스 케어 마사지",
  "출장 바디 컨디션 마사지",
  "출장 타이 힐링 마사지",
  "출장 딥티슈 케어 마사지",
  "출장 프리미엄 바디 마사지",
  "출장 감성 힐링 마사지",
  "출장 맞춤형 케어 마사지",
  "출장 전신 집중 마사지",
  "출장 홈 테라피 마사지",
  "출장 힐링 케어 마사지",
  "출장 에스테틱 바디 마사지",
  "출장 림프 순환 마사지",
  "출장 시그니처 케어 마사지",
  "출장 스트레칭 마사지",
  "출장 피로 회복 마사지",
  "출장 호텔식 케어 마사지",
  "출장 프라이빗 마사지",
  "출장 웰니스 바디 마사지",
  "출장 소프트 스웨디시 마사지",
  "출장 딥 릴렉스 마사지",
  "출장 오일 바디 마사지",
  "출장 전신 이완 마사지",
  "출장 활력 충전 마사지",
  "출장 체형 맞춤 마사지",
  "출장 건식 타이 마사지",
  "출장 딥 케어 마사지",
  "출장 명품 힐링 마사지",
  "출장 안심 방문 마사지",
  "출장 스페셜 케어 마사지",
  "출장 집중 관리 마사지",
  "출장 감성 테라피 마사지",
  "출장 소프트 터치 마사지",
  "출장 근육 이완 마사지",
  "출장 릴렉세이션 마사지",
  "출장 베이직 힐링 마사지",
  "출장 VIP 바디 마사지",
  "출장 웰니스 마사지"
];

// 🌟 5개 공식 제휴 샵 기본 데이터
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
      },
      {
        category: "한국인 스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
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
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
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
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" }
        ]
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" }
        ]
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true }
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
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" }
        ]
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" }
        ]
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" }
        ]
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" }
        ]
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "타이 & 아로마 & 풋코스를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true }
        ]
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true }
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
  const dongs = districtInfo?.dongs || [];
  
  // 첫 번째 동 및 인근 동 대표 추출 (예: 수유동, 미아동, 번동)
  const primaryDong = dongs[0] || "";
  const subDongs = dongs.slice(0, 3).join("·");
  const dongsCount = dongs.length > 0 ? dongs.length : 10;

  // 고유 해시 계산으로 타이틀/디스크립션 순환 매핑
  const seedString = `${cityName}-${districtName}-${district.toLowerCase()}-homethaizone-district-v2026`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const serviceIdx = charSum % spacedServicePatterns.length;
  const titleType = charSum % 3;

  // 🌟 요청하신 3가지 타이틀 형식 순환 적용
  // 1: 서울 강북구 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 -홈타이존
  // 2: 강북구 출장 아로마 마사지 | 강북구 집에서 받는 전신 케어 -홈타이존
  // 3: 서울 강북구 수유동 출장 균형케어 마사지 안내 |-홈타이존
  let finalTitle = "";
  if (titleType === 0) {
    finalTitle = `${cityName} ${districtName} 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 - ${SITE_NAME}`;
  } else if (titleType === 1) {
    finalTitle = `${districtName} ${spacedServicePatterns[serviceIdx]} | ${districtName} 집에서 받는 전신 케어 - ${SITE_NAME}`;
  } else {
    finalTitle = primaryDong 
      ? `${cityName} ${districtName} ${primaryDong} 출장 균형케어 마사지 안내 | -${SITE_NAME}`
      : `${cityName} ${districtName} 출장 균형케어 마사지 안내 | -${SITE_NAME}`;
  }

  // 🌟 요청하신 2가지 메타 디스크립션 형식 순환 적용
  // 1: 홈타이존에서 제공하는 서울 강북구 수유동 출장 웰니스 마사지 안내입니다. 수유1동·수유2동·수유3동을 함께 안내하고 주소, 코스 가격, 희망 시각과 미아동·번동 연결을 확인하세요.
  // 2: 홈타이존에서 제공하는 서울 강서구 출장마사지 지역 안내입니다. 9개 하위 지역과 코스 가격, 주소별 예약 확인사항을 한 페이지에서 찾아보세요.
  const descType = charSum % 2;
  let finalDescription = "";
  if (descType === 0 && primaryDong) {
    finalDescription = `${SITE_NAME}에서 제공하는 ${cityName} ${districtName} ${primaryDong} 출장 웰니스 마사지 안내입니다. ${subDongs}을 함께 안내하고 주소, 코스 가격, 희망 시각과 인근 지역 연결을 확인하세요.`;
  } else {
    finalDescription = `${SITE_NAME}에서 제공하는 ${cityName} ${districtName} 출장마사지 지역 안내입니다. ${dongsCount}개 하위 지역과 코스 가격, 주소별 예약 확인사항을 한 페이지에서 찾아보세요.`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}`,
    },
    keywords: [
      `${cityName} ${districtName} 마사지`,
      `${districtName} 출장마사지`,
      `${districtName} ${primaryDong} 홈타이`,
      `${districtName} 스웨디시`,
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

  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  const districtName = districtInfo ? districtInfo.name : district;
  const fullTitle = `${cityName} ${districtName}`;

  // 샵 데이터 배열 변환
  const shops: ShopItem[] = Object.entries(rawShopsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* 상단 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-sm">
              존
            </span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="tel:050712803199"
              className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1.5 rounded-xl hover:opacity-90 transition-all"
            >
              📞 24시 전화예약
            </a>
            <Link 
              href={`/${city}`} 
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              &larr; {cityName} 전체
            </Link>
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
          <span className="text-gray-200">{districtName} 방문케어</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        {/* 인트로 히어로 배너 */}
        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-lg bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-8 text-center md:text-left space-y-3">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {fullTitle} HOMETHAI GUIDE
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">
            <span className="text-amber-400">{fullTitle}</span> 출장 홈케어 마사지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
            {fullTitle} 전 지역 어디든 선입금 없는 100% 안심 후불제로 빠르게 찾아갑니다. 
            스웨디시·타이·아로마 등 엄선된 제휴처의 투명한 코스와 가격 정보를 지금 확인하세요.
          </p>
        </section>

        {/* 관할 동(읍/면) 선택 칩 리스트 */}
        {districtInfo && districtInfo.dongs && districtInfo.dongs.length > 0 && (
          <section className="bg-[#121214] border border-white/10 p-5 md:p-6 rounded-3xl space-y-3.5 shadow-md">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
              <h2 className="text-xs md:text-sm font-bold text-gray-300 flex items-center gap-2">
                <span className="text-amber-400">📍</span> {districtName} 세부 관할 동·읍·면 바로가기
              </h2>
              <span className="text-[11px] text-gray-400">{districtInfo.dongs.length}개 지역 안내</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {districtInfo.dongs.map((dongName, idx) => (
                <Link
                  key={idx}
                  href={`/${city}/${district}?dong=${encodeURIComponent(dongName)}`}
                  className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                >
                  {dongName}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 새로고침 시 셔플되는 제휴 샵 목록 컴포넌트 */}
        <RandomDistrictShopList
          initialShops={shops}
          fullTitle={fullTitle}
          city={city}
          district={district}
        />
      </main>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500 mt-20">
        <p className="font-bold text-gray-400">
          {SITE_NAME} (HomeThaiZone) · {fullTitle} 100% 안심 후불제 출장 홈케어
        </p>
        <p className="text-[11px] text-gray-600 mt-1">
          © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/{city}/{district})
        </p>
      </footer>
    </div>
  );
}