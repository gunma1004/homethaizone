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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "경기도 출장 홈케어 안내",
        "item": `${SITE_URL}/gyeonggi`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-10">
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
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
              경기도 시·군·구별 세부 행정구역 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 생활권 완벽 수록</span>
          </div>

          {Object.entries(gyeonggiDistricts).map(([districtKey, districtVal]) => (
            <div 
              key={districtKey} 
              className="bg-[#121214] border border-white/10 hover:border-amber-500/30 rounded-2xl p-5 md:p-6 shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-white/5">
                <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {districtVal.name}
                </h3>
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

        {/* 📚 [경기 광역 전용: 네이버 C-Rank / D.I.A. 상위 노출용 3,000자 전문 웰니스 정보성 칼럼] */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              GYEONGGI METROPOLITAN WELLNESS INSIGHT &amp; RECOVERY GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              경기 신도시 및 테크 밸리 생활권 맞춤 피로 회복과 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              광역 통근자의 척추·골반 근막 불균형, 고정 좌식 근무 피로의 생체역학적 원인과 1:1 홈케어 안전 이용 수칙
            </p>
          </div>

          {/* 챕터 1 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 광역 통근과 테크 밸리 좌식 근무가 유발하는 근골격계 긴장 메커니즘
            </h3>
            <p>
              경기도는 판교 테크노밸리, 광교 신도시, 동탄 테크노밸리, 수원 삼성전자 나노시티, 고양 킨텍스 일대 등 대규모 IT·제조·연구 벨트가 집중되어 있는 광역 생활권입니다. 특히 경기권 주민들은 서울 및 도내 타 권역으로 매일 1시간 이상 광역버스, 지하철, 자가용을 이용해 장거리 통근을 지속하는 경우가 많습니다. 고정된 운전 좌석이나 출퇴근 대중교통 안에서 경직된 자세를 오래 유지하면 골반 주변의 중둔근, 대퇴이두근, 장요근에 지속적인 비대칭 장력이 실리게 됩니다.
            </p>
            <p>
              동시에 사무 공간에서 컴퓨터 모니터를 응시하며 키보드를 조작하는 장시간 좌식 작업은 경추의 전방 전위(거북목)와 흉추 후만을 필연적으로 가속화합니다. 머리의 하중 중심이 전방으로 기울어질 때마다 상부 승모근과 견갑거근은 늘어난 상태에서 버티는 원심성 수축 상태를 유지하게 됩니다. 이러한 만성 긴장은 근막 내부의 모세혈관을 눌러 혈액 순환을 방해하고, 젖산과 칼슘 이온 등 피로 물질이 배출되지 못하면서 단단한 통증 유발점(Trigger Point)을 고착화시켜 어깨 결림과 긴장성 두통을 유발합니다.
            </p>
            <p>
              체계적인 바디 컨디셔닝은 단순한 표면 마찰을 넘어 근육의 기시부와 정지부를 정밀하게 짚어주며 뭉친 연부조직의 온도를 점진적으로 높여줍니다. 경직되었던 혈관이 확장되어 산소와 영양분이 원활히 공급되면 축적된 피로 부산물이 빠르게 배출되어 상체 가동 범위와 유연성이 자연스럽게 회복됩니다.
            </p>
          </div>

          {/* 챕터 2 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 도심 만성 피로와 교감신경 항진 상태에서의 자율신경계 밸런스 회복
            </h3>
            <p>
              고강도 업무 프로젝트와 복잡한 통근 동선에 노출된 현대인의 자율신경계는 교감신경이 지속적으로 과활성화된 긴장 국면(Fight or Flight)에 놓이기 쉽습니다. 교감신경의 과항진은 말초 혈관 수축, 심박수 증가, 얕은 호흡을 초래하여 근육이 쉴 틈 없이 수축 상태를 유지하게 만듭니다. 이러한 신체화 증상이 장기화되면 만성 피로, 소화 불량, 불면증으로 이어지는 악순환이 고착화됩니다.
            </p>
            <p>
              전문 힐러에 의해 섬세하고 균일한 리듬으로 진행되는 이완 테라피는 피부 감각 수용기 중 마이스너 소체와 파치니 소체를 안정적으로 자극합니다. 이는 뇌로 전달되는 감각 신호를 차분히 가라앉혀 억제되어 있던 부교감신경을 즉각 활성화시킵니다. 심장 박동이 편안해지고 혈관이 확장되면서 체내 옥시토신과 세로토닌의 분비가 촉진됩니다.
            </p>
            <p>
              신체가 깊은 안정 상태에 진입하면 뇌파는 각성 상태인 베타파에서 편안한 명상 상태인 알파파 및 깊은 수면 상태인 세타파로 전환됩니다. 이는 단순한 근육 피로 완화를 넘어 과열된 두뇌 활동을 리셋하고 면역계 세포의 자가 재생 작용을 돕는 필수적인 회복 환경을 만들어냅니다.
            </p>
          </div>

          {/* 챕터 3 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 이완 기전 비교와 맞춤형 선택 기준
            </h3>
            <p>
              홈타이존에서 제공하는 웰니스 프로그램은 사용하는 매개체와 자극의 깊이에 따라 각각 명확한 기능적 장점을 지닙니다. 당일 신체 컨디션과 선호하는 압의 강도에 맞추어 적절한 코스를 선택하는 것이 바람직합니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법으로, 압봉과 수기 압박을 결합하여 에너지 라인을 자극합니다. 장시간 운전이나 좌식 생활로 굳은 고관절, 햄스트링, 척추기립근의 가동 범위를 물리적으로 넓혀 전신을 시원하게 개방합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  따뜻한 식물성 베이스 오일을 도포하여 마찰 저항을 없앤 상태에서 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉입니다. 피부 표층의 미세 순환을 돕고 림프절을 자극하여 부종 완화와 깊은 감성적 안정감을 선사합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  천연 식물 추출물의 후각적 아로마콜로지 효과를 접목한 코스입니다. 건조한 실내 환경에서 피부 보습 장벽을 보호하면서 정체된 림프 배농을 유도하여 만성 붓기 완화와 정서적 긴장 해소에 탁월합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육 너머 뼈와 인대에 맞닿아 있는 심부 근막의 단단한 유착 부위를 지속적인 수기 압력으로 풀어내는 코스입니다. 만성적인 목 어깨 결림이나 허리 뻐근함을 유발하는 원인점을 정밀하게 이완시켜 가벼운 신체 정렬을 복원합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 챕터 4 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 독립된 주거 및 숙소 공간에서 누리는 방문형 홈케어의 가치
            </h3>
            <p>
              로드샵을 방문하기 위해 시내 번화가로 다시 이동하는 과정은 교통 정체, 주차난, 대기 시간 등 또 다른 피로 요인을 발생시킵니다.
            </p>
            <p>
              자택이나 호텔 객실 등 독립된 사적 공간에서 진행되는 프라이빗 홈케어는 이동에 소모되는 물리적 에너지를 보존할 수 있습니다. 내가 가장 심리적 안정감을 느끼는 친숙한 실내 환경에서 관리가 진행되므로 외부 방해 요소 없이 부교감신경이 빠르게 활성화됩니다.
            </p>
            <p>
              특히 세션이 종료된 후 환복이나 복잡한 귀가 과정 없이 곧바로 침상에서 수면으로 이어질 수 있어 이완된 신체 컨디션의 보존력이 뛰어나며, 바쁜 일정을 소화하는 현대인들에게 시간 대비 최상의 회복 효율을 보장합니다.
            </p>
          </div>

          {/* 챕터 5 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 투명한 100% 현장 후불제 이용 수칙
            </h3>
            <p>
              홈타이존은 경기도 전 지역 고객 여러분의 안전과 건전한 테라피 문화 조성을 위해 정직한 운영 수칙을 준수합니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">선입금 없는 100% 후불 정산:</strong> 예약금, 보증금 등 어떠한 사전 결제도 요구하지 않으며, 관리사가 현장에 도착한 후 확인 결제로 안전하게 진행됩니다.</li>
              <li><strong className="text-gray-200">사전 신체 상태 고지:</strong> 최근 관절 수술 병력, 디스크 질환, 임신, 급성 염증 등이 있는 경우 세션 전 담당 힐러에게 공유하여 맞춤 압 조절을 진행하시기 바랍니다.</li>
              <li><strong className="text-gray-200">세션 후 미온수 음용:</strong> 림프 순환을 통해 체내로 배출된 대사 노폐물이 땀과 소변으로 신속히 배설될 수 있도록 미온수를 500ml 이상 충분히 섭취하시기 바랍니다.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 경기도 전 지역(수원, 성남, 분당, 고양, 용인, 화성, 부천 등) 거주자 및 방문객 여러분의 올바른 신체 휴식과 안전한 안심 후불제 홈케어 정보 제공을 위해 홈타이존 리서치 팀에 의해 작성 및 검수되었습니다.
          </div>
        </section>
      </section>

      {/* 푸터 영역 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500 mt-20">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-bold text-gray-400">
            {SITE_NAME} (HomeThaiZone) · 경기도 전 지역 100% 안심 후불제 출장 케어
          </p>
          <p className="text-[11px] text-gray-600">
            © 2026 {SITE_NAME}. All rights reserved. (공식 웹사이트: {SITE_URL}/gyeonggi)
          </p>
        </div>
      </footer>
    </main>
  );
}