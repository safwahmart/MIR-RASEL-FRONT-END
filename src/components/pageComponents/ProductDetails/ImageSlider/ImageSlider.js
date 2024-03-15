import { imageUrl } from "@/api/apiConfig";
import { useRef, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageSlider({ images, altText }) {
  const imageList = images?.split(",");
  const [img, setImg] = useState(imageList[0]);
  const hoverHandler = (image, i) => {
    setImg(image);
    refs.current[i].classList.add("active");
    for (var j = 0; j < imageList.length; j++) {
      if (i !== j) {
        refs.current[j]?.classList.remove("active");
      }
    }
  };
  const refs = useRef([]);
  refs.current = [];
  const addRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
console.log('imageList',imageList)
  return (
    <div className="" style={{ zIndex: "9", position: "relative" }}>
      <div className="left">
        <div className="left_1">
          {imageList?.map((image, i) => (
            <div
              className={i == 0 ? "img_wrap active" : "img_wrap"}
              key={i}
              onMouseOver={() => hoverHandler(image, i)}
              ref={addRefs}
            >
              <img src={`${imageUrl}/files/${image}`} alt={altText} />
            </div>
          ))}
        </div>
        <div className="left_2">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: `${imageUrl}/files/${img}`,
              },
              largeImage: {
                src: `${imageUrl}/files/${img}`,
                width: 1080,
                height: 1080,
              },
              enlargedImageContainerDimensions: {
                width: "120%",
                height: "120%",
              },
            }}
          />
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default ImageSlider;
