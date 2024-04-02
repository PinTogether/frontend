import { useAppSelector } from "@/redux/hooks";

const useCheckIsMyMembername = (membername: string) => {
  const myProfileState = useAppSelector((state) => state.myProfile);

  try {
    if (myProfileState) {
      const decodedMembername = decodeURIComponent(membername);
      return myProfileState.membername == decodedMembername;
    } else {
      return false;
    }
  } catch (error) {
    // console.error("checkIsMyId", error);
    return false;
  }
};
export default useCheckIsMyMembername;
