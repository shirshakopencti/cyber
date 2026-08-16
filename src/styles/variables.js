import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #050505;
    --navy: #0a0a0a;
    --light-navy: #111111;
    --lightest-navy: #1f1f1f;
    --navy-shadow: rgba(5, 5, 5, 0.7);
    --dark-slate: #8b0000;
    --slate: #a3a3a3;
    --light-slate: #d4d4d4;
    --lightest-slate: #f5f5f5;
    --white: #ffffff;
    --green: #D32F2F;
    --green-tint: rgba(211, 47, 47, 0.1);
    --pink: #ff003c;
    --blue: #ff2a2a;

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
