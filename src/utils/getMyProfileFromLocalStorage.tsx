import { ProfileMine } from "@/types/Profile";

const getMyProfileFromLocalStorage = (): ProfileMine | null => {
  const myProfile = localStorage.getItem("myProfile");

  try {
    if (myProfile) {
      // TODO : 로그인한 유저의 id와 로컬스토리지에 저장된 id가 같은지 확인
      // TODO : cookie auth 가 있지만 로컬스토리지에 프로필 정보가 존재하지 않을 경우 fetch로 받아오기
      const returnedProfile: ProfileMine = JSON.parse(myProfile);
      return returnedProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error("getMyProfileFromLocalStorage", error);
    return null;
  }
};
export default getMyProfileFromLocalStorage;
