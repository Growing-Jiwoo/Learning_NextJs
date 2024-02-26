"use client";

import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getPostRecommends } from "../_lib/getPostRecommends";

export default function PostRecommends() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isPending,
    isLoading,
    isError,
  } = useSuspenseInfiniteQuery<
    IPost[],
    Object,
    InfiniteData<IPost[]>, // useInfiniteQuery 사용 시 세 번째 인자값은 InfiniteData 타입을 사용해야함
    [_1: string, _2: string],
    number // initialPageParam 타입
  >({
    queryKey: ["posts", "recommends"],
    initialPageParam: 0,
    queryFn: getPostRecommends,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // 받아오는 페이지를 마지막부터 5개씩
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  // threshold = ref를 설정한 ui가 몇픽셀까지 보여지면 이벤트를 호출할건지
  // delay = ref를 설정한 ui가 몇픽셀까지 보여지고 몇초 뒤에 이벤트를 호출할건지

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  // inView가 평소에 false이다가 ref를 지정한 ui가 보여지면 true로 바뀌면서 useEffect가 작동하게끔
  useEffect(() => {
    if (inView) {
      // inView가 true 일 때
      // 다음 페이지가 있을 때 (hasNextPage)
      // 데이터를 호출중이지 않을 때 (!isFetching)
      // 다음 페이지 데이터 (fetchNextPage)를 호출
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, fetchNextPage, isFetching, hasNextPage]);

  return (
    <>
      {/* useInfiniteQuery는 2차원 배열로 페이지가 생성됨
        ex) [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]]
      */}
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
