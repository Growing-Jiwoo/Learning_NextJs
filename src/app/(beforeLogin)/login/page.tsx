"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.replace("/home");
  }

  router.replace("i/flow/login");
  return <Main />;
}
