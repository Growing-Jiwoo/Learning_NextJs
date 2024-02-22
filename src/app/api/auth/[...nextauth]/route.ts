export { GET, POST } from "../../../../auth";
// 현재 경로가 api폴더 내에 auth폴더고
// [...] 중괄호 안에 점이 3개 있는 catch-all route를 사용하고 있으므로
// api/auth에 해당하는 GET,POST api는 전부 next-auth가 관리하게된다는 뜻
