import { RefObject, useState, useEffect } from "react";

const useIntersectionObserver = (
  targetRef: RefObject<HTMLDivElement>,
  option: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // observer 생성 및 설정
    const callback = (entries: IntersectionObserverEntry[]) => {
      console.log("검색");
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("IsIntersecting", entry.target);
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, option);
    if (targetRef.current) observer.observe(targetRef.current);
    return () => {
      console.log("unmount");
      if (targetRef.current) observer.unobserve(targetRef.current);
      observer.disconnect();
    };
  }, []);
  return isIntersecting;
};
export default useIntersectionObserver;
