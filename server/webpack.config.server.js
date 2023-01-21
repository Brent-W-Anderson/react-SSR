const nodeExternals = require( "webpack-node-externals" )
const path = require( "path" )
const CopyPlugin = require( "copy-webpack-plugin" )

module.exports = {
    name: "server",
    entry: {
        server: path.resolve( __dirname, "server.ts" ),
    },
    mode: "production",
    output: {
        path: path.resolve( "dist" ),
        filename: "[name].js",
    },
    externals: [ nodeExternals() ],
    resolve: {
        extensions: [ ".ts", ".tsx" ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.server.json",
                },
            },
            {
                test: /\.s[ac]ss$/i,
                loader: "ignore-loader"
            }
        ],
    },
    target: "node",
    node: {
        __dirname: false,
    },
    plugins: [
        new CopyPlugin( {
            patterns: [ { context: "server", from: "views", to: "views" } ],
        } ),
    ],
}
