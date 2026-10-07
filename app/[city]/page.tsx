import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const finalTitle = `${cityName} 출장 마사지·홈타이 전체 지역 안내 | 수도권 안마 업체 | ${SITE_NAME}`;
  const finalDescription = `${cityName} 전 지역 시·군·구·동별 출장마사지, 홈타이, 스웨디시 제휴처 정보를 한눈에 비교하세요. 선입금 0원 100% 안심 후불제와 25분 내 빠른 방문을 보장합니다.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${city}`,
    },
    keywords: [
      `${cityName} 출장마사지`,
      `${cityName} 홈타이`,
      `${cityName} 스웨디시`,
      `${cityName} 마사지`,
      SITE_NAME
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${city}`,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city } = resolvedParams;
  const region = regionData[city.toLowerCase()];
  const cityName = city.toLowerCase() === "seoul" ? "서울" : city.toLowerCase() === "incheon" ? "인천" : "경기";

  const districts = Object.entries(region?.districts || {});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${cityName} 출장 홈케어 서비스`,
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_NAME,
      "telephone": "0507-1280-3199",
      "url": SITE_URL
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": cityName
    },
    "description": `${cityName} 전 지역 100% 안심 후불제 출장 홈타이 및 바디케어 서비스 안내`
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-40 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xs">존</span>
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">{SITE_NAME}</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="tel:050712803199" className="text-xs font-bold text-black bg-gradient-to-r from-amber-500 to-yellow-400 px-3.5 py-1.5 rounded-xl">📞 24시 전화예약</a>
            <Link href="/" className="text-xs text-gray-400 hover:text-white">&larr; 메인 홈으로</Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-2.5 px-4 text-xs text-gray-400">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-200">{cityName} 출장 홈케어</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        {/* 인트로 히어로 */}
        <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#141418] to-[#0a0a0c] p-6 md:p-10 space-y-3 shadow-lg">
          <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase">
            {cityName} METRO GUIDE
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            <span className="text-amber-400">{cityName}</span> 전 지역 출장 마사지 &amp; 홈타이 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-2xl leading-relaxed">
            {cityName} 전역 시·군·구 및 세부 동별 출장마사지 제휴처 정보를 편리하게 확인하세요. 
            선입금 없는 100% 안심 후불제 시스템으로 고객님이 계신 곳까지 25분 내 빠르게 방문합니다.
          </p>
        </section>

        {/* 🌟 SEO 핵심: 전체 시·구·군 카드 및 관할 동 리스트 링크 트리 (크롤러 인덱싱 최적화) */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
              <span className="text-amber-400">📍</span> {cityName} 관할 구·군 목록 ({districts.length}개 권역)
            </h2>
          </div>

          <div className="space-y-4">
            {districts.map(([distKey, distVal]) => (
              <div key={distKey} className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-md transition-all">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/5">
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    {distVal.name}
                  </h3>
                  <Link 
                    href={`/${city}/${distKey}`}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    권역 전체보기 &rarr;
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {distVal.dongs.map((dongName, idx) => (
                    <Link
                      key={idx}
                      href={`/${city}/${distKey}/${encodeURIComponent(dongName)}`}
                      className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                    >
                      {dongName}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 SEO 누락 방지 1: 시 단위 이용 시스템 텍스트 */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">💎</span> {cityName} 홈타이존 서비스 품질 보증
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 pt-2">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">투명한 정찰제 운영</span>
              <p className="text-gray-400 leading-relaxed">
                모든 코스와 시간별 이용 요금을 사전에 투명하게 공개하며, 심야 추가 할증 없이 일정한 가격을 유지합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">광범위 방문 인프라</span>
              <p className="text-gray-400 leading-relaxed">
                {cityName} 주요 거점별 전문 테라피스트 대기 시스템으로 도심지뿐만 아니라 외곽 지역까지 신속하게 방문합니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1.5">
              <span className="font-bold text-amber-400 block text-sm">프라이빗 1:1 홈케어</span>
              <p className="text-gray-400 leading-relaxed">
                외출할 필요 없이 고객님의 개인 공간에서 최고급 오일과 함께 조용하고 아늑한 힐링을 누리실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SEO 누락 방지 2: 시 단위 FAQ */}
        <section className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <span className="text-amber-400">❓</span> {cityName} 출장마사지 이용 안내 FAQ
          </h2>
          <div className="space-y-3 text-xs md:text-sm">
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. {cityName} 어디서든 당일 빠른 예약이 가능한가요?</h3>
              <p className="text-gray-400 leading-relaxed">
                네, 24시간 연중무휴로 운영되며 전화나 문자로 계신 위치를 알려주시면 25분 내 도착 가능한 관리사를 즉시 연결해 드립니다.
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
              <h3 className="font-bold text-amber-300">Q. 결제는 언제 어떻게 하나요?</h3>
              <p className="text-gray-400 leading-relaxed">
                홈타이존은 선입금을 절대 받지 않습니다. 관리사가 방문한 후 현장에서 직접 확인하시고 결제하시면 됩니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500 mt-20">
        <p className="font-bold text-gray-400">{SITE_NAME} · {cityName} 100% 안심 후불제 출장 홈케어 안내</p>
        <p className="text-[11px] text-gray-600 mt-1">© 2026 {SITE_NAME}. All rights reserved.</p>
      </footer>
    </div>
  );
}