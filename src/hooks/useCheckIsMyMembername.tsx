import { useAppSelector } from "@/redux/hooks";

const useCheckIsMyMembername = (membername: string) => {
  const myProfileState = useAppSelector((state) => state.myProfile);

  try {
    if (myProfileState) {
      return myProfileState.membername == membername;
    } else {
      return false;
    }
  } catch (error) {
    // console.error("checkIsMyId", error);
    return false;
  }
};
export default useCheckIsMyMembername;
