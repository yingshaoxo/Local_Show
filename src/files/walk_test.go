package files

import (
	"fmt"
	"testing"
)

func Test_get(t *testing.T) {
	file_dict, err := Get_all_dir_and_files("/home/yingshaoxo/Downloads")

	if err != nil {
		t.Fail()
	}

	value, ok := file_dict["/home/yingshaoxo/Downloads"]
	if ok {
		fmt.Println("Files in Downloads folder: ", value)
	} else {
		t.Fail()
	}
}
