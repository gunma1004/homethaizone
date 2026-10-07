import Link from 'next/link';
import type { Metadata } from "next";

const SITE_URL = "https://homethaizone.netlify.app";
const SITE_NAME = "홈타이존";

export const metadata: Metadata = {
  title: `경기 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
  description: "경기도 전 지역 동·읍·면별 출장마사지, 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. 100% 안심 후불제 시스템으로 25분 내 빠른 방문을 약속합니다.",
  alternates: {
    canonical: `${SITE_URL}/gyeonggi`,
  },
  openGraph: {
    title: `경기 출장 릴렉싱 마사지 & 프리미엄 홈케어 안내 | ${SITE_NAME}`,
    description: "경기도 전 지역 세부 동·읍·면별 출장마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요.",
    url: `${SITE_URL}/gyeonggi`,
    siteName: `${SITE_NAME} (HomeThaiZone)`,
    locale: "ko_KR",
    type: "website",
  },
};

// 경기도 주요 시·구·군 및 세부 동/읍/면 데이터
const gyeonggiDistricts = {
  suwon_jangan: { 
    name: "수원시 장안구", 
    dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] 
  },
  suwon_gwonseon: { 
    name: "수원시 권선구", 
    dongs: ["세류동", "평동", "권선동", "곡선동", "입북동", "서둔동"] 
  },
  suwon_paldal: { 
    name: "수원시 팔달구", 
    dongs: ["매교동", "매산동", "고등동", "화서동", "수창동", "지동"] 
  },
  suwon_yeongtong: { 
    name: "수원시 영통구", 
    dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] 
  },
  seongnam_sujeong: { 
    name: "성남시 수정구", 
    dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "복정동"] 
  },
  seongnam_jungwon: { 
    name: "성남시 중원구", 
    dongs: ["성남동", "중앙동", "금광동", "은행동", "하대원동", "도촌동"] 
  },
  seongnam_bundang: { 
    name: "성남시 분당구", 
    dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "구미동", "판교동", "백현동"] 
  },
  uijeongbu: { 
    name: "의정부시", 
    dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동"] 
  },
  anyang_manan: { 
    name: "안양시 만안구", 
    dongs: ["안양동", "석수동", "박달동"] 
  },
  anyang_dongan: { 
    name: "안양시 동안구", 
    dongs: ["비산동", "관양동", "평촌동", "호계동"] 
  },
  bucheon_wonmi: { 
    name: "부천시 원미구", 
    dongs: ["심곡동", "원미동", "소사동", "중동", "상동", "약대동"] 
  },
  bucheon_sosa: { 
    name: "부천시 소사구", 
    dongs: ["소사본동", "범박동", "역곡동", "괴안동", "송내동"] 
  },
  bucheon_ojeong: { 
    name: "부천시 오정구", 
    dongs: ["오정동", "원종동", "고강동", "성곡동"] 
  },
  gwangmyeong: { 
    name: "광명시", 
    dongs: ["광명동", "철산동", "하안동", "소하동", "일직동"] 
  },
  pyeongtaek: { 
    name: "평택시", 
    dongs: ["팽성읍", "포승읍", "고덕면", "서정동", "비전동", "동삭동"] 
  },
  dongducheon: { 
    name: "동두천시", 
    dongs: ["생연동", "보산동", "중앙동", "상패동"] 
  },
  ansan_sangnok: { 
    name: "안산시 상록구", 
    dongs: ["일동", "사동", "본오동", "반월동", "부곡동", "성포동"] 
  },
  ansan_danwon: { 
    name: "안산시 단원구", 
    dongs: ["고잔동", "초지동", "선부동", "원곡동", "대부동"] 
  },
  goyang_deogyang: { 
    name: "고양시 덕양구", 
    dongs: ["원신동", "흥도동", "효자동", "고양동", "행신동", "화정동"] 
  },
  goyang_ilsandong: { 
    name: "고양시 일산동구", 
    dongs: ["식사동", "중산동", "정발산동", "백석동", "마두동", "장항동"] 
  },
  goyang_ilsanseo: { 
    name: "고양시 일산서구", 
    dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동"] 
  },
  gwacheon: { 
    name: "과천시", 
    dongs: ["별양동", "중앙동", "문원동", "과천동"] 
  },
  guri: { 
    name: "구리시", 
    dongs: ["인창동", "교문동", "수택동", "갈매동"] 
  },
  namyangju: { 
    name: "남양주시", 
    dongs: ["와부읍", "진접읍", "화도읍", "오남읍", "다산동", "평내동"] 
  },
  osan: { 
    name: "오산시", 
    dongs: ["중앙동", "대원동", "남촌동", "초평동", "세마동"] 
  },
  siheung: { 
    name: "시흥시", 
    dongs: ["대야동", "신천동", "은행동", "목감동", "정왕동", "배곧동"] 
  },
  gunpo: { 
    name: "군포시", 
    dongs: ["군포동", "산본동", "금정동", "대야동"] 
  },
  uiwang: { 
    name: "의왕시", 
    dongs: ["고천동", "부곡동", "내손동", "청계동"] 
  },
  hanam: { 
    name: "하남시", 
    dongs: ["신장동", "창우동", "천현동", "미사동", "위례동"] 
  },
  yongin_cheoin: { 
    name: "용인시 처인구", 
    dongs: ["포곡읍", "모현읍", "역삼동", "유림동", "동부동"] 
  },
  yongin_giheung: { 
    name: "용인시 기흥구", 
    dongs: ["신갈동", "영덕동", "구갈동", "상갈동", "보정동", "동백동"] 
  },
  yongin_suji: { 
    name: "용인시 수지구", 
    dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] 
  },
  paju: { 
    name: "파주시", 
    dongs: ["문산읍", "조리읍", "금촌동", "교하동", "운정동"] 
  },
  icheon: { 
    name: "이천시", 
    dongs: ["창전동", "중리동", "증포동", "부발읍"] 
  },
  anseong: { 
    name: "안성시", 
    dongs: ["공도읍", "안성동", "대덕면"] 
  },
  gimpo: { 
    name: "김포시", 
    dongs: ["고촌읍", "통진읍", "사우동", "장기동", "구래동", "마산동"] 
  },
  hwaseong: { 
    name: "화성시", 
    dongs: ["봉담읍", "매송면", "비봉면", "동탄동", "병점동", "남양읍"] 
  },
  gwangju: { 
    name: "광주시", 
    dongs: ["오포읍", "초월읍", "곤지암읍", "경안동", "광남동"] 
  },
  yangju: { 
    name: "양주시", 
    dongs: ["회천동", "정릉동", "양주동", "백석읍"] 
  },
  pochon: { 
    name: "포천시", 
    dongs: ["소흘읍", "군내면", "포천동", "선단동"] 
  },
  yeoju: { 
    name: "여주시", 
    dongs: ["여흥동", "중앙동", "오학동"] 
  },
  yeoncheon: { 
    name: "연천군", 
    dongs: ["연천읍", "전곡읍"] 
  },
  gapyeong: { 
    name: "가평군", 
    dongs: ["가평읍", "설악면", "청평면"] 
  },
  yangpyeong: { 
    name: "양평군", 
    dongs: ["양평읍", "강상면", "옥천면"] 
  }
};

export default function GyeonggiRegionPage() {
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
          <span className="text-gray-200">경기도 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-8">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            경기도 공식 홈타이존 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            경기 시·군·구 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            경기도 전 지역 세부 동·읍·면별 출장마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 0원 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 경기도 전체 시·군 렌더링 카드 */}
        <div className="space-y-4">
          {Object.entries(gyeonggiDistricts).map(([districtKey, districtVal]) => (
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
                    href={`/gyeonggi/${districtKey}`}
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
                    href={`/gyeonggi/${districtKey}?dong=${encodeURIComponent(dong)}`}
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
          <p className="font-bold text-gray-400