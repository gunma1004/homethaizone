"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 수도권 전체 행정구역 데이터
const RAW_METRO_DATA: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
      gangnam: { name: "강남구", dongs: ["역삼동", "개포동", "청담동", "삼성동", "대치동", "신사동", "논현동", "압구정동", "세곡동", "자곡동", "일원동", "수서동", "도곡동"] },
      seocho: { name: "서초구", dongs: ["서초동", "잠원동", "반포동", "방배동", "양재동", "내곡동"] },
      songpa: { name: "송파구", dongs: ["잠실동", "풍납동", "거여동", "마천동", "방이동", "오금동", "송파동", "석촌동", "삼전동", "가락동", "문정동", "장지동", "위례동"] },
      gangdong: { name: "강동구", dongs: ["강일동", "상일동", "명일동", "고덕동", "암사동", "천호동", "성내동", "둔촌동"] },
      mapo: { name: "마포구", dongs: ["공덕동", "아현동", "도화동", "용강동", "대흥동", "염리동", "신수동", "서교동", "합정동", "망원동", "연남동", "성산동", "상암동"] },
      yongsan: { name: "용산구", dongs: ["후암동", "용산동", "남영동", "청파동", "원효로동", "효창동", "용문동", "이촌동", "이태원동", "한남동", "서빙고동", "보광동"] },
      yeongdeungpo: { name: "영등포구", dongs: ["영등포동", "여의도동", "당산동", "도림동", "문래동", "양평동", "신길동", "대림동"] },
      gangseo: { name: "강서구", dongs: ["염창동", "등촌동", "화곡동", "가양동", "마곡동", "발산동", "공항동", "방화동"] },
      gwanak: { name: "관악구", dongs: ["봉천동", "신림동", "남현동", "낙성대동", "보라매동"] },
      dongjak: { name: "동작구", dongs: ["노량진동", "상도동", "흑석동", "사당동", "대방동", "신대방동"] },
      guro: { name: "구로구", dongs: ["신도림동", "구로동", "가리봉동", "고척동", "개봉동", "오류동", "항동"] },
      geumcheon: { name: "금천구", dongs: ["가산동", "독산동", "시흥동"] },
      yangcheon: { name: "양천구", dongs: ["목동", "신월동", "신정동"] },
      seodaemun: { name: "서대문구", dongs: ["충현동", "천연동", "신촌동", "연희동", "홍제동", "홍은동", "남가좌동", "북가좌동"] },
      jongno: { name: "종로구", dongs: ["청운동", "효자동", "사직동", "삼청동", "평창동", "무악동", "교남동", "가회동", "이화동", "혜화동", "창신동", "숭인동"] },
      jung: { name: "중구", dongs: ["소공동", "회현동", "명동", "필동", "장충동", "광희동", "을지로동", "신당동", "다산동", "약수동", "청구동", "황학동"] },
      seongdong: { name: "성동구", dongs: ["왕십리동", "마장동", "사근동", "행당동", "응봉동", "금호동", "옥수동", "성수동", "송정동", "용답동"] },
      gwangjin: { name: "광진구", dongs: ["중곡동", "능동", "구의동", "광장동", "자양동", "화양동", "군자동"] },
      dongdaemun: { name: "동대문구", dongs: ["신설동", "용두동", "제기동", "전농동", "답십리동", "장안동", "청량리동", "회기동", "휘경동", "이문동"] },
      jungnang: { name: "중랑구", dongs: ["면목동", "상봉동", "중화동", "묵동", "망우동", "신내동"] },
      seongbuk: { name: "성북구", dongs: ["성북동", "삼선동", "동선동", "돈암동", "안암동", "보문동", "정릉동", "길음동", "종암동", "월곡동", "장위동", "석관동"] },
      gangbuk: { name: "강북구", dongs: ["미아동", "번동", "수유동", "우이동", "삼양동", "송중동"] },
      dobong: { name: "도봉구", dongs: ["쌍문동", "방학동", "창동", "도봉동"] },
      nowon: { name: "노원구", dongs: ["월계동", "공릉동", "하계동", "중계동", "상계동"] },
      eunpyeong: { name: "은평구", dongs: ["녹번동", "불광동", "갈현동", "구산동", "대조동", "응암동", "역촌동", "신사동", "증산동", "진관동"] }
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류동", "권선동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서동", "지동", "우만동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "구미동", "판교동", "백현동", "운중동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "복정동", "위례동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광동", "은행동", "상대원동", "하대원동", "도촌동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동", "덕이동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "행신동", "화정동", "고양동", "관산동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "동백동", "보정동", "상갈동", "구갈동", "보라동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "역삼동", "유림동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      hwaseong: { name: "화성시", dongs: ["동탄동", "병점동", "봉담읍", "향남읍", "남양읍", "새솔동", "진안동"] },
      namyangju: { name: "남양주시", dongs: ["다산동", "별내동", "평내동", "호평동", "와부읍", "진접읍", "화도읍", "오남읍"] },
      hanam: { name: "하남시", dongs: ["미사동", "위례동", "신장동", "덕풍동", "감일동"] },
      gimpo: { name: "김포시", dongs: ["구래동", "장기동", "운양동", "마산동", "풍무동", "사우동", "고촌읍"] },
      pyeongtaek: { name: "평택시", dongs: ["비전동", "고덕동", "서정동", "동삭동", "송탄동", "안중읍", "포승읍"] },
      siheung: { name: "시흥시", dongs: ["배곧동", "정왕동", "은계동", "목감동", "대야동", "신천동", "은행동"] },
      paju: { name: "파주시", dongs: ["운정동", "교하동", "금촌동", "문산읍", "조리읍"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "민락동"] },
      gwangmyeong: { name: "광명시", dongs: ["철산동", "하안동", "소하동", "광명동", "일직동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      yeonsu: { name: "연수구", dongs: ["송도동", "옥련동", "선학동", "연수동", "청학동", "동춘동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "논현동", "논현고잔동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "십정동"] },
      seohae: { name: "서구", dongs: ["청라동", "검단동", "원당동", "아라동", "가정동", "석남동", "연희동", "당하동"] },
      michuhol: { name: "미추홀구", dongs: ["주안동", "용현동", "학익동", "숭의동", "도화동", "관교동", "문학동"] },
      gyeyang: { name: "계양구", dongs: ["계산동", "작전동", "효성동", "작전서운동", "계양동"] },
      yeongjong: { name: "중구(영종)", dongs: ["운서동", "중산동", "운남동", "영종동", "신포동", "연안동"] }
    }
  }
};

