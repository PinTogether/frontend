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
};

export const IconTest = (): JSX.Element => {
  return (
    <ul className={styles.container}>
      <li>
        <HeartIcon />
        <HeartIcon className={styles.forTest} />
        <HeartFillIcon />
        <HeartFillIcon className={styles.forTest} />
      </li>
      <li>
        <BellIcon />
        <BellIcon className={styles.forTest} />
        <BellFillIcon />
        <BellFillIcon className={styles.forTest} />
      </li>
      <li>
        <LocationIcon />
        <LocationIcon className={styles.forTest} />
        <LocationFillIcon />
        <LocationFillIcon className={styles.forTest} />
      </li>
      <li>
        <SearchIcon />
        <SearchIcon className={styles.forTest} />
        <SearchFillIcon />
        <SearchFillIcon className={styles.forTest} />
      </li>
      <li>
        <MapIcon />
        <MapIcon className={styles.forTest} />
        <MapFillIcon />
        <MapFillIcon className={styles.forTest} />
      </li>
      <li>
        <HomeIcon />
        <HomeIcon className={styles.forTest} />
        <HomeFillIcon />
        <HomeFillIcon className={styles.forTest} />
      </li>
      <li>
        <BookMarkIcon />
        <BookMarkIcon className={styles.forTest} />
        <BookMarkFillIcon />
        <BookMarkFillIcon className={styles.forTest} />
      </li>
      <li>
        <LinkIcon />
        <LinkIcon className={styles.forTest} />
      </li>
      <li>
        <SettingIcon />
        <SettingIcon className={styles.forTest} />
        <SettingFillIcon />
        <SettingFillIcon className={styles.forTest} />
      </li>
      <li>
        <PinIcon />
        <PinIcon className={styles.forTest} />
        <PinFillIcon />
        <PinFillIcon className={styles.forTest} />
      </li>
      <li>
        <AddSquareIcon />
        <AddSquareIcon className={styles.forTest} />
        <AddSquareFillIcon />
        <AddSquareFillIcon className={styles.forTest} />
      </li>
      <li>
        <EditIcon />
        <EditIcon className={styles.forTest} />
      </li>
      <li>
        <SignInSquareIcon />
        <SignInSquareIcon className={styles.forTest} />
      </li>
      <li>
        <RefreshIcon />
        <RefreshIcon className={styles.forTest} />
      </li>
      <li>
        <UserBoxIcon />
        <UserBoxIcon className={styles.forTest} />
        <UserBoxFillIcon />
        <UserBoxFillIcon className={styles.forTest} />
      </li>
      <li>
        <FlashIcon />
        <FlashIcon className={styles.forTest} />
      </li>
      <li>
        <ImgLoadIcon />
        <ImgLoadIcon className={styles.forTest} />
      </li>
    </ul>
  );
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
