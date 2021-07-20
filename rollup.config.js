import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from "rollup-plugin-uglify";
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV;
const outputFile = (env === 'production') ? "build/mapbox-layerswitcher.min.js" : "build/mapbox-layerswitcher.js";

export default {
    input: 'src/index.js',
    output: {
        name: "MapboxLayerSwitcher",
        file: outputFile,
        format: 'umd',
        sourcemap: true,
    },
    plugins: [
        resolve({
            browser: true,
        }),
        json(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
        }),
        (env === 'production' && uglify()),
        postcss({
            // extract: true, // css和js分开打包
            plugins: [require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] })]
        }),
    ]
};