const BUSINESSES = [
  { id: 1, name: "한국골든테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "스웨디시·홈타이", address: "수도권 전지역 25분 칼도착", phone: "0507-1280-3361", price: "60분 110,000원~", image: "/shop1.jpg" },
  { id: 2, name: "한국미인테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "아로마·스웨디시", address: "선입금 없는 100% 현장결제", phone: "0507-1280-3303", price: "90분 100,000원~", image: "/shop2.jpg" },
  { id: 3, name: "주주테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "건식타이·아로마", address: "재방문율 1위 만족도 보장", phone: "0507-1280-3193", price: "60분 60,000원~", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "VIP 감성케어", address: "여왕처럼 누리는 프라이빗 스파", phone: "0507-1280-3334", price: "60분 60,000원~", image: "/shop4.jpg" },
  { id: 5, name: "오늘밤테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "야간 심야 24시", address: "깊은 밤 피로를 날리는 힐링", phone: "0507-1280-3223", price: "60분 60,000원~", image: "/shop5.jpg" }
];

export default function HomeThaiZonePage() {
  const router = useRouter();

  const [cityKey, setCityKey] = useState<string>("seoul");
  const [districtKey, setDistrictKey] = useState<string>("gangnam");
  const [selectedDong, setSelectedDong] = useState<string>("개포동");

  const currentCity = RAW_METRO_DATA[cityKey];
  const districts = currentCity?.districts || {};
  const currentDistrict = districts[districtKey];
  const dongs = currentDistrict?.dongs || [];

  const areaLabel = selectedDong ? `${currentDistrict?.name} ${selectedDong}` : currentDistrict ? currentDistrict.name : currentCity.name;

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              존
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                홈타이존
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">HOMETHAI ZONE · 24시 빠른방문</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/reviews" className="text-xs text-gray-300 hover:text-amber-400 px-3 py-1.5 transition-colors">
              고객후기
            </Link>
            <Link href="/prices" className="text-xs text-gray-300 hover:text-amber-400 px-3 py-1.5 transition-colors">
              가격안내
            </Link>
            <a href="tel:050712803199" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
              📞 24시 전화예약
            </a>
          </div>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="relative overflow-hidden bg-neutral-950 text-center border-b border-amber-500/20 py-16 px-4">
        <img
          src="/banner.jpg"
          alt="홈타이존 서울 경기 인천 프리미엄 타이 및 아로마 출장 케어 안내"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35]"
        />
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-sm">
            METRO HOMETHAI &amp; WELLNESS DIRECTORY
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
            서울·경기·인천 출장 마사지 홈타이존
          </h1>
          <p className="text-gray-300 text-xs md:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            선입금 없는 100% 안심 후불제 정찰제 시스템! <br />
            타이·아로마·스웨디시 전문 테라피스트가 고객님의 집, 호텔, 오피스로 25분 내 신속하게 찾아갑니다.
          </p>
        </div>
      </section>

      {/* 상단 빠른 이동 셀렉트 바 */}
      <div className="bg-[#0d0d10] border-b border-white/5 py-4 px-4 sticky top-[65px] z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-4">
          <select 
            value={cityKey} 
            onChange={(e) => { 
              const newCity = e.target.value;
              const firstDist = Object.keys(RAW_METRO_DATA[newCity].districts)[0];
              setCityKey(newCity); 
              setDistrictKey(firstDist); 
              setSelectedDong(""); 
              router.push(`/${newCity}`);
            }}
            aria-label="시/도 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(RAW_METRO_DATA).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={districtKey} 
            onChange={(e) => { 
              const newDist = e.target.value;
              setDistrictKey(newDist); 
              setSelectedDong(""); 
              router.push(`/${cityKey}/${newDist}`);
            }}
            aria-label="구/군/시 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(districts).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={selectedDong} 
            onChange={(e) => {
              const val = e.target.value;
              setSelectedDong(val);
              if (val) {
                router.push(`/${cityKey}/${districtKey}/${encodeURIComponent(val)}`);
              }
            }}
            aria-label="동/읍/면 선택"
            className="bg-black/80 border border-white/10 rounded-xl text-xs md:text-sm p-3 text-gray-200 outline-none focus:border-amber-500"
          >
            <option value="">동 선택 (상세페이지 이동)</option>
            {dongs.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-12 w-full flex-1 space-y-14">
        
        {/* 제휴 샵 리스트 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">OFFICIAL PARTNERS</span>
              <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 홈타이존 검증 제휴 추천샵</h2>
            </div>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              100% 현장 후불제
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUSINESSES.map((shop) => (
              <div key={shop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 p-5 rounded-2xl flex flex-col justify-between transition-all shadow-lg group">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                    <img src={shop.image} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                      {shop.category}
                    </span>
                    <h3 className="font-extrabold text-base text-white truncate mt-1">
                      {shop.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 truncate">{shop.address}</p>
                    <p className="text-xs font-black text-amber-400 mt-1">{shop.price}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                  <a 
                    href={`tel:${shop.phone}`} 
                    className="flex-1 text-center bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-2.5 rounded-xl transition-all"
                  >
                    📞 24시 전화예약
                  </a>
                  <a 
                    href={`sms:${shop.phone}`} 
                    className="px-3 bg-white/5 hover:bg-white/10 text-gray-300 text-xs py-2.5 rounded-xl border border-white/10 transition-all"
                  >
                    💬 문자
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 🌟 SEO 핵심: 검색엔진 로봇 수집을 위한 정적 지역 링크 맵 (누락 방지 트리) */}
        <section className="bg-[#0f0f12] border border-white/10 p-6 md:p-8 rounded-3xl space-y-8 shadow-md">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">ALL REGIONAL SITEMAP</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              📍 수도권 전 지역 출장 홈케어 상세 가이드 (전체 동 링크)
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              검색 로봇과 사용자가 모든 지역의 코스 및 정찰제 요금을 한눈에 탐색할 수 있도록 제공합니다.
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(RAW_METRO_DATA).map(([sidoKey, sidoVal]) => (
              <div key={sidoKey} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <Link href={`/${sidoKey}`} className="text-lg font-bold text-white hover:text-amber-400 transition-colors">
                    {sidoVal.name} 전체보기 &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(sidoVal.districts).map(([distKey, distVal]) => (
                    <div key={distKey} className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Link 
                          href={`/${sidoKey}/${distKey}`} 
                          className="font-bold text-sm text-amber-300 hover:underline"
                        >
                          {distVal.name}
                        </Link>
                        <span className="text-[10px] text-gray-500">{distVal.dongs.length}개 동</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {distVal.dongs.map((dongName, idx) => (
                          <Link
                            key={idx}
                            href={`/${sidoKey}/${distKey}/${encodeURIComponent(dongName)}`}
                            className="text-[11px] text-gray-400 hover:text-amber-400 bg-white/5 hover:bg-amber-500/10 px-2 py-1 rounded-md transition-colors"
                          >
                            {dongName}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO 본문 텍스트 (품질 및 신뢰도 점수 향상) */}
        <section className="bg-[#0a0a0c] border border-white/5 p-6 md:p-8 rounded-3xl space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed">
          <h3 className="text-base font-bold text-white">
            🛡️ 홈타이존(HomeThaiZone) 100% 안심 후불제 이용 원칙
          </h3>
          <p>
            홈타이존은 서울, 경기, 인천 수도권 전 지역 고객님들이 예약금 및 선입금 사기 걱정 없이 내 집, 호텔, 오피스에서 편안하게 출장 홈케어와 테라피를 누리실 수 있도록 검증된 제휴 파트너만을 엄선하여 안내합니다.
          </p>
          <p>
            과도한 추가 요금이나 불투명한 시간제 운영을 배제하며, 전문 관리사가 직접 방문한 후 확인하고 결제하는 정직한 정찰제 시스템을 지향합니다. 타이 스트레칭, 아로마 릴렉싱, 스웨디시 등 뭉친 근육과 일상의 피로를 언제든 24시간 간편하게 해소해 보세요.
          </p>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-10 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="text-gray-400 font-bold">홈타이존 (HomeThaiZone) · 수도권 24시 출장마사지 &amp; 방문 홈타이 안내 플랫폼</p>
          <p className="text-[11px]">© 2026 홈타이존. All rights reserved. (공식 도메인: https://homethaizone.netlify.app)</p>
        </div>
      </footer>

    </div>
  );
}