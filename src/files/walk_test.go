package files

import (
	"fmt"
	"os"
	"strings"
	"testing"
)

const ROOT_DIR = "/media/data/Video/I have seen before"

func Test_get_all_dir_and_files(t *testing.T) {
	file_dict, err := Get_all_dir_and_files(ROOT_DIR)

	//print_file_dict(file_dict)

	if err != nil {
		t.Error("something wroung with get_all_dir_and_files")
	}

	for dir, file_list := range file_dict {
		// make sure key is dir
		if is_dir(dir) == false {
			t.Errorf("%s should be a dir!", dir)
		}

		// make sure value is a list of files
		for _, file := range file_list {
			if is_dir(file) == true {
				t.Errorf("%s should be a file!", file)
			}
			// make sure the files under the dir is right
			if strings.Contains(file, dir) == false {
				t.Errorf("**%s** shouldn't under **%s**", file, dir)
			}
		}
	}
}

func is_dir(name string) bool {
	fi, err := os.Stat(name)
	if err != nil {
		fmt.Println(err)
		return false
	}
	switch mode := fi.Mode(); {
	case mode.IsDir():
		// do directory stuff
		return true
	case mode.IsRegular():
		// do file stuff
		return false
	}
	return false
}

func print_file_dict(file_dict map[string][]string) {
	for dir, file_list := range file_dict {
		if file_list != nil {
			fmt.Printf("%s\n %#v \n\n\n", dir, file_list)
		}
	}
}
