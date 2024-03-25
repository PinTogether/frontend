import { useAppSelector } from "../redux/hooks";

const useCheckIsLogin = () => {
  const myProfileState = useAppSelector((state) => state.myProfile);

  try {
    return myProfileState?.id ? true : false;
  } catch (error) {
    // console.error("checkLogined", error);
    return false;
  }
};
export default useCheckIsLogin;
