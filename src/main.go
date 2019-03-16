package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"./files"
)

const MEDIA_PATH = "/media/data/Video/I have seen before"

func main() {
	// Get all files
	var file_dict, _ = files.Get_all_dir_and_files(MEDIA_PATH)
	fmt.Println(file_dict)

	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Enable cors
	router.Use(cors.Default())

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	// Setup route group for the API
	api := router.Group("/api/")
	{
		api.Any("info/", func(c *gin.Context) {
			file_dict, _ = files.Get_all_dir_and_files(MEDIA_PATH)
			c.JSON(http.StatusOK, gin.H{
				"base_folder": MEDIA_PATH,
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
