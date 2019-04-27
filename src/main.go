package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"./files"
)

func main() {
	// get cli args
	var MEDIA_PATH = "/media"
	if len(os.Args) >= 2 {
		MEDIA_PATH = os.Args[1]
	}

	// Get all files
	var file_dict, _ = files.Get_all_dir_and_files(MEDIA_PATH)
	fmt.Println(file_dict)

	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Enable cors
	//router.Use(cors.Default())
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	router.Use(cors.New(config))

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	// Serve target files
	router.Use(static.Serve("/media", static.LocalFile(MEDIA_PATH, true)))

	// Setup route group for the API
	api := router.Group("/api/")
	{
		api.Any("info/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"root_folder": MEDIA_PATH,
			})
		})

		api.Any("update/", func(c *gin.Context) {
			file_dict, _ = files.Get_all_dir_and_files(MEDIA_PATH)
			c.JSON(http.StatusOK, gin.H{
				"status": "success",
			})
		})

		api.Any("files/", func(c *gin.Context) {
			//whatever := c.Query("name")
			c.JSON(http.StatusOK, file_dict)
		})
	}

	// Start and run the server
	router.Run(":5000")
}
