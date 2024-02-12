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
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseRoundIcon,
  AddRoundIcon,
  CommentIcon,
};

import HeartSvg from "/public/icons/heart.svg";
const HeartIcon = ({ className, ...rest }: IconProps) => {
  return <HeartSvg className={className ? className : styles.icon} {...rest} />;
};
import HeartFillSvg from "/public/icons/heart_filled.svg";
const HeartFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <HeartFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import BellSvg from "/public/icons/bell.svg";
const BellIcon = ({ className, ...rest }: IconProps) => {
  return <BellSvg className={className ? className : styles.icon} {...rest} />;
};
import BellFillSvg from "/public/icons/bell_filled.svg";
const BellFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <BellFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import LocationSvg from "/public/icons/location.svg";
const LocationIcon = ({ className, ...rest }: IconProps) => {
  return (
    <LocationSvg className={className ? className : styles.icon} {...rest} />
  );
};
import LocationFillSvg from "/public/icons/location_filled.svg";
const LocationFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <LocationFillSvg
      className={className ? className : styles.icon}
      {...rest}
    />
  );
};

import SearchSvg from "/public/icons/search.svg";
const SearchIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SearchSvg className={className ? className : styles.icon} {...rest} />
  );
};
import SearchFillSvg from "/public/icons/search_filled.svg";
const SearchFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SearchFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import MapSvg from "/public/icons/map.svg";
const MapIcon = ({ className, ...rest }: IconProps) => {
  return <MapSvg className={className ? className : styles.icon} {...rest} />;
};
import MapFillSvg from "/public/icons/map_filled.svg";
const MapFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <MapFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import HomeSvg from "/public/icons/home.svg";
const HomeIcon = ({ className, ...rest }: IconProps) => {
  return <HomeSvg className={className ? className : styles.icon} {...rest} />;
};
import HomeFillSvg from "/public/icons/home_filled.svg";
const HomeFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <HomeFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import BookMarkSvg from "/public/icons/bookmark.svg";
const BookMarkIcon = ({ className, ...rest }: IconProps) => {
  return (
    <BookMarkSvg className={className ? className : styles.icon} {...rest} />
  );
};
import BookMarkFillSvg from "/public/icons/bookmark_filled.svg";
const BookMarkFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <BookMarkFillSvg
      className={className ? className : styles.icon}
      {...rest}
    />
  );
};

import LinkSvg from "/public/icons/link.svg";
const LinkIcon = ({ className, ...rest }: IconProps) => {
  return <LinkSvg className={className ? className : styles.icon} {...rest} />;
};

import SettingSvg from "/public/icons/setting.svg";
const SettingIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SettingSvg className={className ? className : styles.icon} {...rest} />
  );
};
import SettingFillSvg from "/public/icons/setting_filled.svg";
const SettingFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SettingFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import PinSvg from "/public/icons/pin.svg";
const PinIcon = ({ className, ...rest }: IconProps) => {
  return <PinSvg className={className ? className : styles.icon} {...rest} />;
};
import PinFillSvg from "/public/icons/pin_filled.svg";
const PinFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <PinFillSvg className={className ? className : styles.icon} {...rest} />
  );
};

import AddSquareSvg from "/public/icons/add_square.svg";
const AddSquareIcon = ({ className, ...rest }: IconProps) => {
  return (
    <AddSquareSvg className={className ? className : styles.icon} {...rest} />
  );
};
import AddSquareFillSvg from "/public/icons/add_square_filled.svg";
const AddSquareFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <AddSquareFillSvg
      className={className ? className : styles.icon}
      {...rest}
    />
  );
};

import EditSvg from "/public/icons/edit.svg";
const EditIcon = ({ className, ...rest }: IconProps) => {
  return <EditSvg className={className ? className : styles.icon} {...rest} />;
};

import SignInSquareSvg from "/public/icons/sign_in_square.svg";
const SignInSquareIcon = ({ className, ...rest }: IconProps) => {
  return (
    <SignInSquareSvg
      className={className ? className : styles.icon}
      {...rest}
    />
  );
};

import RefreshSvg from "/public/icons/refresh.svg";
const RefreshIcon = ({ className, ...rest }: IconProps) => {
  return (
    <RefreshSvg className={className ? className : styles.icon} {...rest} />
  );
};

import UserBoxSvg from "/public/icons/user_box.svg";
const UserBoxIcon = ({ className, ...rest }: IconProps) => {
  return (
    <UserBoxSvg className={className ? className : styles.icon} {...rest} />
  );
};
import UserBoxFill from "/public/icons/user_box_filled.svg";
const UserBoxFillIcon = ({ className, ...rest }: IconProps) => {
  return (
    <UserBoxFill className={className ? className : styles.icon} {...rest} />
  );
};

import FlashSvg from "/public/icons/flash.svg";
const FlashIcon = ({ className, ...rest }: IconProps) => {
  return <FlashSvg className={className ? className : styles.icon} {...rest} />;
};

import ImgLoadBoxSvg from "/public/icons/img_load_box.svg";
const ImgLoadIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ImgLoadBoxSvg className={className ? className : styles.icon} {...rest} />
  );
};

import ExpandLeftSvg from "/public/icons/expand_left.svg";
const ExpandLeftIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ExpandLeftSvg className={className ? className : styles.icon} {...rest} />
  );
};
import ExpandRightSvg from "/public/icons/expand_right.svg";
const ExpandRightIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ExpandRightSvg className={className ? className : styles.icon} {...rest} />
  );
};

import ArrowDropDownSvg from "/public/icons/arrow_drop_down.svg";
const ArrowDropDownIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ArrowDropDownSvg
      className={className ? className : styles.icon}
      {...rest}
    />
  );
};
import ArrowDropUpSvg from "/public/icons/arrow_drop_up.svg";
const ArrowDropUpIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ArrowDropUpSvg className={className ? className : styles.icon} {...rest} />
  );
};
import ArrowLeftSvg from "/public/icons/arrow_drop_left.svg";
const ArrowLeftIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ArrowLeftSvg className={className ? className : styles.icon} {...rest} />
  );
};
import ArrowRightSvg from "/public/icons/arrow_drop_right.svg";
const ArrowRightIcon = ({ className, ...rest }: IconProps) => {
  return (
    <ArrowRightSvg className={className ? className : styles.icon} {...rest} />
  );
};

import CloseRoundSvg from "/public/icons/close_round.svg";
const CloseRoundIcon = ({ className, ...rest }: IconProps) => {
  return (
    <CloseRoundSvg className={className ? className : styles.icon} {...rest} />
  );
};

import AddRoundSvg from "/public/icons/add_round.svg";
import { createElement } from "react";
const AddRoundIcon = ({ className, ...rest }: IconProps) => {
  return (
    <AddRoundSvg className={className ? className : styles.icon} {...rest} />
  );
};

import CommentSvg from "/public/icons/comment.svg";
const CommentIcon = ({ className, ...rest }: IconProps) => {
  return (
    <CommentSvg className={className ? className : styles.icon} {...rest} />
  );
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
  { component: ArrowDropDownIcon, name: "ArrowDropDownIcon" },
  { component: ArrowDropUpIcon, name: "ArrowDropUpIcon" },
  { component: ArrowLeftIcon, name: "ArrowLeftIcon" },
  { component: ArrowRightIcon, name: "ArrowRightIcon" },
  { component: CloseRoundIcon, name: "CloseRoundIcon" },
  { component: AddRoundIcon, name: "AddRoundIcon" },
  { component: CommentIcon, name: "CommentIcon" },
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
