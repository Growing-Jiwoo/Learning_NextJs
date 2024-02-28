"use client";

import useSocket from "../_lib/useSocket";

export default function WebSocketComponent() {
  useSocket(); // 해당 컴포넌트는 useSocket을 호출하여 소켓 연결을 맺어줌

  return null;
}
