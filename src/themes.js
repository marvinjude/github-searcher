export const themes = {
  dark: {
    primary: "",
    foregroundColor: "white",
    backgroundColor: "#000000",
    footerBackgroundColor: "#1f0735",
    borderColor: "#1f0735",
  },
  light: {
    primary: "",
    foregroundColor: "black",
    backgroundColor: "#fefefe",
    footerBackgroundColor: "rgb(212, 185, 235)",
    borderColor: "#d6d0d0",
  },
};

//--------------------------------------------------

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
};
