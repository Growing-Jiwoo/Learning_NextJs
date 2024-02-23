"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.css";

export default function TrendSection() {
  const { data: session } = useSession();
  const pathName: string = usePathname();
  if (pathName === "/explore") return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>
        <h3>트렌드를 가져올 수 없습니다.</h3>
      </div>
    </div>
  );
}
