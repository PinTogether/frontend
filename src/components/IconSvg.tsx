import styles from "@/styles/components/_iconsvg.module.scss";

// import 하는 svg 파일에서 width, height 삭제하기
// <svg> 태그에 fill="currentColor" stroke="currentColor" 추가하기
//
// styles.icon 에서 width, height, color 기본값 설정함

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  // 기타 추가할 커스텀 속성들을 여기에 추가할 수 있습니다.
}

export {
  HeartIcon,
  HeartFillIcon,
  BellIcon,
  BellFillIcon,
  LocationIcon,
  LocationFillIcon,
  SearchIcon,
  SearchFillIcon,
  MapIcon,
  MapFillIcon,
  HomeIcon,
  HomeFillIcon,
  BookMarkIcon,
  BookMarkFillIcon,
  LinkIcon,
  SettingIcon,
  SettingFillIcon,
  PinIcon,
  PinFillIcon,
  AddSquareIcon,
  AddSquareFillIcon,
  EditIcon,
  SignInSquareIcon,
  RefreshIcon,
  UserBoxIcon,
  UserBoxFillIcon,
  FlashIcon,
  ImgLoadIcon,
  ExpandLeftIcon,
  ExpandRightIcon,
  ExpendUpIcon,
  ExpendDownIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseRoundIcon,
  AddRoundIcon,
  CommentIcon,
  ZimmIcon,
  StarIcon,
  StarFilledIcon,
  CheckRingRoundIcon,
};

