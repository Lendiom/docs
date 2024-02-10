package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	//Version is the version of the client
	Version = "0.3.0"

	//Commit is the commit version of the client
	Commit = "local"
)

func getVersion() string {
	return fmt.Sprintf("%s-%s", Version, Commit)
}

func versionMiddleware(c *gin.Context) {
	c.Writer.Header().Set("X-Lendiom-Website-Version", getVersion())

	c.Next()
}

func cspMiddleware(c *gin.Context) {
	c.Writer.Header().Set("Content-Security-Policy", "frame-ancestors 'none';")

	c.Next()
}

func defaultRouteHandler(c *gin.Context) {
	c.File("build/index.html")
}

func noRouteHandler(c *gin.Context) {
	log.Printf("no route found for %s", c.Request.URL.Path)
	c.File("build/404.html")
}

func main() {
	Router := gin.Default()

	Router.Use(versionMiddleware)
	Router.Use(cspMiddleware)
	// Router.Use(addIndexMiddleware)

	Router.Use(static.Serve("/", static.LocalFile("./build/", true)))

	Router.GET("/", defaultRouteHandler)

	Router.NoRoute(noRouteHandler)

	Router.Run(":5005")
}
