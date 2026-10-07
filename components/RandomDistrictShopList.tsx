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
  features?: string[];
}

interface Props {
  initialShops: ShopItem[];
  districtName?: string;
  fullTitle?: string;
  city: string;
  district: string;
}

export default function RandomDistrictShopList({
  initialShops,
  districtName,
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

  const displayTitle = districtName || fullTitle || "지역";

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
          <span>✨</span> {displayTitle} 추천