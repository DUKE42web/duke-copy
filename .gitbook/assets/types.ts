interface ctaTypes {
  //https://stackoverflow.com/questions/67494696/typescript-require-at-least-one-property
  target?: string;
  href?: string;
  text?: string;
}
//how do I make the namespace errors go away?
interface NewsBannerProps {
  title: JSS.TextField;
  icon: JSS.ImageField;
  rounded?: boolean;
  cta?: ctaTypes;
  body?: JSS.TextField;
  bgColorClass?: string;
  color?: string;
}
export type { NewsBannerProps };
