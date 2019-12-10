package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"

	"github.com/GeertJohan/go.rice"

	"./files"
)

func openBrowser(url string) {
	switch runtime.GOOS {
	case "linux":
		exec.Command("xdg-open", url).Start()
	case "windows":
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		exec.Command("open", url).Start()
	default:
		fmt.Errorf("unsupported platform")
	}
}

func main() {
	// get cli args
	dir, _ := os.Getwd()
	var MEDIA_PATH = dir //"/media"
	if len(os.Args) >= 2 {
		MEDIA_PATH = os.Args[1]
	}

	// Get all files
	var file_dict, _ = files.Get_all_dir_and_files(MEDIA_PATH)
	//fmt.Println(file_dict)

	// Set the router as the default one shipped with Gin
	router := gin.Default()

	// Enable cors
	//router.Use(cors.Default())
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	router.Use(cors.New(config))

	// Serve frontend static files
	box := rice.MustFindBox("../client/build")
	router.StaticFS("/ui/", box.HTTPBox())

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

	local_address := "127.0.0.1"
	addrs, err := net.InterfaceAddrs()
	if err != nil {
		panic(err)
	}
	fmt.Printf("\n\n-------------------------------\n\n")
	for _, addr := range addrs {
		lists := strings.Split(addr.String(), "/")
		fmt.Printf("You can visit your media at: http://%v:5000/ui\n", lists[0])

		if strings.Contains(lists[0], "192.168") {
			local_address = lists[0]
		}
	}
	fmt.Printf("\n\n-------------------------------\n\n")

	// Open link
	openBrowser("http://" + local_address + ":5000/ui")

	// Start and run the server
	router.Run(":5000")
}
