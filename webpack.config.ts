import * as path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const config: webpack.Configuration = {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // 每次打包前清理 dist 目录
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }, //设置less文件的处理

      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          //引入postcss，解决兼容性的问题
          {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                      require("autoprefixer")  // 添加自动加前缀插件
                    ]
                  }
            },
          },
          "less-loader",
        ], // 按顺序使用 less-loader, css-loader, style-loader,最先需要使用的写在最下面
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 指定 HTML 模板
      filename: "index.html", // 生成的 HTML 文件名
    }),
  ],

  mode: "development",
};

export default config;
