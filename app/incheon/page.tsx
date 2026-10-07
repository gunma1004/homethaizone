import Link from 'next/link';
import type { Metadata } from "next";

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

export const metadata: Metadata = {
  title: `인천 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
  description: "인천 전 지역 세부 구·군 및 동·면별 출장마사지, 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. 100% 안심 후불제 시스템으로 25분 내 빠른 방문을 약속합니다.",
  alternates: {
    canonical: `${SITE_URL}/incheon`,
  },
  openGraph: {
    title: `인천 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
    description: "인천 전 지역 세부 구·군 및 동·면별 출장마사지, 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/incheon`,
    siteName: `${SITE_NAME} (HomeThaiZone)`,
    locale: "ko_KR",
    type: "website",
  },
};

// 최신 인천광역시 행정구역 데이터
const incheonDistricts = {
  jemulpo: { 
    name: "제물포구", 
    dongs: ["신포동", "연안동", "신흥동", "도원동", "율목동", "동인천동", "만석동", "화수동", "송현동", "송림동", "금창동", "개항동"] 
  },
  yeongjong: { 
    name: "영종구", 
    dongs: ["영종동", "용유동", "운서동", "중산동", "운남동", "운북동"] 
  },
  michuhol: { 
    name: "미추홀구", 
    dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] 
  },
  yeonsu: { 
    name: "연수구", 
    dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] 
  },
  namdong: { 
    name: "남동구", 
    dongs: ["구월동", "간석동", "만수동", "서창동", "남촌도림동", "논현동", "논현고잔동", "장수서창동"] 
  },
  bupyeong: { 
    name: "부평구", 
    dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] 
  },
  gyeyang: { 
    name: "계양구", 
    dongs: ["효성동", "계산동", "작전동", "작전서운동", "계양동", "임학동", "병방동", "방축동", "동양동", "귤현동", "상야동", "하야동", "평동", "노오지동", "선주지동", "이화동", "오류동", "둑실동", "목상동", "다남동", "장기동"] 
  },
  seohae: { 
    name: "서해구", 
    dongs: ["연희동", "가정동", "석남동", "가좌동", "신현원창동", "청라동"] 
  },
  geomdan: { 
    name: "검단구", 
    dongs: ["검단동", "불로대곡동", "원당동", "아라동", "당하동", "오류왕길동", "마전동", "검암경서동"] 
  },
  ganghwa: { 
    name: "강화군", 
    dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] 
  },
  ongjin: { 
    name: "옹진군", 
    dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] 
  }
};

export default function IncheonRegionPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* 상단 헤더 */}
      <header className="bg-[#050505]/90 border-b border-amber-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform">
              존
            </div>
            <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:050712803199"
              className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
            >
              📞 24시 전화예약
            </a>
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              &larr; 메인 홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* 브레드크럼 */}
      <nav className="bg-[#0c0c0e] border-b border-white/5 py-3 px-4 text-xs text-gray-400">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-amber-400 hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-gray-200">인천광역시 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            인천광역시 공식 홈타이존 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            인천 구·군 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            인천 전 지역(송도, 청라, 부평, 구월 등) 세부 동·면별 출장마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 0원 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 인천 전체 구·군 렌더링 카드 */}
        <div className="space-y-4">
          {Object.entries(incheonDistricts).map(([districtKey, districtVal]) => (
            <div 
              key={districtKey} 
              className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
                <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {districtVal.name}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 hidden sm:inline">{districtVal.dongs.length}개 지역 등록</span>
                  <Link 
                    href={`/incheon/${districtKey}`}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    지역 전체보기 &rarr;
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {districtVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/incheon/${districtKey}?dong=${encodeURIComponent(dong)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 text-xs font-medium text-gray-300 hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/40 transition-all"
                  >
                    {dong}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-400">
            {SITE_NAME} (HomeThaiZone) · 인천광역시 전 지역 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px] text-gray-600">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/incheon)
          </p>
        </div>
      </footer>
    </main>
  );
}