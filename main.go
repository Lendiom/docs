package main

import (
	"fmt"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	//Version is the version of the client
	Version = "0.0.5"

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

func main() {
	Router := gin.Default()

	Router.Use(versionMiddleware)
	Router.Use(cspMiddleware)

	Router.Use(static.Serve("/", static.LocalFile("./build/", false)))

	Router.GET("/", defaultRouteHandler)

	Router.NoRoute(defaultRouteHandler)

	Router.Run(":5005")
}
