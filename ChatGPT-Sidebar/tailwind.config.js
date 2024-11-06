/** @type {import('tailwindcss').Config} */

import DefaultTheme from 'tailwindcss/defaultTheme.js'
import daisyui from 'daisyui'


Object.keys(DefaultTheme).forEach(item => {
    DefaultTheme[item] = rem2px(DefaultTheme[item]);
});
export default {
    prefix: 'ait-',
    corePlugins: {
        preflight: true,
    },
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue,html}",
    ],
    theme: DefaultTheme,
    mode: "jit",
    important: true,
    //darkMode: ['class', '.aitopia.dark,#aitopia.dark'],
    darkMode: ['class', '.aitopia.dark'],
    plugins: [daisyui],
    daisyui: {
        themes: true,
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: false, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "daisy-", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ".aitopia", // The element that receives theme color CSS variables
    },
    variants: {
        extend: {
            opacity: ["hover"],
        },
    },
}

function rem2px(input, fontSize = 16) {
    if (input == null) {
        return input;
    }
    switch (typeof input) {
        case "object":
            if (Array.isArray(input)) {
                return input.map((val) => rem2px(val, fontSize));
            } else {
                const ret = {};
                for (const key in input) {
                    ret[key] = rem2px(input[key]);
                }
                return ret;
            }
        case "string":
            return input.replace(
                /(\d*\.?\d+)rem$/,
                (_, val) => parseFloat(val) * fontSize + "px"
            );
        default:
            return input;
    }
}