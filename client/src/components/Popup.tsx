import React, { LegacyRef, Ref } from 'react';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent } from '@mui/material';

import ReactPlayer from 'react-player'

import { HOST, API_BASE, MEDIA_BASE, API_FUNCTION_GET_INFO, API_FUNCTION_GET_FILES, API_FUNCTION_UPDATE_FILES } from '../configuration';

class MyVideoPlayer extends React.Component<{target_url:string}, {show: boolean}> {
    state = {
        show: true
    }

    render() {
        return (
            <div>
                {
                    (this.state.show) ?
                        <ReactPlayer
                            url={this.props.target_url}
                            controls={true}
                            width={"100%"}
                            height={"80%"}
                            playing={true}
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

class ResponsiveDialog extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    get_target_url = () => {
        var root_folder = this.props.parentState.info['root_folder']
        var path = this.props.parentState.selected_file_path

        let temp: string = path.replace(root_folder, "")
        if (temp.startsWith("/")) {
            temp = temp.slice(1,)
        }
        var target_url = MEDIA_BASE + temp

        return target_url
    }

    to_do_a_refresh = () => {
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
            })
        //.catch(error => console.log(error));
    }

    render() {
        //you can let it auto decide by setting fullScreen={fullScreen}
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    fullScreen={false}
                    maxWidth={"lg"}
                    open={this.props.parentState.keep_popup_open}
                    onClose={() => {
                        try {
                            //console.log(this.dplayerRef.current.getActivePlayer())
                            //console.log(Object.getOwnPropertyNames(this.dplayerRef.current.getActivePlayer()))
                            //this.dplayerRef.current.playing = false
                            //console.log(Object.getOwnPropertyNames(this.dplayerRef.current.dp))
                        } catch {
                        }
                        this.props.handlePopupClose()
                        //this.to_do_a_refresh()
                    }}
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
                    <DialogContent
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div
                            className="mb-2"
                        >
                            <MyVideoPlayer
                                target_url={this.get_target_url()}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
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

export default ResponsiveDialog;
