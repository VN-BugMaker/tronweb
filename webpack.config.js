const path = require('path');
const externals = require('webpack-node-externals');

const { baseConfig, nodePlugins, basePlugins } = require('./webpack.base.config');

module.exports = [
    {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.node.js',
            libraryTarget: 'commonjs2',
            libraryExport: 'default',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 6,
                                        },
                                        forceAllTransforms: true,
                                    },
                                ],
                            ],
                            plugins: nodePlugins,
                        },
                    },
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.cjs.json'),
                    },
                    exclude: ['/node_modules/', '/test/'],
                },
            ],
        },
        externals: [externals()],
        target: 'node',
    },
    {
        ...baseConfig,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: basePlugins,
                            },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                configFile: path.resolve(__dirname, 'tsconfig.esm.json'),
                            },
                        },
                    ],
                    exclude: ['/node_modules/', '/test/'],
                },
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'TronWeb.js',
            library: 'TronWeb',
            libraryTarget: 'umd',
            libraryExport: 'default',
            umdNamedDefine: true,
        },
    },
];
