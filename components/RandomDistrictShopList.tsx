"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface ShopItem {
  id: string;
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: {
    category: string;
    badge?: string;
    desc: string;
    items: {
      time: string;
      price: string;
      recommend?: boolean;
    }[];
  }[];
  features: string[];
}

interface Props {
  initialShops: ShopItem[];
  fullTitle: string;
  city: string;
  district: string;
}

export default function RandomDistrictShopList({
  initialShops,
  fullTitle,
  city,
  district,
}: Props) {
  const [shops, setShops] = useState<ShopItem[]>(initialShops);

  // 새로고침 시 무작위 순서 셔플 (Fisher-Yates 알고리즘)
  useEffect(() => {
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, [initialShops]);

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
          <span>✨</span> {fullTitle} 제휴 테라피 파트너
        </h2>
        <span className="text-[11px] text-slate-400 font-medium">
          실시간 맞춤 순서 안내
        </span>
      </div>

      <div className="space-y-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white border border-slate-200 hover:border-sky-300 rounded-3xl p-6 transition-all shadow-sm group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                    {shop.badge}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold">
                    ● 실시간 예약 가능
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                  {shop.name}
                </h3>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {shop.desc}
                </p>

                {/* 특징 뱃지 */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {shop.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* 우측 가격 요약 및 예약 버튼 */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t border-slate-100 md:border-0 pt-4 md:pt-0 shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block">
                    대표 기본 코스
                  </span>
                  <span className="text-base md:text-lg font-black text-sky-600">
                    {shop.courses[0]?.items[0]?.price || "상담 안내"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${shop.phone}`}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95 flex items-center gap-1"
                  >
                    📞 전화 예약
                  </a>
                  <Link
                    href={`/${city}/${district}/shop/${shop.id}`}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl transition"
                  >
                    상세보기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}