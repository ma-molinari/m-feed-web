import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  onClick: () => void;
}

const IconButton = ({ src, alt, height = 24, width = 24, onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <Image src={src} alt={alt} height={height} width={width} />
    </button>
  );
};

export default IconButton;
