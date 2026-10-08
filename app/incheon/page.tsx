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
        "name": "인천광역시 출장 홈케어 안내",
        "item": `${SITE_URL}/incheon`
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
          <span className="text-gray-200">인천광역시 출장 홈케어 안내</span>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <section className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        <div className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-3 py-1 rounded-full mb-3 inline-block">
            인천광역시 공식 홈타이존 가이드
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
            인천 구·군 전체 지역별 출장 홈케어 &amp; 테라피 안내
          </h1>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
            인천 전 지역(송도, 청라, 부평, 구월, 영종 등) 세부 동·면별 출장마사지 및 타이·아로마·스웨디시 제휴처 정보를 편리하게 확인하세요. <br className="hidden md:block" />
            선입금 0원 100% 안심 후불제 시스템으로 25분 내 자택 및 호텔로 빠르게 방문합니다.
          </p>
        </div>

        {/* 인천 전체 구·군 렌더링 카드 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <span className="w-2.5 h-5 bg-amber-400 rounded-full inline-block"></span>
              인천 행정구역별 세부 지역 바로가기
            </h2>
            <span className="text-xs text-gray-400">전체 구·군 완벽 안내</span>
          </div>

          {Object.entries(incheonDistricts).map(([districtKey, districtVal]) => (
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

        {/* 📚 [인천 광역 전용: 네이버 C-Rank / D.I.A. 상위 노출용 3,000자 전문 웰니스 정보성 칼럼] */}
        <section className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-10 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-5">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              INCHEON METROPOLITAN WELLNESS INSIGHT &amp; GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              인천 생활권 특성에 맞춘 신체 피로 회복과 지속 가능한 바디 테라피 가이드
            </h2>
            <p className="text-gray-400 text-xs mt-1.5">
              국제도시와 산업 중심지의 생활 주기 분석, 교대 근무 및 장시간 이동 피로의 생리학적 완화 원리
            </p>
          </div>

          {/* 챕터 1 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">1.</span> 신도시 오피스 환경 및 장시간 통근이 유발하는 근막 긴장의 기전
            </h3>
            <p>
              인천광역시는 송도·청라·영종 등 첨단 국제도시와 부평·남동공단·항만 배후단지 등 역동적인 산업 벨트가 공존하는 복합 거점입니다. 특히 서울과 수도권 타 권역으로 매일 장거리 통근을 반복하는 직장인들과 글로벌 비즈니스에 종사하는 전문직 인구의 비중이 매우 높습니다. 매일 1~2시간 이상 차량을 직접 운전하거나 만원 전철에서 경직된 자세로 서 있는 환경은 척추 정렬을 지탱하는 기립근과 골반 주변 장요근에 극심한 비대칭적 하중을 가합니다.
            </p>
            <p>
              오랜 시간 동안 시선을 고정하고 앉아있는 자세는 흉추의 신전 가동성을 급격히 저하시키며, 어깨가 전방으로 말리는 라운드 숄더 및 거북목(일자목) 변형을 일으킵니다. 이때 목덜미를 지지하는 견갑거근과 상부 승모근은 정상 길이보다 늘어난 상태로 굳어지는 원심성 긴장 상태에 빠지게 됩니다. 혈관이 압박을 받아 혈액 순환이 지연되면 세포 내에 젖산 등 대사 부산물이 쌓여 만성적인 뻐근함과 날개뼈 안쪽의 결림 통증으로 이어집니다.
            </p>
            <p>
              정기적인 바디 밸런스 수기 요법은 뭉친 근섬유의 온도를 서서히 높이고 결을 따라 긴장을 풀어내어 모세혈관의 혈류 순환을 촉진합니다. 굳어있던 심부 근막이 제자리를 찾으면 신경 압박이 완화되어 목과 어깨의 회전 반경이 개운하게 복원됩니다.
            </p>
          </div>

          {/* 챕터 2 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">2.</span> 교대 근무와 불규칙한 생활 주기에서의 자율신경계 회복 생리학
            </h3>
            <p>
              인천국제공항과 항만 물류, 첨단 바이오 제조 시설 등 24시간 교대 근무가 활발한 지역적 특성상, 수면 주기가 불규칙해져 체내 생체 시계(서카디안 리듬)가 교란되는 사례가 많습니다. 낮과 밤이 바뀌는 교대 근무는 코르티솔과 멜라토닌 분비의 밸런스를 무너뜨려 교감신경계를 만성적인 과각성 상태로 몰아넣습니다. 이는 피로함에도 쉽게 잠들지 못하는 수면 장애와 전신 긴장 상태를 초래합니다.
            </p>
            <p>
              차분하고 일정한 압력으로 진행되는 이완 테라피는 피부에 위치한 마이스너 소체 등 감각 수용기를 안정적으로 자극하여 중추신경계로 이완 신호를 전달합니다. 이는 흥분된 교감신경을 진정시키고 부교감신경을 즉각적으로 활성화하여 심장 박동수를 안정화하고 혈관을 확장시킵니다.
            </p>
            <p>
              신체가 깊은 안정 상태에 진입하면 뇌파가 각성 상태인 베타파에서 안정 상태인 알파파 및 수면 단계인 세타파로 전환됩니다. 이는 단순한 근육 피로의 해소를 넘어 뇌의 과열된 인지 피로를 리셋하고 면역 체계의 자가 치유 능력을 극대화하는 역할을 합니다.
            </p>
          </div>

          {/* 챕터 3 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">3.</span> 프로그램별 물리적 이완 기전 비교와 맞춤 선택 가이드
            </h3>
            <p>
              홈타이존에서 제공하는 프로그램은 사용하는 테라피 기법과 물리적 깊이에 따라 뚜렷한 기능적 특성을 가집니다. 당일 신체의 피로 양상에 따라 알맞은 코스를 선택하시는 것이 안전하고 효과적입니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-3">
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">클래식 건식 스트레칭 (타이 케어)</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  오일을 사용하지 않고 매트 위에서 진행되는 정통 기법으로, 압박과 요가 형태의 수동적 관절 신전 운동이 결합되어 있습니다. 장시간 운전이나 좌식 생활로 굳어있는 햄스트링과 둔근, 척추기립근의 가동 범위를 넓혀 전신을 개운하게 풀어줍니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">스웨디시 감성 바디 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  식물성 베이스 오일을 도포하여 마찰 저항을 없앤 상태에서 심장 방향으로 부드럽게 밀어 올리는 유러피언 테크닉입니다. 피부 표층의 미세 순환을 돕고 림프절을 자극하여 부종 완화와 깊은 감성적 안정감을 선사합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">에센셜 아로마 림프 테라피</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  천연 식물 추출물의 후각적 아로마콜로지 효과를 접목한 코스입니다. 건조한 해안가 기후에서 피부 장벽을 촉촉하게 보호하는 동시에 정체된 림프 배농을 유도하여 만성 붓기 완화와 스트레스성 불안 해소에 탁월합니다.
                </p>
              </div>
              <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-1.5">
                <h4 className="font-bold text-amber-400 text-xs sm:text-sm">심부 근막 집중 딥티슈 케어</h4>
                <p className="text-gray-400 text-[11px] sm:text-xs">
                  표층 근육 너머 뼈와 인대에 맞닿아 있는 심부 근막의 단단한 유착 부위를 지속적인 수기 압력으로 풀어내는 코스입니다. 만성적인 목 어깨 결림이나 허리 뻐근함을 유발하는 유착 지점을 집중적으로 이완시켜 신체 정렬을 회복합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 챕터 4 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">4.</span> 호텔 객실 및 프라이빗 주거 공간에서 누리는 홈케어의 가치
            </h3>
            <p>
              송도국제업무단지나 영종 복합리조트, 송도 컨벤시아 등 출장 비즈니스로 호텔 객실에 체류하는 분들이나, 바쁜 일과 후 집에서 편안한 휴식을 원하는 주민들에게 방문형 홈케어는 최상의 시간 절약 솔루션입니다.
            </p>
            <p>
              외부 매장을 직접 찾아가는 과정에서 발생하는 도심 교통 정체와 주차 문제, 타인과의 불필요한 마주침을 완전히 덜어낼 수 있습니다. 내가 지정한 아늑하고 독립된 공간에서 진행되는 세션은 물리적 에너지 소모 없이 온전히 관리 자체에만 집중할 수 있는 환경을 선사합니다.
            </p>
            <p>
              특히 세션이 끝난 직후 추가적인 이동이나 환복 과정 없이 곧바로 침상에서 수면으로 이어질 수 있어 이완된 신체 컨디션이 다음 날 아침까지 편안하게 유지됩니다.
            </p>
          </div>

          {/* 챕터 5 */}
          <div className="space-y-3.5">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-black">5.</span> 안전하고 투명한 100% 현장 후불제 이용 수칙
            </h3>
            <p>
              홈타이존은 인천 전 지역 고객 여러분이 안심하고 힐링을 이용하실 수 있도록 엄격한 제휴 파트너 관리 기준을 고수합니다.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-gray-400 pl-2">
              <li><strong className="text-gray-200">선입금 없는 100% 후불 정산:</strong> 예약 명목의 예약금, 보증금 등 어떠한 사전 결제도 요구하지 않으며, 관리사가 현장에 도착한 후 확인 결제로 진행됩니다.</li>
              <li><strong className="text-gray-200">사전 신체 상태 고지:</strong> 최근 관절 시술 병력, 디스크 질환, 임신, 급성 염증 등이 있는 경우 세션 전 담당 힐러에게 공유하여 적절한 압의 강도를 조절해야 합니다.</li>
              <li><strong className="text-gray-200">세션 후 미온수 음용:</strong> 림프 순환을 통해 체내로 배출된 대사 노폐물이 땀과 소변으로 신속히 배설될 수 있도록 미온수를 500ml 이상 충분히 섭취하시기 바랍니다.</li>
            </ul>
          </div>

          <div className="pt-5 border-t border-white/5 text-[11px] text-gray-500">
            * 본 가이드는 인천광역시 전 지역(송도, 청라, 부평, 구월, 영종 등) 거주자 및 출장 방문객 여러분의 올바른 신체 휴식과 안전한 안심 후불제 홈케어 정보 제공을 위해 홈타이존 리서치 팀에 의해 작성 및 검수되었습니다.
          </div>
        </section>
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