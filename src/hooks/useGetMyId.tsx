import { ProfileMine } from "@/types/Profile";
import { useAppSelector } from "@/redux/hooks";

const useGetMyId = () => {
  const myProfile = useAppSelector((state) => state.myProfile);

  return myProfile?.id;
};
export default useGetMyId;
