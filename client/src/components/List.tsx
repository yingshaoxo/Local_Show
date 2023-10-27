import React from 'react';

import { ListSubheader, Slide } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Collapse } from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {HOST, API_BASE, API_FUNCTION_GET_INFO, API_FUNCTION_GET_FILES, API_FUNCTION_UPDATE_FILES} from '../configuration';
import ResponsiveDialog from './Popup';
import CornerButton from './CornerButton';

type MyPropertys = {
    [index: string]: any
}

type MyState = {
    [index: string]: any
}

class NestedList extends React.Component<MyPropertys, MyState> {
    state: any = {
        info: {
            'root_folder': ''
        },
        files: {"Folder": ["No file has been found right now"]},
        open_folder: "",

        keep_popup_open: false,
        selected_file_name: 'yingshaoxo',
        selected_file_path: 'https://yingshaoxo.xyz',
    };

    constructor(propertys: MyPropertys) {
        super(propertys);
        this.state.open_folder = localStorage.getItem("open_folder")??""
    }

    get_short_name_of_a_file = (path: string) => {
        let splits = path.split("/")

        if (splits.length >= 3) {
            path = splits.slice(-1,).join("/")
            return path
        }

        return path
    }

    function_get_info = () => {
        // get info
        var url = `${API_BASE}${API_FUNCTION_GET_INFO}`;
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(
            response => response.json()
        )
        .then(result => {
            //console.log(result)
            this.setState(state => ({
                info: result,
            }))
        })
        //.catch(error => console.log(error));
    }

    function_get_files = () => {
        // get files
        var url = `${API_BASE}${API_FUNCTION_GET_FILES}`;
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(
            response => response.json()
        )
        .then(result => {
            //console.log(result)
            this.setState(state => ({
                files: result,
            }))
        })
        //.catch(error => console.log(error));
    }

    function_update_files = async () => {
        // update files
        var url = `${API_BASE}${API_FUNCTION_UPDATE_FILES}`;
        return fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(
            response => response.json()
        )
        .then(result => {
            //console.log(result)
        })
        //.catch(error => console.log(error));
    }

    async componentDidMount() {
        await this.function_get_info();
        await this.function_get_files();
    }

    handleFolderClick = (key: string) => {
        if (this.state.open_folder == key) {
            this.setState(state => ({ 
                open_folder: ""
            }));
            localStorage.setItem("open_folder", "")
        } else {
            this.setState(state => ({ 
                open_folder: key
            }));
            localStorage.setItem("open_folder", key)
        }
    }

    shouldYouOpenFolder = (key: string) => {
        if (key == this.state.open_folder) {
            return true
        } else {
            return false
        }
    }

    handleFileClick = (name: any, path: any) => {
        this.setState(state => ({
            keep_popup_open: true,
            selected_file_name: name,
            selected_file_path: path,
        }))
    }

    handlePopupClose = () => {
        this.setState(state => ({
            keep_popup_open: false 
        }))
    }

    handleCornerButtonClick = async () => {
        // We do this to refresh file list and filter some unimportant files
        await this.function_update_files()
        await this.function_get_files();

        var files = this.state.files
        //console.log(Object.keys(files).length)
        var new_dict = new Map()
        Object.keys(files).forEach(function(key) {
            var value = files[key]
            var new_value: any[] = []
            var ok = false

            Object.keys(value).forEach(function(sub_key) {
                var sub_value = value[sub_key]
                var extension = (/[.]/.exec(sub_value)) ? ((/[^.]+$/.exec(sub_value)??[undefined])[0]) : undefined
                if ((extension != undefined) && (['mp4', 'avi', 'mkv', 'rmvb', 'wmv'].includes(extension.toLowerCase()))) {
                    ok = true
                    new_value.push(sub_value)
                }
            })

            if (ok) {
                new_dict.set(key, new_value)
            }
        });

        let obj = Array.from(new_dict).reduce((obj, [key, value]) => (
            Object.assign(obj, { [key]: value })
        ), {});
        this.setState(state => ({
            files: obj
        }))

        //console.log(obj)
        //console.log(Object.keys(obj).length)
    }

    render() {
        return (
            <div >
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Welcome to the Local Show</ListSubheader>}
                    style={{
                        width: '100%',
                    }}

                    disablePadding={true} 
                >
                    {
                        Object.keys(this.state.files).map((key, index) => (
                            <div key={key} >
                                <ListItem
                                    onClick={() => {
                                        this.handleFolderClick(key)
                                    }}
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary={key.replace(this.state.info['root_folder']+"/", "")} 
                                        style={{
                                            paddingLeft: '0px',
                                        }}
                                    />
                                    {this.shouldYouOpenFolder(key) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </ListItem>
                                <Collapse in={this.shouldYouOpenFolder(key)} timeout="auto" unmountOnExit>
                                    <List component="div" 
                                        // disablePadding={true}
                                        // dense={true}
                                    >
                                        {
                                            this.state.files[key].map((value: string | null | undefined, index: any) => (
                                                <ListItem key={value} style={{
                                                    paddingLeft: '0px',
                                                }}
                                                >
                                                    <ListItemIcon
                                                        style={{
                                                            minWidth: 'fit-content'
                                                        }}
                                                        className="ml-8 mr-4"
                                                    >
                                                        <ChevronRightIcon />
                                                    </ListItemIcon>
                                                    <ListItemText inset 
                                                        style={{
                                                            paddingLeft: '0px',
                                                        }}
                                                        primary={this.get_short_name_of_a_file(value??"")}
                                                        onClick={() => {
                                                            var name = this.get_short_name_of_a_file(value??"")
                                                            var path = value
                                                            this.handleFileClick(name, path)
                                                        }}
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </div>
                        ))
                    }
                    
                </List>

                <CornerButton
                    handleCornerButtonClick={this.handleCornerButtonClick}
                >
                </CornerButton>

                <ResponsiveDialog
                    parentState={this.state}
                    handlePopupClose={this.handlePopupClose}
                >
                </ResponsiveDialog>
            </div>
        );

    }
}

export default NestedList;
