import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import DPlayer from "react-dplayer";

import {HOST} from './Const';
const MEDIA_BASE = HOST + 'media/'

class MyVideoPlayer extends React.Component {
    state = {
        show: true
    }

    render() {
        return (
            <div>
                {
                    (this.state.show)?
                        <DPlayer 
                            video={{
                            url: this.props.target_url
                            }}
                            autoplay='true'
                            preload='metadata'
                            onError={() => {
                                console.log("Something went wroung...")
                                this.setState({
                                    show: false,
                                })
                            }}
                        />
                    :
                        null
                }
            </div>
        )
    }
}

class ResponsiveDialog extends React.Component {
    get_target_url = () => {
        var root_folder = this.props.parentState.info['root_folder']
        var path = this.props.parentState.selected_file_path
        var target_url = MEDIA_BASE + path.replace(root_folder, "")
        return target_url
    }

    render() {
        //you can let it auto decide by setting fullScreen={fullScreen}
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={false}
                    open={this.props.parentState.keep_popup_open}
                    onClose={this.props.handlePopupClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle 
                        id="responsive-dialog-title"
                        style={{
                            wordWrap: 'break-word',
                        }}
                    >
                        {this.props.parentState.selected_file_name}
                    </DialogTitle>
                    <DialogContent>
                        <MyVideoPlayer
                            target_url={this.get_target_url()}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => {
                                console.log(this.get_target_url())
                                window.open(this.get_target_url(), "_blank")
                            }} 
                            color="primary" 
                        >
                            Download 
                        </Button>
                        <Button 
                            onClick={() => {
                                var file_url = this.get_target_url().replace("https://", "").replace("http://", "")
                                var intent_url = `intent://${file_url}#Intent;action=android.intent.action.VIEW;scheme=http;type=video/mp4;end`
                                window.open(intent_url, "_blank")
                            }} 
                            color="primary" 
                            autoFocus
                        >
                            Play
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog({breakpoint: 'xm'})(ResponsiveDialog);
