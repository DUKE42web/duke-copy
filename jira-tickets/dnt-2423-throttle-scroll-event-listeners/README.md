# 🎫 DNT-2423 Throttle scroll event listeners

```

    // TODO Throttle event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (suppressNav || !hasSubPages) {
    return null;
  }
```

See: src/components/SecondaryNav/index.tsx - L:99

We probably don't need event fired for every single scroll.

<details>

<summary>Secondary Nav </summary>

```typescript
/* eslint-disable complexity */
/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from "react";
import { SecondaryNavType } from "./types";
import { NavItem } from "./components/NavItem";
import { DropDownMenu } from "./components/DropDownMenu";
import { useLocation } from "react-router-dom";

const SecondaryNav = ({ items, suppressNav }: SecondaryNavType) => {
  const currentItems = items[0];
  const [active, setActive] = useState(-1);
  let { pathname } = useLocation();
  pathname = pathname?.split(" ").join("-").toLowerCase();

  const isItemActive = (index: number) => active === index;
  // Need to check if the current page is the route of a top level page or any subpages or subpages' subpages so we can display the glorious teal bar
  const selectedIndex: Array<number> = [];
  let topLevelSelected: number;
  if (currentItems) {
    // check if the current page is one of the top level navItems in the blue bar
    topLevelSelected = currentItems.subpages.findIndex(
      (x) => x.route.toLowerCase() === pathname
    );
    // check if the current page is in any of the subpages
    for (let i = 0; i < currentItems.subpages?.length; i++) {
      const select = currentItems.subpages[i]?.subpages?.findIndex(
        (x) => x.route.toLowerCase() === pathname
      );
      if (select !== -1) {
        selectedIndex.push(i);
        break;
      } else {
        for (
          let ii = 0;
          ii < currentItems.subpages[i]?.subpages[ii]?.subpages?.length;
          ii++
        ) {
          const select = currentItems.subpages[i]?.subpages[
            ii
          ]?.subpages?.findIndex((x) => x.route.toLowerCase() === pathname);
          if (select !== -1) {
            selectedIndex.push(i);
            break;
          }
        }
      }
    }
  }

  const isItemSelected = (index: number) => selectedIndex.indexOf(index) !== -1;

  const hasSubPages = currentItems?.subpages.length > 0;

  const getNumberOfCols = (index: number) => {
    if (currentItems?.subpages[index].subpages[0]?.subpages?.length) {
      return currentItems.subpages[index].subpages.length;
    }
    return 1;
  };

  const dropdownDirection = (index: number) => {
    const navItemsLength = currentItems?.subpages.length;
    const numberOfCols = getNumberOfCols(index);
    const placeInNav = index + 1;
    const displayToRight = navItemsLength - placeInNav >= numberOfCols;
    const displayToLeft = placeInNav > numberOfCols;
    const leftSide = placeInNav <= navItemsLength / 2;

    if (displayToRight) {
      return { side: "left-0", position: "relative", cols: numberOfCols };
    } else if (displayToLeft) {
      return { side: "right-0", position: "relative", cols: numberOfCols };
    } else if (leftSide) {
      return { side: "left-0", position: "", cols: numberOfCols };
    } else {
      return { side: "right-0", position: "", cols: numberOfCols };
    }
  };

  const rootElement = useRef<HTMLDivElement | null>(null);
  const activeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (event: Event) => {
      const cTarget = event.target as Element;
      if (
        (cTarget instanceof HTMLElement &&
          !rootElement.current?.contains(cTarget)) ||
        cTarget.tagName === "A" ||
        cTarget.tagName === "SPAN"
      ) {
        setActive(-1);
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handlePress = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape") {
        activeButton?.current?.focus();
        setActive(-1);
      }
    };
    window.addEventListener("keyup", handlePress);

    return () => {
      window.removeEventListener("keyup", handlePress);
    };
  }, []);

  // Close menu when scrolled off screen
  useEffect(() => {
    const handleScroll = ({ currentTarget }: Event) => {
      if (!rootElement.current) {
        return;
      }

      const headerDimensions = rootElement.current.getBoundingClientRect();

      const headerDistanceFromTop = headerDimensions.top;
      const headerHeight = headerDimensions.height;

      const scrollingDown = (currentTarget as Window).scrollY > 0;
      const headerOutOfView = headerDistanceFromTop + headerHeight < 0;

      // offScreen
      const offScreen = headerOutOfView && scrollingDown;
      if (offScreen) {
        // Close menu
        setActive(-1);
      }
    };

    // TODO Throttle event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (suppressNav || !hasSubPages) {
    return null;
  }

  return (
    <div
      className="hidden xl:block xl:-mt-px px-16 md:px-24 bg-blue text-white"
      ref={rootElement}
    >
      <nav className="relative container-4xl h-full" aria-label="Secondary">
        <ul className="flex justify-between -mx-16 h-full">
          {currentItems.subpages.map(({ subpages, ...rest }, index) => {
            const isActive = isItemActive(index);
            const isSelected =
              isItemSelected(index) || topLevelSelected === index;
            return (
              <li className={dropdownDirection(index).position} key={index}>
                <NavItem
                  {...rest}
                  currentRef={isActive ? activeButton : null}
                  isActive={isActive}
                  isSelected={isSelected}
                  onClick={() => setActive(isActive ? -1 : index)}
                  type={subpages.length ? "button" : "link"}
                />
                <DropDownMenu
                  {...{
                    subpages,
                    ...{
                      ...rest,
                      isActive,
                      dropdownDirection: dropdownDirection(index),
                    },
                  }}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SecondaryNav;
```

</details>

{% embed url="https://jiraprod.duke-energy.com/browse/DNT-2423" %}