import HeartSvg from "/public/icons/heart.svg";
const HeartIcon = ({ className, ...rest }: IconProps) => {
  return <HeartSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import HeartFillSvg from "/public/icons/heart_filled.svg";
const HeartFillIcon = ({ className, ...rest }: IconProps) => {
  return <HeartFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import BellSvg from "/public/icons/bell.svg";
const BellIcon = ({ className, ...rest }: IconProps) => {
  return <BellSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import BellFillSvg from "/public/icons/bell_filled.svg";
const BellFillIcon = ({ className, ...rest }: IconProps) => {
  return <BellFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import LocationSvg from "/public/icons/location.svg";
const LocationIcon = ({ className, ...rest }: IconProps) => {
  return <LocationSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import LocationFillSvg from "/public/icons/location_filled.svg";
const LocationFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <LocationFillSvg className={`${styles.icon} ${className}`} {...rest} />
  );
};

import SearchSvg from "/public/icons/search.svg";
const SearchIcon = ({ className, ...rest }: IconProps) => {
  return <SearchSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import SearchFillSvg from "/public/icons/search_filled.svg";
const SearchFillIcon = ({ className, ...rest }: IconProps) => {
  return <SearchFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import MapSvg from "/public/icons/map.svg";
const MapIcon = ({ className, ...rest }: IconProps) => {
  return <MapSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import MapFillSvg from "/public/icons/map_filled.svg";
const MapFillIcon = ({ className, ...rest }: IconProps) => {
  return <MapFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import HomeSvg from "/public/icons/home.svg";
const HomeIcon = ({ className, ...rest }: IconProps) => {
  return <HomeSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import HomeFillSvg from "/public/icons/home_filled.svg";
const HomeFillIcon = ({ className, ...rest }: IconProps) => {
  return <HomeFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import BookMarkSvg from "/public/icons/bookmark.svg";
const BookMarkIcon = ({ className, ...rest }: IconProps) => {
  return <BookMarkSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import BookMarkFillSvg from "/public/icons/bookmark_filled.svg";
const BookMarkFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <BookMarkFillSvg className={`${styles.icon} ${className}`} {...rest} />
  );
};

import LinkSvg from "/public/icons/link.svg";
const LinkIcon = ({ className, ...rest }: IconProps) => {
  return <LinkSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import SettingSvg from "/public/icons/setting.svg";
const SettingIcon = ({ className, ...rest }: IconProps) => {
  return <SettingSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import SettingFillSvg from "/public/icons/setting_filled.svg";
const SettingFillIcon = ({ className, ...rest }: IconProps) => {
  return <SettingFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import PinSvg from "/public/icons/pin.svg";
const PinIcon = ({ className, ...rest }: IconProps) => {
  return <PinSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import PinFillSvg from "/public/icons/pin_filled.svg";
const PinFillIcon = ({ className, ...rest }: IconProps) => {
  return <PinFillSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import AddSquareSvg from "/public/icons/add_square.svg";
const AddSquareIcon = ({ className, ...rest }: IconProps) => {
  return <AddSquareSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import AddSquareFillSvg from "/public/icons/add_square_filled.svg";
const AddSquareFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <AddSquareFillSvg className={`${styles.icon} ${className}`} {...rest} />
  );
};

import EditSvg from "/public/icons/edit.svg";
const EditIcon = ({ className, ...rest }: IconProps) => {
  return <EditSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import SignInSquareSvg from "/public/icons/sign_in_square.svg";
const SignInSquareIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SignInSquareSvg className={`${styles.icon} ${className}`} {...rest} />
  );
};

import RefreshSvg from "/public/icons/refresh.svg";
const RefreshIcon = ({ className, ...rest }: IconProps) => {
  return <RefreshSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import UserBoxSvg from "/public/icons/user_box.svg";
const UserBoxIcon = ({ className, ...rest }: IconProps) => {
  return <UserBoxSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import UserBoxFill from "/public/icons/user_box_filled.svg";
const UserBoxFillIcon = ({ className, ...rest }: IconProps) => {
  return <UserBoxFill className={`${styles.icon} ${className}`} {...rest} />;
};

import FlashSvg from "/public/icons/flash.svg";
const FlashIcon = ({ className, ...rest }: IconProps) => {
  return <FlashSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ImgLoadBoxSvg from "/public/icons/img_load_box.svg";
const ImgLoadIcon = ({ className, ...rest }: IconProps) => {
  return <ImgLoadBoxSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ExpandLeftSvg from "/public/icons/expand_left.svg";
const ExpandLeftIcon = ({ className, ...rest }: IconProps) => {
  return <ExpandLeftSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import ExpandRightSvg from "/public/icons/expand_right.svg";
const ExpandRightIcon = ({ className, ...rest }: IconProps) => {
  return <ExpandRightSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ExpendUpSvg from "/public/icons/expand_up.svg";
const ExpendUpIcon = ({ className, ...rest }: IconProps) => {
  return <ExpendUpSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ExpendDownSvg from "/public/icons/expand_down.svg";
const ExpendDownIcon = ({ className, ...rest }: IconProps) => {
  return <ExpendDownSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ArrowDropDownSvg from "/public/icons/arrow_drop_down.svg";
const ArrowDropDownIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ArrowDropDownSvg className={`${styles.icon} ${className}`} {...rest} />
  );
};
import ArrowDropUpSvg from "/public/icons/arrow_drop_up.svg";
const ArrowDropUpIcon = ({ className, ...rest }: IconProps) => {
  return <ArrowDropUpSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import ArrowLeftSvg from "/public/icons/arrow_drop_left.svg";
const ArrowLeftIcon = ({ className, ...rest }: IconProps) => {
  return <ArrowLeftSvg className={`${styles.icon} ${className}`} {...rest} />;
};
import ArrowRightSvg from "/public/icons/arrow_drop_right.svg";
const ArrowRightIcon = ({ className, ...rest }: IconProps) => {
  return <ArrowRightSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import CloseRoundSvg from "/public/icons/close_round.svg";
const CloseRoundIcon = ({ className, ...rest }: IconProps) => {
  return <CloseRoundSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import AddRoundSvg from "/public/icons/add_round.svg";
import { createElement } from "react";
const AddRoundIcon = ({ className, ...rest }: IconProps) => {
  return <AddRoundSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import CommentSvg from "/public/icons/comment.svg";
const CommentIcon = ({ className, ...rest }: IconProps) => {
  return <CommentSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import ZimmSvg from "/public/icons/zimm.svg";
const ZimmIcon = ({ className, ...rest }: IconProps) => {
  return <ZimmSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import StarSvg from "/public/icons/star.svg";
const StarIcon = ({ className, ...rest }: IconProps) => {
  return <StarSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import StarFilledSvg from "/public/icons/star_filled.svg";
const StarFilledIcon = ({ className, ...rest }: IconProps) => {
  return <StarFilledSvg className={`${styles.icon} ${className}`} {...rest} />;
};

import CheckRingRound from "/public/icons/check_ring_round.svg";
const CheckRingRoundIcon = ({ className, ...rest }: IconProps) => {
  return <CheckRingRound className={`${styles.icon} ${className}`} {...rest} />;
};

/* for test */
const icons = [
  { component: HeartIcon, name: "HeartIcon" },
  { component: HeartFillIcon, name: "HeartFillIcon" },
  { component: BellIcon, name: "BellIcon" },
  { component: BellFillIcon, name: "BellFillIcon" },
  { component: LocationIcon, name: "LocationIcon" },
  { component: LocationFillIcon, name: "LocationFillIcon" },
  { component: SearchIcon, name: "SearchIcon" },
  { component: SearchFillIcon, name: "SearchFillIcon" },
  { component: MapIcon, name: "MapIcon" },
  { component: MapFillIcon, name: "MapFillIcon" },
  { component: HomeIcon, name: "HomeIcon" },
  { component: HomeFillIcon, name: "HomeFillIcon" },
  { component: BookMarkIcon, name: "BookMarkIcon" },
  { component: BookMarkFillIcon, name: "BookMarkFillIcon" },
  { component: LinkIcon, name: "LinkIcon" },
  { component: SettingIcon, name: "SettingIcon" },
  { component: SettingFillIcon, name: "SettingFillIcon" },
  { component: PinIcon, name: "PinIcon" },
  { component: PinFillIcon, name: "PinFillIcon" },
  { component: AddSquareIcon, name: "AddSquareIcon" },
  { component: AddSquareFillIcon, name: "AddSquareFillIcon" },
  { component: EditIcon, name: "EditIcon" },
  { component: SignInSquareIcon, name: "SignInSquareIcon" },
  { component: RefreshIcon, name: "RefreshIcon" },
  { component: UserBoxIcon, name: "UserBoxIcon" },
  { component: UserBoxFillIcon, name: "UserBoxFillIcon" },
  { component: FlashIcon, name: "FlashIcon" },
  { component: ImgLoadIcon, name: "ImgLoadIcon" },
  { component: ExpandLeftIcon, name: "ExpandLeftIcon" },
  { component: ExpandRightIcon, name: "ExpandRightIcon" },
  { component: ExpendUpIcon, name: "ExpendUpIcon" },
  { component: ExpendDownIcon, name: "ExpendDownIcon" },
  { component: ArrowDropDownIcon, name: "ArrowDropDownIcon" },
  { component: ArrowDropUpIcon, name: "ArrowDropUpIcon" },
  { component: ArrowLeftIcon, name: "ArrowLeftIcon" },
  { component: ArrowRightIcon, name: "ArrowRightIcon" },
  { component: CloseRoundIcon, name: "CloseRoundIcon" },
  { component: AddRoundIcon, name: "AddRoundIcon" },
  { component: CommentIcon, name: "CommentIcon" },
  { component: ZimmIcon, name: "ZimmIcon" },
  { component: StarIcon, name: "StarIcon" },
  { component: StarFilledIcon, name: "StarFilledIcon" },
  { component: CheckRingRoundIcon, name: "CheckRingRoundIcon" },
];

export const IconTest = () => {
  return (
    <ul className={styles.container}>
      {icons.map((icon, index) => (
        <li key={index}>
          {createElement(icon.component, { className: styles.icon })}
          {createElement(icon.component, { className: styles.forTest })}
          {createElement(icon.component, { className: "" })}
          <span>{icon.name}</span>
        </li>
      ))}
    </ul>
  );
};
