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

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

//const API_BASE = 'api/'
const API_BASE = 'http://127.0.0.1:5000/api/'
const API_FUNCTION_GET_INFO = 'info/'
const API_FUNCTION_GET_FILES = 'files/'

class NestedList extends React.Component {
    state = {
        info: {
            'root_folder': ''
        },
        files: {"Folder": ["No file has been found right now"]},
        open_folder: "",
    };

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
    };

    shouldYouOpen = (key) => {
        if (key == this.state.open_folder) {
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        var url = ""

        // get info
        url = `${API_BASE}${API_FUNCTION_GET_INFO}`;
        fetch(url, {
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
        .catch(error => console.log(error));

        // get files
        url = `${API_BASE}${API_FUNCTION_GET_FILES}`;
        fetch(url, {
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
        .catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                subheader={<ListSubheader component="div">Welcome to Local Show</ListSubheader>}
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
                                {this.shouldYouOpen(key) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.shouldYouOpen(key)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {
                                        this.state.files[key].map((value, index) => (
                                            <ListItem key={value} button className={classes.nested}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText inset primary={value.replace(key+"/", "")} />
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Collapse>
                        </div>
                    ))
                }
                
            </List>
        );

    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);
