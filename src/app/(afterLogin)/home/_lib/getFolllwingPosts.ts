type Props = { pageParam?: number };
export async function getFollowingPosts() {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    next: {
      tags: ["posts", "followingPosts"],
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
