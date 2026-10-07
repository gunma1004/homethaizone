import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    id: string;
  }>;
}

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

const serviceKeywordPatterns = [
  "맞춤", "홈스파", "타이스웨디시", "프리미엄", "릴렉싱",
  "아로마케어", "감성힐링", "밸런스케어", "딥티슈", "바디컨디션",
  "전신힐링", "스페셜", "호텔식", "프라이빗", "웰니스",
  "소프트터치", "오일바디", "활력충전", "체형맞춤", "건식타이",
  "명품힐링", "안심방문", "집중관리", "근육이완", "스트레칭",
  "피로회복", "림프순환", "시그니처", "베이직힐링", "VIP바디"
];

const shopDatabase: Record<string, {
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: { time: string; price: string; recommend?: boolean }[];
  }[];
}> = {
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
    ]
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
    ]
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
        desc: "섬세하고 감각적인 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
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
    ]
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
    ]
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
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, id } = resolvedParams;
  
  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const shop = shopDatabase[id] || shopDatabase["1"];
  const locationKeyword = `${cityName} ${districtName}`;

  const seedString = `${locationKeyword}-${id}-homethaizone-district-shop-v2026`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const keywordIdx = charSum % serviceKeywordPatterns.length;
  const keyword = serviceKeywordPatterns[keywordIdx];

  // 🌟 {districtName} 출장 {keyword} 마사지·홈타이 {shop.name} | {cityName} 안마 업체 | 홈타이존
  const finalTitle = `${districtName} 출장 ${keyword} 마사지·홈타이 ${shop.name} | ${cityName} 안마 업체 | ${SITE_NAME}`;

  const descType = charSum % 3;
  let finalDescription = "";
  if (descType === 0) {
    finalDescription = `${cityName} ${districtName} 출장 마사지·홈타이·안마 ${shop.name}. 건식 7만원부터 심야할증 없이 방문. 가까운 업체를 투명한 가격으로 안내합니다.`;
  } else if (descType === 1) {
    finalDescription = `${SITE_NAME}에서 ${cityName} ${districtName} 출장 마사지와 스웨디시를 경험하세요. ${shop.name} 프로 관리사가 고객님의 집, 호텔, 오피스로 직접 방문. 코스·가격과 관리사 정보를 확인하고 전화·문자로 예약하세요.`;
  } else {
    finalDescription = `${SITE_NAME} - 선입금 없는 100% 후불제 ${cityName} ${districtName} ${shop.name} 마사지 안내. 25분 내 빠른 방문과 투명한 정찰제로 편안한 출장 방문을 누려보세요.`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}/${district}/shop/${id}`,
    },
    keywords: [
      `${districtName} ${shop.name}`,
      `${districtName} 출장마사지`,
      `${districtName} 홈타이`,
      `${cityName} 안마`,
      `${districtName} 스웨디시`,
      `${locationKeyword} 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}/${district}/shop/${id}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: `${locationKeyword} ${shop.name}` }],
    },
  };
}

export default async function DistrictShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, id } = resolvedParams;

  const region = regionData[city.toLowerCase()];
  const districtInfo = region?.districts[district.toLowerCase()];
  
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";
  const districtName = districtInfo ? districtInfo.name : district;
  const fullLocation = `${cityName} ${districtName}`;

  const shop = shopDatabase[id] || shopDatabase["1"];
  const displayShopTitle = `${fullLocation} 안심 방문 케어 - ${shop.name}`;

  const allShopsList = Object.entries(shopDatabase).map(([sId, sVal]) => ({
    id: sId,
    name: sVal.name,
    badge: sVal.badge,
    desc: sVal.desc,
    phone: sVal.phone,
    image: sVal.image,
    active: sId === id
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `${SITE_URL}/${city}/${district}/shop/${id}`,
    "image": `${SITE_URL}${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": fullLocation,
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link 
              href={`/${city}/${district}`} 
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              &larr; {districtName} 목록으로
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
          <Link href={`/${city}/${district}`} className="hover:text-gray-200">{districtName}</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{shop.name}</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 상단 선택된 샵 배너 카드 */}
        <section className="bg-[#121214] border border-white/10 rounded-3xl overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.75]" />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              ✨ {shop.badge}
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-[#121214] rounded-t-3xl border-t border-amber-500/20">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
              📍 {fullLocation} 안심 방문 제휴처
            </span>
            <h1 className="text-xl md:text-3xl font-black text-white leading-tight">{displayShopTitle}</h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>
          </div>
        </section>

        {/* 전체 제휴 샵 목록 보기 */}
        <section className="bg-[#121214] border border-white/10 p-6 rounded-3xl space-y-4 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PARTNER SHOPS IN {districtName}</span>
            <h3 className="text-base md:text-xl font-black text-white mt-1">
              ✨ {fullLocation} 공식 제휴처 (총 5곳)
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {allShopsList.map((s) => (
              <div 
                key={s.id} 
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  s.active 
                    ? "bg-amber-500/10 border-amber-500/50 shadow-sm" 
                    : "bg-black/40 border-white/10 hover:border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-white/10" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white truncate">{s.name}</span>
                      {s.active && <span className="text-[10px] bg-amber-500 text-black font-black px-2 py-0.5 rounded-full">선택됨</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/${city}/${district}/shop/${s.id}`}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      s.active
                        ? "bg-amber-500 text-black font-black shadow-xs"
                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500"
                    }`}
                  >
                    {s.active ? "안내 보기" : "샵 선택"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 가격 안내 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 shadow-md">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM &amp; PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-white mt-1">💎 {shop.name} 정규 코스 및 요금</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-black/40 border border-white/10 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-white text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-[#18181c] rounded-xl border border-white/10 flex justify-between items-center shadow-xs">
                      <span className="text-xs font-bold text-gray-300">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-amber-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl border-t border-amber-500/20 p-3 md:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a 
            href={`tel:${shop.phone}`} 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-md transition-transform active:scale-95"
          >
            📞 전화예약 ({shop.phone})
          </a>
          <a 
            href={`sms:${shop.phone}`} 
            className="flex items-center justify-center gap-2 bg-[#18181c] hover:bg-[#222228] border border-white/10 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm transition-transform active:scale-95"
          >
            💬 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}