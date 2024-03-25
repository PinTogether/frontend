import { ProfileMine } from "@/types/Profile";
import { useStore } from "react-redux";
import { useAppSelector } from "@/redux/hooks";

const useGetMyProfile = (): ProfileMine | null => {
  const myProfile = useAppSelector((state) => state.myProfile);
  return myProfile;
};

export default useGetMyProfile;
