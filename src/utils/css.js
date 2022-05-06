const BREAKPOINTS = {
  giant: `2200px`,
  "large-desktop": `1600px`,
  desktop: `1440px`,
  "small-desktop": `1260px`,
  "large-tablet": `1025px`,
  tablet: `769px`,
  "small-tablet": `660px`,
  "large-mobile": `500px`,
  mobile: `400px`,
  "small-mobile": `340px`
};

export const breakpoint = (key, bound = `min`) => {
  if (!BREAKPOINTS?.[key]) {
    return `@media `;
  }

  return `@media only screen and (${bound}-width: ${BREAKPOINTS[key]}) `;
};
