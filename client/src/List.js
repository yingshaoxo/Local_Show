import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ChevronRight from '@material-ui/icons/ChevronRight';

import {HOST} from './Const';
import ResponsiveDialog from './Popup';
import CornerButton from './CornerButton';

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

const API_BASE = HOST + 'api/'
const API_FUNCTION_GET_INFO = 'info/'
const API_FUNCTION_GET_FILES = 'files/'
const API_FUNCTION_UPDATE_FILES = 'update/'

class NestedList extends React.Component {
    state = {
        info: {
            'root_folder': ''
        },
        files: {"Folder": ["No file has been found right now"]},
        open_folder: "",

        keep_popup_open: false,
        selected_file_name: 'yingshaoxo',
        selected_file_path: 'https://yingshaoxo.xyz',
    };

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
            console.log(result)
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
            console.log(result)
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
            console.log(result)
        })
        //.catch(error => console.log(error));
    }

    async componentDidMount() {
        await this.function_get_info();
        await this.function_get_files();
    }

    handleFolderClick = (key) => {
        if (this.state.open_folder == key) {
            this.setState(state => ({ 
                open_folder: ""
            }));
        } else {
            this.setState(state => ({ 
                open_folder: key
            }));
        }
    }

    shouldYouOpenFolder = (key) => {
        if (key == this.state.open_folder) {
            return true
        } else {
            return false
        }
    }

    handleFileClick = (name, path) => {
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
        console.log(Object.keys(files).length)
        var new_dict = new Map()
        Object.keys(files).forEach(function(key) {
            var value = files[key]
            var new_value = []
            var ok = false

            Object.keys(value).forEach(function(sub_key) {
                var sub_value = value[sub_key]
                var extension = (/[.]/.exec(sub_value)) ? /[^.]+$/.exec(sub_value)[0] : undefined
                if ((extension != undefined) && (['mp4', 'avi', 'mkv', 'rmvb'].includes(extension.toLowerCase()))) {
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

        console.log(obj)
        console.log(Object.keys(obj).length)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Welcome to the Local Show</ListSubheader>}
                    className={classes.root}
                >
                    {
                        Object.keys(this.state.files).map((key, index) => (
                            <div key={key}>
                                <ListItem button 
                                    onClick={() => {
                                        this.handleFolderClick(key)
                                    }}
                                >
                                    <ListItemIcon>
                                        <FolderIcon />
                                    </ListItemIcon>
                                    <ListItemText inset primary={key.replace(this.state.info['root_folder']+"/", "")} />
                                    {this.shouldYouOpenFolder(key) ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={this.shouldYouOpenFolder(key)} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            this.state.files[key].map((value, index) => (
                                                <ListItem key={value} button className={classes.nested}>
                                                    <ListItemIcon>
                                                        <ChevronRight />
                                                    </ListItemIcon>
                                                    <ListItemText inset 
                                                        primary={value.replace(key+"/", "")}
                                                        onClick={() => {
                                                            var name = value.replace(key+"/", "")
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

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
