import { ProfileMine } from "@/types/Profile";

const getMyId = () => {
  const myProfile = localStorage.getItem("myProfile");

  try {
    if (myProfile) {
      const returnedProfile: ProfileMine = JSON.parse(myProfile);
      return returnedProfile.id;
    } else {
      return null;
    }
  } catch (error) {
    // console.error("getMyId", error);
    return null;
  }
};
export default getMyId;
