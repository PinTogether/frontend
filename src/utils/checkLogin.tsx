import { ProfileMine } from "@/types/Profile";

const checkIsLogin = () => {
  const myProfile = localStorage.getItem("myProfile");

  try {
    if (myProfile) {
      const returnedProfile: ProfileMine = JSON.parse(myProfile);
      return returnedProfile.id ? true : false;
    }
    return false;
  } catch (error) {
    // console.error("checkLogined", error);
    return false;
  }
};
export default checkIsLogin;
