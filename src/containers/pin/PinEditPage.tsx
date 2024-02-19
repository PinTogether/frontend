import EditPageLayout, {
  H3Wrapper,
  SectionWrapper,
  Line,
} from "../layout/EditPageLayout";
import { EditIcon, SearchIcon } from "@/components/IconSvg";
import { LocationCard } from "@/components/PinCard";
import CardSlider from "@/components/CardSlider";
import CollectionCard from "@/components/CollectionCard";
import IPin from "@/types/IPin";
import ICollection from "@/types/ICollection";
import styles from "@/styles/containers/pin/_pinEditPage.module.scss";

const pinData: IPin = {
  id: 1,
  serviceId: "string",
  localCode: 1,
  localManageCode: "string",
  statusNumber: 1,
  status: "string",
  phone: "string",
  zipCode: "string",
  roadNumberAddress: "string",
  roadNameAddress: "도로명 주소",
  roadZipCode: "string",
  placeName: "강릉 옹심이 막국수",
  category: "음식점",
  x: 1,
  y: 1,
  comment: "string",
};

const collectionData: ICollection = {
  id: 1,
  title: "강릉_주민_맛집",
  ownerId: 1,
  ownerNickname: "개포동_맛조개",
  thumbnail: "/images/cat_dummy.jpeg",
  detail: "string",
  likeCnt: 24,
  pinCnt: 3,
};

export default function PinEditPage() {
  return (
    <EditPageLayout>
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          핀을 추가할 컬렉션
        </H3Wrapper>
        <input
          className={styles.searchInput}
          // onChange={onChangeNickname}
          // value={inputNickname}
          placeholder="내 컬렉션에서 검색하기"
        />
        {/* <SearchIcon className={styles.searchIcon} /> */}
        <CardSlider>
          <CollectionCard collectionData={collectionData} horizontal={true} />
          <CollectionCard collectionData={collectionData} horizontal={true} />
          <CollectionCard collectionData={collectionData} horizontal={true} />
          <CollectionCard collectionData={collectionData} horizontal={true} />
        </CardSlider>
      </SectionWrapper>
      {/* <Line /> */}
      <SectionWrapper>
        <H3Wrapper>
          <EditIcon />
          {`"강릉_주민_맛집"에 추가할 핀`}
        </H3Wrapper>
        <LocationCard locationData={pinData} simple={true} />
        <textarea
          className={styles.reviewTextArea}
          placeholder="리뷰를 남겨주세요"
          rows={2}
        />
      </SectionWrapper>
      <Line />
      <SectionWrapper>
        <button className={styles.submitButton}>핀 추가하기</button>
      </SectionWrapper>
    </EditPageLayout>
  );
}
