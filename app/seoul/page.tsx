import Link from 'next/link';
import type { Metadata } from "next";

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

export const metadata: Metadata = {
  title: `서울 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
  description: "서울 전 지역(25개 구) 출장 마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. 선입금 0원 100% 안심 후불제로 25분 내 빠른 방문을 약속합니다.",
  alternates: {
    canonical: `${SITE_URL}/seoul`,
  },
  openGraph: {
    title: `서울 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
    description: "서울 전 지역(25개 구) 출장 마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/seoul`,
    siteName: `${SITE_NAME} (HomeThaiZone)`,
    locale: "ko_KR",
    type: "website",
  },
};

// 서울 25개 구 대표 동 목록 (숫자 통합 및 정돈된 법정동 명칭)
const seoulDistricts = {
  jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "부암동", "평창동", "무악동", "교남동", "가회동", "종로가", "이화동", "혜화동", "창신동", "숭인동"] },
  jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "동화동", "황학동", "중림동"] },
  yongsan: { name: "용산구", dongs: ["후암동", "용산동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
  seongdong: { name: "성동구", dongs: ["왕십리동", "왕십리도선동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
  gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
  dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
  jungnang: { name: "중랑구", dongs: ["면목본동", "면목동", "상봉동", "중화동", "묵동", "망우본동", "망우동", "신내동"] },
  seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
  gangbuk: { name: "강북구", dongs: ["삼양동", "미아동", "송중동", "송천동", "삼각산동", "번동", "수유동", "우이동", "인수동"] },
  dobong: { name: "도봉구", dongs: ["창동", "도봉동", "쌍문동", "방학동"] },
  nowon: { name: "노원구", dongs: ["상계동", "중계본동", "중계동", "하계동", "공릉동"] },
  eunpyeong: { name: "은평구", dongs: ["불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "수색동", "진관동"] },
  seodaemun: { name: "서대문구", dongs: ["천연동", "북아현동", "충현동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
  mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
  yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
  gangseo: { name: "강서구", dongs: ["등촌동", "화곡본동", "화곡동", "우장산동", "가양동", "발산동", "공항동", "방화동"] },
  guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "수궁동"] },
  geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
  yeongdeungpo: { name: "영등포구", dongs: ["영등포본동", "영등포동", "여의동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
  dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
  gwanak: { name: "관악구", dongs: ["보라매동", "청림동", "성현동", "행운동", "낙성대동", "청룡동", "은천동", "상현동", "서원동", "신원동", "서림동", "신사동", "난향동", "조원동", "대학동", "난곡동", "삼성동", "미성동"] },
  seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포본동", "반포동", "방배본동", "방배동", "양재동", "내곡동"] },
  gangnam: { name: "강남구", dongs: ["역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡동"] },
  songpa: { name: "송파구", dongs: ["잠실본동", "잠실동", "풍납동", "거여동", "마천동", "방이동", "오륜동", "오금동", "송파동", "석촌동", "삼전동", "가락본동", "가락동", "문정동", "장지동", "위례동"] },
  gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "둔촌동"] }
};

export default function SeoulRegionPage() {
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
          <span className="text-gray-200">서울특별시 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            서울특별시 공식 홈타이존 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            서울 25개 구 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            서울 전 지역(25개 구) 세부 동별 출장마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 요구가 전혀 없는 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 25개 구 전체 렌더링 카드 */}
        <div className="space-y-4">
          {Object.entries(seoulDistricts).map(([districtKey, districtVal]) => (
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
                  <span className="text-xs text-gray-400 hidden sm:inline">{districtVal.dongs.length}개 동 등록</span>
                  <Link 
                    href={`/seoul/${districtKey}`}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    구 전체보기 &rarr;
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {districtVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/seoul/${districtKey}?dong=${encodeURIComponent(dong)}`}
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
            {SITE_NAME} (HomeThaiZone) · 서울특별시 25개 구 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px] text-gray-600">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/seoul)
          </p>
        </div>
      </footer>
    </main>
  );
}