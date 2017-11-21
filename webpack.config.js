/**
 *  项目名称：脚手架
 *  搭建时间：2017年10月5日
 *  描述: 前端环境配置
 */
const path = require('path');
const webpack = require('webpack');// 热加载需要的 webpack

module.exports = {
    entry: {
        main: './src/main.js',

        // 将react相关组件打包成vendor.js
        vendor: [
            'react',
            'react-dom',
            'react-router'
        ],
        // 将jquery单独打成一个独立打文件
        //jquery:["jquery"],
        // highcharts:["highcharts"],
        //echarts:["echarts"]

    },
    module: {
        rules: [

            {
                //正则匹配后缀.js文件;
                test: /\.js$/,
                //需要排除的目录
                exclude: /(node_modules|bower_components)/,
                //加载babel-loader转译es6
                loaders: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(['static']),

        new webpack.optimize.CommonsChunkPlugin({
            // names: ['jquery','vendor','runtime'],
            // names: ['jquery','echarts','highcharts','vendor'],//跟页面插入的顺序相反
            // names: ['echarts','highcharts','vendor'],
            // names: ['highcharts','vendor'],
            names: ['vendor'],
            minChunks: Infinity
        }),

        /*
        new webpack.ProvidePlugin({ // 将 $ 变量挂载到 window 下面，可以在项目中直接使用 $ 不用再引用
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
        */

    ],
    // 通过 output.filename 和 output.path 属性，来告诉 webpack bundle（捆）的名称，以及我们想要生成（emit）到哪里
    output: { //打包路径
        //filename: '[name].bundle.js', //出口文件名
        // filename: '[name].[chunkhash].js',
        // 可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径
        path: path.resolve(__dirname, './dist'), //打包路径


        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'

    },
    resolve: {
        //设置可省略文件后缀名（注：如果有文件没有后缀设置‘’会在编译时会报错，必须改成' '中间加个空格);
        extensions: [' ','.css','.less','.js','.json'],
    },
    externals: {

    },
    devtool: 'source-map',
    devServer: {
        // contentBase: './static',
        contentBase: [path.join(__dirname, "./")], // 本地服务器 加载页面 所在的目录
        // port:7000,
        host: '127.0.0.1',
        port: 6600,
        //port: serverConfig.port,
        //host: serverConfig.host,
        hot: true // 服务器热加载
    }
};



