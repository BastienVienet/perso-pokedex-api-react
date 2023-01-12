import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from "@mui/material";

export const NavBar = ({setFilter}: any) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{mb: 2}}>
                        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                            <TextField
                                onChange={handleSearchChange}
                                label="Pokemon name"
                                variant="standard"/>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}