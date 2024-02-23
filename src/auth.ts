import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  // 사용자가 로그인 페이지에 액세스하거나 새 사용자를 생성하는 경우
  // 이동할 페이지의 경로를 설정합니다.
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  // callbacks: {
  //   // 사용자의 인증 상태를 확인하고 처리하는 콜백 함수
  //   // request = 현재 요청에 대한 정보를 담고 있는 객체
  //   // auth = 사용자의 인증 상태를 나타내는 값
  //   async authorized({ request, auth }) {
  //     const url = request.nextUrl;
  //     // 사용자가 인증되지 않은 경우 로그인 페이지로
  //     if (!auth) {
  //       return NextResponse.redirect("http://localhost:3000/i/flow/login");
  //     }
  //     // 사용자가 인증되었거나 리디렉션이 필요하지 않은 경우 true를 반환하여 접근 허용
  //     return true;
  //   },
  // },
  providers: [
    // 인증 제공자로 사용할 CredentialsProvider를 가져옵니다.
    // 이것은 사용자가 자격 증명(예: 사용자 이름 및 비밀번호)을 사용하여
    // 로그인할 수 있도록 하는 특정한 인증 방법을 제공합니다

    CredentialsProvider({
      // authorize: 사용자가 자격 증명을 제출하면 호출되는 함수입니다.
      // 이 함수는 사용자가 제출한 자격 증명을 받아와서 서버로 전송하고,
      // 서버에서 이를 검증하고 사용자 정보를 반환합니다.
      // 이 반환된 사용자 정보는 세션에 저장되어 사용자가 로그인한 상태를 유지하게 됩니다.

      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
