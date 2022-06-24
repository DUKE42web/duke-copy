# Index.tsx

```tsx
/*
- This is a full-width component.
- It includes a visual, a title, a description, a CTA button and a background.
- A title is required
- Text that exceeds the available content space will be truncated.
- The visual is required. An icon or image may be used as the supporting visual.
- The height for the banner should be determined by the height of the content plus the top and bottom spacing. Therefore, banners including icons and images will vary in height.
- On desktop, the max height of the banner with an icon is 140px. The max height of the banner with an image is 170px on desktop.
- On mobile, the max height of the banner with an icon is 296px. The max height of the banner with an image is 324px on mobile.
- The description and CTA button are optional.
- The content area should be centered horizontally when when the CTA is not displayed.
- There are predefined background options.
*/
import { Text } from "@sitecore-jss/sitecore-jss-react";
import React from "react";
import LazyImage from "src/components/LazyImage";
import { NewsBannerProps } from "./types";
import RichText from "src/components/RichText";
import Button from "src/components/Button";

const NewsBanner = ({
  icon,
  rounded,
  title,
  body,
  bgColorClass,
  cta,
}: NewsBannerProps) => {
  const ctaExists = cta?.href && cta?.text;

  const iconRounded = rounded ? "rounded-full" : "";

  const iconSize = icon?.value?.src?.includes(".svg")
    ? "icon-48 sm:icon-76"
    : "icon-76 sm:icon-122";

  return (
    <section className={`px-16 md:px-24 py-24 md:py-32  ${bgColorClass}`}>
      <div
        className={`lg:flex-row container-3xl lg:space-x-32 flex flex-col items-center lg:justify-center text-center lg:text-left`}
      >
        <div className={` py-24 lg:px-24  flex-shrink-0 }`}>
          <LazyImage
            {...icon}
            className={`mx-auto lg:mx-0 w-full ${iconSize} ${iconRounded}`}
          />
        </div>
        <div>
          <Text className="text-xl" field={title} tag="h3" />
          <RichText className="mt-10 lg:line-clamp-3" field={body} tag="p" />
        </div>
        <div className="flex-shrink-0 mt-12 md:mt-16 lg:mt-0">
          {ctaExists && (
            <Button
              className="flex-shrink-0 block mt-16 lg:mt-0 lg:ml-24 xl:ml-32"
              target={cta?.target}
              variant="secondary"
              {...cta}
            >
              {cta?.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
export default NewsBanner;
```
