"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

// 1. 서울·경기·인천 수도권 행정구역 데이터
const RAW_METRO_DATA: Record<string, { name: string; districts: Record<string, { name: string; dongs: string[] }> }> = {
  seoul: {
    name: "서울특별시",
    districts: {
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
    }
  },
  gyeonggi: {
    name: "경기도",
    districts: {
      suwon_jangan: { name: "수원시 장안구", dongs: ["파장동", "정자동", "영화동", "송죽동", "조원동", "율천동"] },
      suwon_gwonseon: { name: "수원시 권선구", dongs: ["세류동", "권선동", "곡선동", "평동", "호매실동", "서둔동", "금곡동"] },
      suwon_paldal: { name: "수원시 팔달구", dongs: ["매교동", "매산동", "고등동", "화서동", "지동", "우만동", "인계동"] },
      suwon_yeongtong: { name: "수원시 영통구", dongs: ["매탄동", "원천동", "영통동", "망포동", "광교동"] },
      seongnam_sujeong: { name: "성남시 수정구", dongs: ["신흥동", "태평동", "수진동", "단대동", "산성동", "양지동", "복정동", "위례동", "신촌동", "고등동", "창곡동"] },
      seongnam_jungwon: { name: "성남시 중원구", dongs: ["성남동", "중앙동", "금광동", "은행동", "상대원동", "하대원동", "도촌동"] },
      seongnam_bundang: { name: "성남시 분당구", dongs: ["분당동", "수내동", "정자동", "서현동", "이매동", "야탑동", "금곡동", "미금동", "구미동", "판교동", "삼평동", "백현동", "운중동"] },
      goyang_deogyang: { name: "고양시 덕양구", dongs: ["원신동", "흥도동", "효자동", "창릉동", "능곡동", "행신동", "화정동", "대덕동", "고양동", "관산동", "성사동"] },
      goyang_ilsandong: { name: "고양시 일산동구", dongs: ["식사동", "중산동", "정발산동", "풍산동", "백석동", "마두동", "장항동", "고봉동"] },
      goyang_ilsanseo: { name: "고양시 일산서구", dongs: ["일산동", "탄현동", "주엽동", "대화동", "송포동", "덕이동"] },
      yongin_cheoin: { name: "용인시 처인구", dongs: ["포곡읍", "모현읍", "남사읍", "원삼면", "백암면", "동부동", "중앙동", "역삼동", "유림동"] },
      yongin_giheung: { name: "용인시 기흥구", dongs: ["신갈동", "마북동", "구성동", "동백동", "보정동", "상갈동", "기흥동", "서농동", "중동", "상하동", "보라동"] },
      yongin_suji: { name: "용인시 수지구", dongs: ["풍덕천동", "신봉동", "죽전동", "동천동", "상현동", "성복동"] },
      bucheon_wonmi: { name: "부천시 원미구", dongs: ["심곡동", "원미동", "소사동", "역곡동", "중동", "상동", "약대동"] },
      bucheon_sosa: { name: "부천시 소사구", dongs: ["소사본동", "범박동", "옥길동", "괴안동", "송내동", "춘의동"] },
      bucheon_ojeong: { name: "부천시 오정구", dongs: ["오정동", "고강동", "원종동", "성곡동"] },
      ansan_sangnok: { name: "안산시 상록구", dongs: ["반월동", "사동", "일동", "이동", "본오동", "수암동", "장상동"] },
      ansan_danwon: { name: "안산시 단원구", dongs: ["와동", "고잔동", "초지동", "원곡동", "백운동", "신길동", "성곡동", "대부동"] },
      anyang_manan: { name: "안양시 만안구", dongs: ["안양동", "석수동", "박달동"] },
      anyang_dongan: { name: "안양시 동안구", dongs: ["비산동", "부흥동", "달안동", "관양동", "평촌동", "평안동", "귀인동", "범계동", "호계동"] },
      uijeongbu: { name: "의정부시", dongs: ["의정부동", "호원동", "장암동", "신곡동", "송산동", "가능동", "흥선동", "자금동"] },
      gwangmyeong: { name: "광명시", dongs: ["광명동", "철산동", "하안동", "소하동", "학온동"] },
      pyeongtaek: { name: "평택시", dongs: ["진위면", "서탄면", "고덕면", "청북읍", "포승읍", "현덕면", "팽성읍", "신장동", "서정동", "송탄동", "지산동", "원평동", "비전동", "소사동", "세교동"] },
      dongducheon: { name: "동두천시", dongs: ["생연동", "보산동", "동두천동", "상패동", "중앙동", "송내동", "불현동"] },
      guri: { name: "구리시", dongs: ["갈매동", "동구동", "인창동", "교문동", "토평동", "수택동"] },
      namyangju: { name: "남양주시", dongs: ["와부읍", "진접읍", "화도읍", "수동면", "조안면", "퇴계원읍", "별내면", "별내동", "금곡동", "양정동", "다산동", "평내동", "호평동", "오남읍"] },
      osan: { name: "오산시", dongs: ["중앙동", "신장동", "세마동", "초평동", "대원동"] },
      siheung: { name: "시흥시", dongs: ["대야동", "신천동", "신현동", "은행동", "매화동", "목감동", "군자동", "월곶동", "정왕동", "배곧동", "과림동", "연성동"] },
      gunpo: { name: "군포시", dongs: ["군포동", "산본동", "금정동", "재궁동", "오금동", "수리동", "대야미동"] },
      uiwang: { name: "의왕시", dongs: ["고천동", "부곡동", "내손동", "청계동", "오전동"] },
      hanam: { name: "하남시", dongs: ["천현동", "신장동", "덕풍동", "감북동", "위례동", "미사동", "춘궁동", "초이동"] },
      paju: { name: "파주시", dongs: ["문산읍", "조리읍", "법원읍", "파주읍", "탄현면", "광탄면", "월롱면", "적성면", "파평면", "교하동", "운정동", "금촌동"] },
      icheon: { name: "이천시", dongs: ["창전동", "중리동", "증포동", "부발읍", "장호원읍"] },
      anseong: { name: "안성시", dongs: ["공도읍", "죽산면", "삼죽면", "보개면", "금광면", "서운면", "미양면", "대덕면", "원곡면", "양성면", "안성동"] },
      gimpo: { name: "김포시", dongs: ["고촌읍", "통진읍", "대곶면", "월곶면", "하성면", "사우동", "풍무동", "장기동", "구래동", "운양동", "마산동"] },
      hwaseong: { name: "화성시", dongs: ["봉담읍", "우정읍", "향남읍", "남양읍", "매송면", "비봉면", "팔탄면", "장안면", "양감면", "정남면", "새솔동", "진안동", "병점동", "반월동", "기배동", "화산동", "동탄동"] },
      gwangju: { name: "광주시", dongs: ["오포읍", "초월읍", "퇴촌면", "남종면", "남한산성면", "송정동", "광남동"] },
      yangju: { name: "양주시", dongs: ["회천동", "양주동", "백석읍", "은현면", "남면", "장흥면"] },
      pochon: { name: "포천시", dongs: ["소흘읍", "군내면", "내촌면", "가산면", "일동면", "이동면", "영중면", "창수면", "관인면", "화현면", "포천동", "선단동"] },
      yeoju: { name: "여주시", dongs: ["여흥동", "중앙동", "오학동", "가남읍"] },
      yeoncheon: { name: "연천군", dongs: ["연천읍", "전곡읍", "군남면", "청산면", "백학면", "미산면", "왕징면", "신서면", "중면"] },
      gapyeong: { name: "가평군", dongs: ["가평읍", "설악면", "청평면", "상면", "조종면", "북면"] },
      yangpyeong: { name: "양평군", dongs: ["양평읍", "강상면", "강하면", "양서면", "옥천면", "지평면", "용문면", "개군면"] },
      gwacheon: { name: "과천시", dongs: ["중앙동", "갈현동", "별양동", "부림동", "원문동", "과천동", "문원동"] }
    }
  },
  incheon: {
    name: "인천광역시",
    districts: {
      jemulpo: { name: "제물포구", dongs: ["신포동", "연안동", "신흥동", "도원동", "율목동", "동인천동", "만석동", "화수동", "송현동", "송림동", "금창동", "개항동"] },
      yeongjong: { name: "영종구", dongs: ["영종동", "용유동", "운서동", "중산동", "운남동", "운북동"] },
      michuhol: { name: "미추홀구", dongs: ["숭의동", "용현동", "학익동", "도화동", "주안동", "관교동", "문학동"] },
      yeonsu: { name: "연수구", dongs: ["옥련동", "선학동", "연수동", "청학동", "동춘동", "송도동"] },
      namdong: { name: "남동구", dongs: ["구월동", "간석동", "만수동", "서창동", "남촌도림동", "논현동", "논현고잔동", "장수서창동"] },
      bupyeong: { name: "부평구", dongs: ["부평동", "산곡동", "청천동", "갈산동", "삼산동", "부개동", "일신동", "십정동"] },
      gyeyang: { name: "계양구", dongs: ["효성동", "계산동", "작전동", "작전서운동", "계양동"] },
      seohae: { name: "서해구", dongs: ["연희동", "가정동", "석남동", "가좌동", "신현원창동", "청라동"] },
      geomdan: { name: "검단구", dongs: ["검단동", "불로대곡동", "원당동", "아라동", "당하동", "오류왕길동", "마전동", "검암경서동"] },
      ganghwa: { name: "강화군", dongs: ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"] },
      ongjin: { name: "옹진군", dongs: ["북도면", "연평면", "백령면", "대청면", "덕적면", "자월면", "영흥면"] }
    }
  }
};

// 2. 기본 제휴 샵 데이터
const BUSINESSES = [
  { id: 1, name: "오늘밤 테라피 케어", city: "서울특별시", district: "강남구", dong: "개포동", category: "출장 홈케어", address: "서울 전 지역 신속 출장", phone: "050712803199", price: "힐링 60분 100,000원", image: "/shop1.jpg" },
  { id: 2, name: "퀸즈홈테라피 케어", city: "서울특별시", district: "강남구", dong: "개포동", category: "아로마 마사지", address: "서울 강남구 개포동·대치동 출장", phone: "050712803296", price: "아로마 90분 110,000원", image: "/shop2.jpg" },
  { id: 3, name: "한국미인테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "스웨디시 케어", address: "서울 강남구 개포동 전 지역 출장", phone: "050712803140", price: "스페셜 90분 130,000원", image: "/shop3.jpg" },
  { id: 4, name: "주주테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "스웨디시 케어", address: "서울 강남구 개포동 전 지역 출장", phone: "050712803197", price: "스페셜 90분 130,000원", image: "/shop4.jpg" },
  { id: 5, name: "한국골든테라피", city: "서울특별시", district: "강남구", dong: "개포동", category: "스웨디시 케어", address: "서울 강남구 개포동 전 지역 출장", phone: "050712803360", price: "스페셜 90분 130,000원", image: "/shop5.jpg" }
];

export default function HomeThaiZonePage() {
  const [cityKey, setCityKey] = useState<string>("seoul");
  const [districtKey, setDistrictKey] = useState<string>("gangnam");
  const [selectedDong, setSelectedDong] = useState<string>("개포1동");

  const currentCity = RAW_METRO_DATA[cityKey];
  const districts = currentCity?.districts || {};
  const currentDistrict = districts[districtKey];
  const dongs = currentDistrict?.dongs || [];

  const areaLabel = selectedDong ? `${currentDistrict?.name} ${selectedDong}` : currentDistrict ? currentDistrict.name : currentCity.name;

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
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
          <a href="tel:050712803199" className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all">
            📞 24시 전화상담
          </a>
        </div>
      </header>

      {/* 필터 셀렉트 바 */}
      <div className="bg-[#0d0d10] border-b border-white/5 py-3 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-2 md:gap-4">
          <select 
            value={cityKey} 
            onChange={(e) => { setCityKey(e.target.value); setDistrictKey(Object.keys(RAW_METRO_DATA[e.target.value].districts)[0]); setSelectedDong(""); }}
            className="bg-black/60 border border-white/10 rounded-xl text-xs md:text-sm p-2.5 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(RAW_METRO_DATA).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={districtKey} 
            onChange={(e) => { setDistrictKey(e.target.value); setSelectedDong(""); }}
            className="bg-black/60 border border-white/10 rounded-xl text-xs md:text-sm p-2.5 text-gray-200 outline-none focus:border-amber-500"
          >
            {Object.entries(districts).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>

          <select 
            value={selectedDong} 
            onChange={(e) => setSelectedDong(e.target.value)}
            className="bg-black/60 border border-white/10 rounded-xl text-xs md:text-sm p-2.5 text-gray-200 outline-none focus:border-amber-500"
          >
            <option value="">동 전체</option>
            {dongs.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        
        {/* 인트로 메인 배너 */}
        <section className="bg-gradient-to-b from-[#141418] to-[#0a0a0c] border border-amber-500/30 rounded-3xl p-6 md:p-10 text-center space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase">
            METRO HOMETHAI DIRECTORY
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            <span className="text-amber-400">{areaLabel}</span> 출장 홈케어 마사지
          </h1>
          <p className="text-xs md:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            {areaLabel}에서 홈타이존 출장 프라이빗 마사지를 살펴보세요. 타이·아로마·스웨디시 등 100% 선입금 없는 안심 후불제로 25분 내 빠르게 찾아갑니다.
          </p>
        </section>

        {/* 제휴 샵 목록 */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-black text-white">💎 {areaLabel} 추천 제휴샵</h2>
            <span className="text-xs text-amber-400 font-bold">100% 후불 안심</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUSINESSES.map((shop) => (
              <div key={shop.id} className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-5 rounded-2xl flex gap-4 items-center transition-all">
                <div className="w-20 h-20 bg-neutral-800 rounded-xl overflow-hidden shrink-0 border border-white/5">
                  <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/20">
                    {shop.category}
                  </span>
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate mt-1">
                    {shop.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 truncate">{shop.address}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-400">{shop.price}</span>
                    <a 
                      href={`tel:${shop.phone}`} 
                      className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xs px-3 py-1.5 rounded-lg transition-transform active:scale-95"
                    >
                      전화예약
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 코스 및 요금표 */}
        <section className="bg-[#0f0f12] border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
          <h2 className="text-lg md:text-xl font-black text-white text-center">💎 홈타이존 표준 코스 및 요금표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-xs md:text-sm min-w-[400px]">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 pb-2">
                  <th className="py-2.5 text-left">코스명</th>
                  <th className="py-2.5">60분</th>
                  <th className="py-2.5">90분</th>
                  <th className="py-2.5">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                <tr><td className="py-3 text-left font-bold">타이마사지</td><td className="text-amber-400 font-bold">60,000원</td><td className="text-amber-400 font-bold">80,000원</td><td className="text-amber-400 font-bold">100,000원</td></tr>
                <tr><td className="py-3 text-left font-bold">아로마마사지</td><td className="text-amber-400 font-bold">70,000원</td><td className="text-amber-400 font-bold">90,000원</td><td className="text-amber-400 font-bold">110,000원</td></tr>
                <tr><td className="py-3 text-left font-bold">힐링마사지</td><td className="text-amber-400 font-bold">100,000원</td><td className="text-amber-400 font-bold">110,000원</td><td className="text-amber-400 font-bold">130,000원</td></tr>
                <tr><td className="py-3 text-left font-bold">감성 스웨디시</td><td className="text-amber-400 font-bold">140,000원</td><td className="text-amber-400 font-bold">160,000원</td><td className="text-gray-600">—</td></tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* 푸터 */}
      <footer className="bg-[#030303] border-t border-white/10 py-8 text-center text-xs text-gray-500">
        <p className="text-gray-400 font-bold">홈타이존 (HomeThaiZone) · 수도권 전지역 100% 안심 후불제</p>
        <p className="text-[11px] mt-1">© 2026 홈타이존. All rights reserved.</p>
      </footer>

    </div>
  );
}