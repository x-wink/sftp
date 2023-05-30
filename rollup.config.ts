import path from 'path';
import ts from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import node from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { RollupOptions } from 'rollup';
export default {
    input: path.resolve(process.cwd(), './out/src/extension.js'),
    output: {
        file: path.resolve(process.cwd(), './dist/index.js'),
        format: 'cjs',
        compact: true,
    },
    plugins: [ts(), node(), commonjs(), json(), babel({ babelHelpers: 'bundled' })],
} as RollupOptions;
