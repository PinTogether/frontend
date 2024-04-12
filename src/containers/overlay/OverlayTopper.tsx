import styles from "@/styles/containers/overlay/_overlay.module.scss";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {
  locationGetterByAmount,
  mainContentWidthByAmount,
} from "@/redux/locationSlice";

export default function OverlayTopper() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const sidoName = useAppSelector((state) => state.location.sido);
  const sggName = useAppSelector((state) => state.location.sgg);
  const emdongName = useAppSelector((state) => state.location.emdong);
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );
  const FlexbarWidth = useAppSelector(
    (state) => state.location.mainContentWidth
  );

  function moveURL(url: string) {
    if (FlexbarWidth == "0px") {
      dispatch(mainContentWidthByAmount("500px"));
    }
    router.push(url);
  }

  function getLocation() {
    dispatch(locationGetterByAmount(true));
  }

  const LocationRenderer = () => {
    return (
      <div className={styles.topLocation}>
        <div>{sidoName}</div>
        <div>{sggName}</div>
        <div>{emdongName}</div>
      </div>
    );
  };

  return (
    <div className={styles.topOuter}>
      <div className={styles.top}>
        <button
          className={styles.topButton}
          title="내 위치 불러오기"
          onClick={getLocation}
        >
          {locationGetter && (
            <div className={styles.loader}>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
              <div className={styles.ball}></div>
            </div>
          )}
          {!locationGetter && (
            <img
              src="/icon/location_plain.svg"
              alt="location button"
              className={styles.icon}
            ></img>
          )}
        </button>
        <LocationRenderer />
      </div>
      <div className={styles.topBottom}>
        <button
          className={styles.topButton2}
          title="지도 내 장소 찾기"
          onClick={() => {
            moveURL("/search?keyword=&type=place&rangefilter=map");
          }}
        >
          <img
            src="/icons/location.svg"
            alt="장소"
            width="18px"
            height="18px"
          />
          지도 범위 장소
        </button>
        <button
          className={styles.topButton2}
          title="지도 내 핀 찾기"
          onClick={() => {
            moveURL("/search?keyword=&type=pin&rangefilter=map");
          }}
        >
          <img src="/icons/pin.svg" alt="핀" width="16px" height="16px" />
          지도 범위 핀
        </button>
        {/* <button className={styles.topButton2} title="음식점 찾기" onClick={()=>{moveURL("/search?keyword=음식점&type=place&rangefilter=map")}}>
          <img src="/icons/restaurant.svg" alt="음식점" width="18px" height="18px" />
          음식점
          </button>
        <button className={styles.topButton2} title="카페 찾기" onClick={()=>{moveURL("/search?keyword=카페&type=place&rangefilter=map")}}>
          <img src="/icons/cafe.svg" alt="카페" width="18px" height="18px" />
          카페
        </button> */}
      </div>
    </div>
  );
}
