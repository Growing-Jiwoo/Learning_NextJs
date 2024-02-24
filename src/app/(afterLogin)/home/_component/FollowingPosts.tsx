"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getFollowingPosts } from "../_lib/getFolllwingPosts";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FollowingPosts() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ["posts", "followingPosts"],
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      queryFn: getFollowingPosts,
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });

  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  return (
    <>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
