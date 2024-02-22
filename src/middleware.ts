import { auth as middleware } from "./auth";
import { NextResponse } from "next/server";

// export async function middl eware() {
// 페이지보다 더 빨리 실행 됨
//   const session = await auth();
//   if (!session) {
//     return NextResponse.redirect("http://localhost:3000/i/flow/login");
//   }
// }

// See "Matching Paths" below to learn more
export const config = {
  // 로그인을 해야하는 컴포넌트
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
