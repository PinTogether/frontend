import Image from "next/image";

const LogoHorizontal = ({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <Image
      alt="Pintogether logo horizontal"
      height={height || 100}
      width={width || 500}
      className={className}
      src="/logo/horizontal.png"
    />
  );
};

const LogoSquare = ({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <Image
      alt="Pintogether logo square"
      height={height}
      width={width}
      className={className}
      src="/logo/logo-horizontal.png"
    />
  );
};

const LogoFavicon = ({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <Image
      alt="Pintogether logo favicon"
      height={height}
      width={width}
      className={className}
      src="/logo/logo-horizontal.png"
    />
  );
};

export { LogoHorizontal, LogoSquare, LogoFavicon };
