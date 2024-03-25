import { useAppSelector } from "@/redux/hooks";

const useCheckIsMyId = (id: number) => {
  const myProfileState = useAppSelector((state) => state.myProfile);

  try {
    if (myProfileState) {
      return myProfileState.id == id;
    } else {
      return false;
    }
  } catch (error) {
    // console.error("checkIsMyId", error);
    return false;
  }
};
export default useCheckIsMyId;
