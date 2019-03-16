package files

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func init() {
	fmt.Println("you have imported files module")

	/*
		whatever := "me"
		new_string := fmt.Sprintf("hi there, %s", whatever)
		fmt.Println(new_string)

		file_dict, err := get_all_dir_and_files("/media/data/Video")
		if err == nil {
			print_file_dict(file_dict)
		}
	*/
}

func Get_all_dir_and_files(root string) (map[string][]string, error) {
	var file_dict = make(map[string][]string)
	var temp_dir string
	err := filepath.Walk(
		root,
		func(path string, info os.FileInfo, err error) error {
			if strings.Contains(path, "/.") == false {
				if info.IsDir() {
					file_dict[path] = []string{}
					temp_dir = path
				} else {
					file_dict[temp_dir] = append(file_dict[temp_dir], path)
				}
			}
			return nil
		},
	)
	return file_dict, err
}

func print_file_dict(file_dict map[string][]string) {
	for dir, file_list := range file_dict {
		if file_list != nil {
			fmt.Printf("%s\n %#v \n\n\n", dir, file_list)
		}
	}
}
