import { Fab } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';


function CornerButton(props: any) {
    return (
        <div style={{
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed',
        }}>
            <Tooltip title="Update" aria-label="Update">
                <Fab color="warning" 
                    onClick={props.handleCornerButtonClick}
                >
                    <UpdateIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}


export default CornerButton;
