import express from "express"
import fs from "fs"
import path from "path"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { App } from "../client/components/app"

import livereload from "livereload"
import connectLiveReload from "connect-livereload"

const liveReloadServer = livereload.createServer()
liveReloadServer.server.once( "connection", () => {
    setTimeout( () => {
        liveReloadServer.refresh( "/" )
    }, 100 )
} )

const server = express()

server.use( connectLiveReload() )

server.set( "view engine", "ejs" )
server.set( "views", path.join( __dirname, "views" ) )

server.use( "/", express.static( path.join( __dirname, "static" ) ) )

const manifest = fs.readFileSync(
    path.join( __dirname, "static/manifest.json" ),
    "utf-8"
)
const assets = JSON.parse( manifest )

server.get( "/", ( req, res ) => {
    const component = ReactDOMServer.renderToString( React.createElement( App ) )
    res.render( "client", { assets, component } )
} )

server.listen( 3001, () => {
    console.log( `Server running on http://localhost:3001` )
} )
