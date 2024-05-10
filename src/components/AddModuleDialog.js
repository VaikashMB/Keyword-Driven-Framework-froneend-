import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Box } from '@mui/material';
import axios from 'axios';
import CreateNewFolderSharpIcon from '@mui/icons-material/CreateNewFolderSharp';


const AddModuleDialog = ({ selectedProject }) => {

    const [open, setOpen] = React.useState(false);

    const [addModules, setAddModules] = React.useState({
        moduleName: "",
        moduleDescription: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddModule = () => {
        axios.post(`http://localhost:8081/addModule/${selectedProject}`, addModules)
            .then((response) => setAddModules(response.data))
            .catch((error) => console.log(error));
        handleClose()
    }

    return (
        <Box>
            <Button onClick={handleClickOpen}>
                <CreateNewFolderSharpIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Module</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="moduleName"
                        name="moduleName"
                        label="Module Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={addModules.moduleName}
                        onChange={(e) => setAddModules({ ...addModules, moduleName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="moduleDescription"
                        name="moduleDescription"
                        label="Module Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={addModules.moduleDescription}
                        onChange={(e) => setAddModules({ ...addModules, moduleDescription: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="button" onClick={handleAddModule}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AddModuleDialog;
