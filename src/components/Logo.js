import styled from "styled-components";

const StyledLogo = styled.span`
  color: ${(p) => p.theme.foregroundColor};
`;

function Logo() {
  return (
    <StyledLogo>
      <svg
        width="40"
        height="41"
        viewBox="0 0 40 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 0.781372C8.95 0.781372 0 9.95775 0 21.2872C0 30.3611 5.725 38.0252 13.675 40.7422C14.675 40.9216 15.05 40.3064 15.05 39.7682C15.05 39.2812 15.025 37.6663 15.025 35.949C10 36.8973 8.7 34.693 8.3 33.5395C8.075 32.95 7.1 31.1301 6.25 30.6431C5.55 30.2586 4.55 29.3102 6.225 29.2845C7.8 29.2589 8.925 30.7712 9.3 31.3864C11.1 34.4879 13.975 33.6164 15.125 33.0781C15.3 31.7452 15.825 30.8481 16.4 30.3355C11.95 29.8228 7.3 28.0542 7.3 20.2107C7.3 17.9807 8.075 16.1351 9.35 14.6997C9.15 14.1871 8.45 12.0852 9.55 9.26568C9.55 9.26568 11.225 8.7274 15.05 11.3675C16.65 10.9061 18.35 10.6755 20.05 10.6755C21.75 10.6755 23.45 10.9061 25.05 11.3675C28.875 8.70177 30.55 9.26568 30.55 9.26568C31.65 12.0852 30.95 14.1871 30.75 14.6997C32.025 16.1351 32.8 17.955 32.8 20.2107C32.8 28.0798 28.125 29.8228 23.675 30.3355C24.4 30.9763 25.025 32.2066 25.025 34.1291C25.025 36.8717 25 39.0761 25 39.7682C25 40.3064 25.375 40.9473 26.375 40.7422C30.3454 39.3679 33.7954 36.7517 36.2396 33.2617C38.6838 29.7717 39.9989 25.5837 40 21.2872C40 9.95775 31.05 0.781372 20 0.781372Z"
          fill="currentColor"
        />
      </svg>
    </StyledLogo>
  );
}

export default Logo;
