import React, { useState } from "react";
import ReactImageMagnify from 'react-image-magnify';

const MagnifyImage = ({ original, thumbnail }) => {
  const [isMagnified, setIsMagnified] = useState(false);

  return (
    <div
      className="sw__banner__slider__item"
      onMouseEnter={() => setIsMagnified(true)}
      onMouseLeave={() => setIsMagnified(false)}
    >
      <div className="magnify">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Product Image',
            isFluidWidth: true,
            src: thumbnail,
          },
          largeImage: {
            src: original,
            width: 1080,
            height: 1080,
          },
          isActivatedOnTouch: true,
          enlargedImagePosition: 'beside',
          shouldHideHintAfterFirstActivation: false,
          enlargedImageContainerClassName: "custom-magnify-container",
        }}
        {...isMagnified && { isEnlargedImagePortalEnabled: true }}
      />
    </div>
    </div>
  );
};

export default MagnifyImage;
