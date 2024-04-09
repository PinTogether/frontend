import styles from "@/styles/containers/overlay/_overlay.module.scss";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { locationGetterByAmount } from "@/redux/locationSlice";

export default function OverlayTopper() {
  const dispatch = useAppDispatch();
  const sidoName = useAppSelector((state) => state.location.sido);
  const sggName = useAppSelector((state) => state.location.sgg);
  const emdongName = useAppSelector((state) => state.location.emdong);
  const locationGetter = useAppSelector(
    (state) => state.location.locationGetter
  );

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
        <button className={styles.topButton} onClick={getLocation}>
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
        <button className={styles.topButton2}>
          <img src="/icons/restaurant.svg" alt="cafe" width="18px" height="18px" />
          음식점
          </button>
        <button className={styles.topButton2}>
          <img src="/icons/cafe.svg" alt="cafe" width="18px" height="18px" />
          카페
        </button>
      </div>
    </div>
  );
}
