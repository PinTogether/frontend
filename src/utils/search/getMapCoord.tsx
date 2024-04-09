import { useAppSelector } from "@/redux/hooks";

export default function getMapCoord(){
  const mapNESW = useAppSelector((state) => state.location.mapNESW);
  return(
    mapNESW
  )
}
