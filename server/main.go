package main

import (
	"io/fs"

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

	"embed"

	"github.com/yingshaoxo/Local_Show/files"
)

// content holds our static web server content.
//go:embed ui/*
var ui_storage embed.FS

func openBrowser(url string) {
	switch runtime.GOOS {
	case "linux":
		exec.Command("xdg-open", url).Start()
	case "windows":
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		exec.Command("open", url).Start()
	default:
		print(fmt.Errorf("unsupported platform"))
	}
}

func findAvailablePort(port int) string {
	for true {
		host_string := "127.0.0.1"
		port_string := strconv.Itoa(port)

		port_usable_1 := true
		timeout := time.Millisecond * 300
		conn, err := net.DialTimeout("tcp", net.JoinHostPort(host_string, port_string), timeout)
		if conn != nil {
			defer conn.Close()
		}
		if err != nil {
			port_usable_1 = true
		} else {
			port_usable_1 = false
		}

		port_usable_2 := true
		connection, err := net.Listen("tcp", ":"+port_string)
		if connection != nil {
			defer connection.Close()
		}
		if err != nil {
			port_usable_2 = false
		} else {
			port_usable_2 = true
		}

		if port_usable_1 && port_usable_2 {
			break
		} else {
			port = port + 1
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

	// ping
	ping_dict := map[string]string{
		"name":    "local_show",
		"sub_url": "/ui",
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
	ui_storage, _ := fs.Sub(ui_storage, "ui")
	router.StaticFS("/ui/", http.FS(ui_storage))

	// handle not found error
	router.NoRoute(func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "/ui/")
	})

	// Serve target files
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

		api.Any("ping/", func(c *gin.Context) {
			//whatever := c.Query("name")
			c.JSON(http.StatusOK, ping_dict)
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

	port := findAvailablePort(5012)

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

		ping_dict["url"] = target_url
	}()

	// Start and run the server
	router.Run(":" + port)
}
