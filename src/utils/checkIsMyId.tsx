import { ProfileMine } from "@/types/Profile";

const checkIsMyId = (id: number) => {
  const myProfile = localStorage.getItem("myProfile");

  try {
    if (myProfile) {
      const returnedProfile: ProfileMine = JSON.parse(myProfile);
      return returnedProfile.id == id;
    } else {
      return false;
    }
  } catch (error) {
    // console.error("checkIsMyId", error);
    return false;
  }
};
export default checkIsMyId;
