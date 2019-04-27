import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    right_corner: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
});

function CornerButton(props) {
    const { classes } = props;
    return (
        <div>
            <Tooltip title="Update" aria-label="Update">
                <Fab color="secondary" className={classes.right_corner}
                    onClick={props.handleCornerButtonClick}
                >
                    <UpdateIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}

CornerButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CornerButton);
