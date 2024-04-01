import { useAppSelector } from "@/redux/hooks";

const useCheckIsMyMembername = (membername: string) => {
  const myProfileState = useAppSelector((state) => state.myProfile);

  try {
    console.log("myProfileState", myProfileState);
    console.log("membername", membername);
    if (myProfileState) {
      const decodedMembername = decodeURIComponent(membername);
      console.log("decodedMembername", decodedMembername);
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
