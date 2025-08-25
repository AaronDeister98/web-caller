import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(process.cwd(), "dist"),
        clean: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            favicon: false
        })
    ],
    devServer: {
        static: "./public",
        port: 3000,
        hot: true,
        open: true
    }
};
