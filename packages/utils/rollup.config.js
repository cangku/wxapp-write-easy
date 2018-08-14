import ts from 'rollup-plugin-typescript';
import typescript from 'typescript';
import babel from 'rollup-plugin-babel';

// all utils
let config = [];

// other util
['index', 'http/index', 'http/wx', 'basictype/index'].forEach(filePath => {
    // 名字斜杠转换
    let name = filePath.replace(/\/index/g, '').replace(/\/\w/g, val => {
        return val.replace('/', '').toUpperCase();
    });

    config.push({
        input: `src/${filePath}.ts`,
        output: {
            name,
            file: `dist/${filePath}.js`,
            format: 'umd',
            exports: 'named'
        },
        plugins: [
            ts({ typescript }),
            babel()
        ]
    })
})

export default config;