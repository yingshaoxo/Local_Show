package main

import (
	"fmt"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mdp/qrterminal"

	rice "github.com/GeertJohan/go.rice"

	"github.com/yingshaoxo/Local_Show/files"
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

func findAvailablePort(port int) string {
	for true {
		postStr := strconv.Itoa(port)
		connection, err := net.Listen("tcp", ":"+postStr)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Can't listen on port %q: %s", port, err)
			port += 1
		} else {
			connection.Close()
			break
		}
	}
	return strconv.Itoa(port)
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
	fmt.Println(file_dict)

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
	//router.Use(static.Serve("/media", static.LocalFile(MEDIA_PATH, true)))
	router.StaticFS("/media", http.Dir(MEDIA_PATH))

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
			runtime.GC()
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

	port := findAvailablePort(5000)

	var target_url = "http://" + local_address + ":" + port + "/ui"
	go func() {
		fmt.Printf("\n\n-------------------------------\n\n")

		// Open link
		openBrowser(target_url)

		time.Sleep(2 * time.Second)

		// show qr
		fmt.Println("\n\n")
		qrterminal.Generate(target_url, qrterminal.M, os.Stdout)
		fmt.Println("\n\n")

		fmt.Printf("You can visit your media at: %v\n", target_url)
	}()

	// Start and run the server
	router.Run(":" + port)

	/*
		s := &http.Server{
			Addr:           ":5000",
			Handler:        router,
			ReadTimeout:    1 * time.Second,
			WriteTimeout:   1 * time.Second,
			IdleTimeout:    1 * time.Second,
			MaxHeaderBytes: 1 << 20,
		}
		s.ListenAndServe()
	*/
}
