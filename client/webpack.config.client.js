const path = require( "path" )
const { CleanWebpackPlugin } = require( "clean-webpack-plugin" )
const { WebpackManifestPlugin } = require( "webpack-manifest-plugin" )

module.exports = {
    name: "client",
    entry: {
        client: path.resolve( __dirname, "client.tsx" ),
    },
    mode: "production",
    output: {
        path: path.resolve( "dist/static" ),
        filename: "[name].[contenthash].js",
        publicPath: "",
    },
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.client.json",
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ],
    },
    target: "web",
    plugins: [ new CleanWebpackPlugin(), new WebpackManifestPlugin() ],
}
