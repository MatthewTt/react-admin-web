import {defineConfig} from "unocss";


function getTintVariantColor(color: string, intensity: number): string {
    return `color-mix(in srgb, ${color}, white ${intensity * 100}%)`
}

function getColorObject(color: string) {
    const tintVariants = {
        50: 0.95, //95%
        100: 0.9, //90%
        200: 0.7, //70%
        300: 0.5, //50%
        400: 0.3, //30%
        500: 0.1, //10%
        600: 0.05, //5%
    }
    const obj: Record<string, string>= {}
    for (const [key, value] of Object.entries(tintVariants)) {
        obj[key] = getTintVariantColor(color, value)
    }
    return obj
}



export default defineConfig({
    shortcuts: [
        [/^btn-(.*)$/, ([, c]) => {
            return `flex items-center justify-center text-base w-8 h-8 bg-${c}-100 text-${c}-500 rounded-lg hover:(bg-${c}-400 text-${c}-100) cursor-pointer`;
        }],
    ],
    theme: {
        colors: {
            icon: {
                purple: getColorObject('#5e35b1'),
                lightblue: getColorObject('#039be5'),
            },
        },
    }
})