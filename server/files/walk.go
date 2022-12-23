package files

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
)

func init() {
	fmt.Println("files module has importd")
}

func Get_all_dir_and_files(root string) (map[string][]string, error) {
	dir_list := []string{}
	file_list := []string{}

	err := filepath.Walk(root, func(path string, f os.FileInfo, err error) error {
		if f.IsDir() {
			dir_list = append(dir_list, path)
		} else {
			file_list = append(file_list, path)
		}
		return nil
	})

	sort.Strings(dir_list)
	sort.Strings(file_list)
	temp_file_list := []string{}

	var file_dict = make(map[string][]string)
	for index := range dir_list {
		index = len(dir_list) - 1 - index
		dir := dir_list[index]
		// now index starts from the end, you can inversely do things
		for _, file := range file_list {
			if strings.Contains(file, dir) {
				_, key_exist := file_dict[dir]
				if key_exist {
					file_dict[dir] = append(file_dict[dir], file)
				} else {
					file_dict[dir] = []string{file}
				}
			} else {
				temp_file_list = append(temp_file_list, file)
			}
		}
		file_list = temp_file_list
		temp_file_list = []string{}
	}

	return file_dict, err
}
