import type { Config } from 'tailwindcss'
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
    // darkMode: 'class',

    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                lightBlue: {
                    50: "#2FC1FF",
                    100: "#2AB7FF",
                }
            },
            animation: {
                fade: 'fadeOut 5s ease-in-out',
            },

            // that is actual animation
            keyframes: (theme: any) => ({
                fadeOut: {
                    '0%': { display: 'block' },
                    '100%': { display: 'none' },
                },
            }),
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
});

export default config
