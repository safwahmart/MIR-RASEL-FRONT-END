import Image from "next/image";

const SWImages = ({ image, width, height, alt, className }) => {
  return (
    <>
      <div className="sw__images">
        <Image
          src={image}
          width={width}
          height={height}
          alt={alt}
          className={className}
        />
      </div>
    </>
  );
};

export default SWImages;
