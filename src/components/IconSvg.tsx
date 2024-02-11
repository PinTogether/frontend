import styles from "@/styles/components/_iconsvg.module.scss";

// import 하는 svg 파일에서 width, height 삭제하기
// <svg> 태그에 fill="currentColor" stroke="currentColor" 추가하기
//
// styles.icon 에서 width, height, color 기본값 설정함

interface IconProps {
  className?: string;
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
const HeartIcon = ({ className }: { className?: string }) => {
  return <HeartSvg className={className ? className : styles.icon} />;
};
import HeartFillSvg from "/public/icons/heart_filled.svg";
const HeartFillIcon = ({ className }: { className?: string }) => {
  return <HeartFillSvg className={className ? className : styles.icon} />;
};

import BellSvg from "/public/icons/bell.svg";
const BellIcon = ({ className }: IconProps) => {
  return <BellSvg className={className ? className : styles.icon} />;
};
import BellFillSvg from "/public/icons/bell_filled.svg";
const BellFillIcon = ({ className }: IconProps) => {
  return <BellFillSvg className={className ? className : styles.icon} />;
};

import LocationSvg from "/public/icons/location.svg";
const LocationIcon = ({ className }: IconProps) => {
  return <LocationSvg className={className ? className : styles.icon} />;
};
import LocationFillSvg from "/public/icons/location_filled.svg";
const LocationFillIcon = ({ className }: IconProps) => {
  return <LocationFillSvg className={className ? className : styles.icon} />;
};

import SearchSvg from "/public/icons/search.svg";
const SearchIcon = ({ className }: IconProps) => {
  return <SearchSvg className={className ? className : styles.icon} />;
};
import SearchFillSvg from "/public/icons/search_filled.svg";
const SearchFillIcon = ({ className }: IconProps) => {
  return <SearchFillSvg className={className ? className : styles.icon} />;
};

import MapSvg from "/public/icons/map.svg";
const MapIcon = ({ className }: IconProps) => {
  return <MapSvg className={className ? className : styles.icon} />;
};
import MapFillSvg from "/public/icons/map_filled.svg";
const MapFillIcon = ({ className }: IconProps) => {
  return <MapFillSvg className={className ? className : styles.icon} />;
};

import HomeSvg from "/public/icons/home.svg";
const HomeIcon = ({ className }: IconProps) => {
  return <HomeSvg className={className ? className : styles.icon} />;
};
import HomeFillSvg from "/public/icons/home_filled.svg";
const HomeFillIcon = ({ className }: IconProps) => {
  return <HomeFillSvg className={className ? className : styles.icon} />;
};

import BookMarkSvg from "/public/icons/bookmark.svg";
const BookMarkIcon = ({ className }: IconProps) => {
  return <BookMarkSvg className={className ? className : styles.icon} />;
};
import BookMarkFillSvg from "/public/icons/bookmark_filled.svg";
const BookMarkFillIcon = ({ className }: IconProps) => {
  return <BookMarkFillSvg className={className ? className : styles.icon} />;
};

import LinkSvg from "/public/icons/link.svg";
const LinkIcon = ({ className }: IconProps) => {
  return <LinkSvg className={className ? className : styles.icon} />;
};

import SettingSvg from "/public/icons/setting.svg";
const SettingIcon = ({ className }: IconProps) => {
  return <SettingSvg className={className ? className : styles.icon} />;
};
import SettingFillSvg from "/public/icons/setting_filled.svg";
const SettingFillIcon = ({ className }: IconProps) => {
  return <SettingFillSvg className={className ? className : styles.icon} />;
};

import PinSvg from "/public/icons/pin.svg";
const PinIcon = ({ className }: IconProps) => {
  return <PinSvg className={className ? className : styles.icon} />;
};
import PinFillSvg from "/public/icons/pin_filled.svg";
const PinFillIcon = ({ className }: IconProps) => {
  return <PinFillSvg className={className ? className : styles.icon} />;
};

import AddSquareSvg from "/public/icons/add_square.svg";
const AddSquareIcon = ({ className }: IconProps) => {
  return <AddSquareSvg className={className ? className : styles.icon} />;
};
import AddSquareFillSvg from "/public/icons/add_square_filled.svg";
const AddSquareFillIcon = ({ className }: IconProps) => {
  return <AddSquareFillSvg className={className ? className : styles.icon} />;
};

import EditSvg from "/public/icons/edit.svg";
const EditIcon = ({ className }: IconProps) => {
  return <EditSvg className={className ? className : styles.icon} />;
};

import SignInSquareSvg from "/public/icons/sign_in_square.svg";
const SignInSquareIcon = ({ className }: IconProps) => {
  return <SignInSquareSvg className={className ? className : styles.icon} />;
};

import RefreshSvg from "/public/icons/refresh.svg";
const RefreshIcon = ({ className }: IconProps) => {
  return <RefreshSvg className={className ? className : styles.icon} />;
};

import UserBoxSvg from "/public/icons/user_box.svg";
const UserBoxIcon = ({ className }: IconProps) => {
  return <UserBoxSvg className={className ? className : styles.icon} />;
};
import UserBoxFill from "/public/icons/user_box_filled.svg";
const UserBoxFillIcon = ({ className }: IconProps) => {
  return <UserBoxFill className={className ? className : styles.icon} />;
};

import FlashSvg from "/public/icons/flash.svg";
const FlashIcon = ({ className }: IconProps) => {
  return <FlashSvg className={className ? className : styles.icon} />;
};

import ImgLoadBoxSvg from "/public/icons/img_load_box.svg";
const ImgLoadIcon = ({ className }: IconProps) => {
  return <ImgLoadBoxSvg className={className ? className : styles.icon} />;
};
