---
cover: ../.gitbook/assets/Screen Shot 2022-04-05 at 9.32.19 AM.png
coverY: 0
---

# ➗ DNT-2843 EVCalculator

### Controls:

| Name            | Description                           | Default | Control |
| --------------- | ------------------------------------- | ------- | ------- |
| inputs\*        | InputsType                            | -       | -       |
| output\*        | YearlyOutputProps                     | -       | -       |
| analytics       | ComponentEvent                        | -       | -       |
| backgroundColor | string                                | -       | -       |
| bgColorClass    | """bg-gray-lighter"                   | -       | -       |
| ctaText         | any                                   | -       | -       |
| fullWidth       | boolean                               | -       | -       |
| image           | any                                   | -       | -       |
| isCtaAButton    | boolean                               | -       | -       |
| link            | any                                   | -       | -       |
| mobileLink      | any                                   | -       | -       |
| modal           | { id: string; url?: string; } \| null | -       | -       |
| subtitle        | any                                   | -       | -       |
| title           | any                                   | -       | -       |

{% file src="../.gitbook/assets/EVCalculator.zip" %}

{% file src="../.gitbook/assets/Calculator.zip" %}

```typescript
//Calculator/index.tsx

import React from "react";
import Input from "./inputComponents/Input";
import Stepper from "./inputComponents/Stepper";
import Slider from "./inputComponents/Slider";

const Calculator = () => (
  <section className="px-16 md:px-24 py-32 md:py-48">
    <div className="mb-48 items-center flex">
      <Slider
        prompt="Prompt goes here"
        defaultVal="88888"
        min="0"
        max="100000"
        label="Number Slider Title"
      />
    </div>
    <div className="flex flex-1">
      <Stepper prompt="Prompt goes here" defaultVal="1" />
      <Input
        prompt="Prompt goes here"
        defaultVal="500"
        label="per month"
        isInDollars={true}
      />
    </div>
  </section>
);

export default Calculator;
```

```typescript
//src/components/Calculator/outputComponents/YearlySavings.tsx

import { YearlyOutputProps } from "../types";

const avgDaysInMonth = 30.437;
const avgDaysInYear = 365.25;

const formatMoney = (money: number) => {
  const roundedNum = Math.round(money * 100) / 100;
  const arr = roundedNum.toLocaleString().split(".");
  const cents = `${arr[1] || ""}00`.slice(0, 2);
  const dollars = arr[0];
  return {
    dollars,
    cents,
    full: `$${dollars}.${cents}`,
  };
};

const YearlySavings = ({
  dailySavings = 0,
  headline = "Total Yearly Savings",
  monthlyText = "Monthly Savings",
  dailyText = "Daily Savings",
  description,
}: YearlyOutputProps) => {
  const annual = formatMoney(dailySavings * avgDaysInYear);
  const monthly = formatMoney(dailySavings * avgDaysInMonth);
  const daily = formatMoney(dailySavings);

  return (
    <div>
      <h4 className="text-blue text-xl-fixed">{headline}</h4>
      {/* need to adjust line height to vertically top align */}
      <p
        className="text-blue my-12 text-2xl-fixed align-top"
        style={{ lineHeight: "55px" }}
      >
        $
        <span className="text-3xl-fixed align-top leading-none">
          {annual.dollars}
        </span>
        {`.${annual.cents}`}
      </p>
      <div className="flex flex-row justify-center">
        <div className="border-r px-32 border-gray">
          <p
            className="text-blue align-top text-lg-fixed"
            style={{ lineHeight: "25px" }}
          >
            $<span className="text-xl-fixed align-top">{daily.dollars}</span>
            {`.${daily.cents}`}
          </p>
          <p className="text-gray-dark text-xs">{dailyText}</p>
        </div>
        <div className="px-32">
          <p
            className="text-blue align-top text-lg-fixed"
            style={{ lineHeight: "25px" }}
          >
            $<span className="text-xl-fixed align-top">{monthly.dollars}</span>
            {`.${monthly.cents}`}
          </p>
          <p className="text-gray-dark text-xs">{monthlyText}</p>
        </div>
      </div>
      {description && (
        <p className="mt-32 text-gray-dark text-md">{description}</p>
      )}
    </div>
  );
};

export default YearlySavings;
```

```typescript
//src/components/Calculator/test.tsx

import "@testing-library/jest-dom";
import Input from "src/components/Calculator/inputComponents/Input";
import Slider from "src/components/Calculator/inputComponents/Slider";
import YearlySavings from "./outputComponents/YearlySavings";
import { renderWithCTX, screen, fireEvent } from "src/lib/testWrappers";

const props: Parameters<typeof Input>[0] = {
  prompt: "Current Gas Price",
  defaultVal: "3.12",
  label: "per gallon",
  isInDollars: true,
};

describe("calculator input", () => {
  it("should render", () => {
    renderWithCTX(<Input {...props} />);
    const input = screen.getByRole("textbox", {
      name: `${props?.prompt} ${props?.label}`,
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", props.defaultVal);
  });
  it("should prefix with $ if applicable", () => {
    const { rerender } = renderWithCTX(<Input {...props} />);
    let currency: HTMLElement | null = screen.getByText(/\$/i);
    expect(currency).toBeInTheDocument();
    rerender(<Input {...props} isInDollars={false} />);
    currency = screen.queryByText(/\$/i);
    expect(currency).not.toBeInTheDocument();
  });
});

describe("calculator slider input", () => {
  const props = {
    prompt: "How many miles do you drive daily?",
    defaultVal: "160",
    label: "Daily Miles",
    min: "0",
    max: "320",
    step: "1",
  };
  it("should render", () => {
    renderWithCTX(<Slider {...props} />);
    const slider = screen.getByRole("slider", {
      name: `${props.prompt} ${props.label}`,
    });
    const input = screen.getByRole("textbox", {
      name: `${props.prompt} ${props.label}`,
    });
    const label = screen.getByText(/daily miles/i);
    const heading = screen.getByRole("heading", {
      name: /how many miles do you drive daily\?/i,
    });
    expect(slider).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
  it("should default to midpoint between min and max when defaultVal is missing", () => {
    renderWithCTX(<Slider {...props} defaultVal="" min="100" max="300" />);
    const slider = screen.getByRole("slider", {
      name: `${props.prompt} ${props.label}`,
    });
    expect(slider).toHaveAttribute("value", "200");
  });
  it("should keep the same slider and text input values", () => {
    renderWithCTX(<Slider {...props} />);
    const slider = screen.getByRole("slider", {
      name: `${props.prompt} ${props.label}`,
    });
    const input = screen.getByRole("textbox", {
      name: `${props.prompt} ${props.label}`,
    });
    // slider changes input
    fireEvent.change(slider, { target: { value: 28 } });
    expect(input).toHaveAttribute("value", "28");
    // input changes slider
    fireEvent.change(input, { target: { value: 140 } });
    expect(slider).toHaveAttribute("value", "140");
  });
});

describe("yearly savings output", () => {
  const props = {
    headline: "Yearly Savings",
    monthlyText: "Monthly Savings",
    dailyText: "Daily Savings",
    dailySavings: 2.22,
  };
  it("should render", () => {
    renderWithCTX(<YearlySavings {...props} />);
    const heading = screen.getByRole("heading", { name: props.headline });
    const daily = screen.getByText(props.dailyText);
    const monthly = screen.getByText(props.monthlyText);
    expect(heading).toBeInTheDocument();
    expect(daily).toBeInTheDocument();
    expect(monthly).toBeInTheDocument();
  });
  it("should properly display rounded monetary amounts", () => {
    renderWithCTX(<YearlySavings dailySavings={7.998} />);
    const dollars = screen.getByText("8");
    const cents = screen.getByText(/\$\.00/i);
    expect(dollars).toBeInTheDocument();
    expect(cents).toBeInTheDocument();
  });
});
```
