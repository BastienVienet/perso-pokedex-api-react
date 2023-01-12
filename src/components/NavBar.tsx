import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {TextField} from "@mui/material";

export const NavBar = ({setFilter, setUser}: any) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }
    const handleSignOut = () => {
        setUser({})
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', flexGrow: 1, mb: 2}}>
                        <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField
                            onChange={handleSearchChange}
                            label="Pokemon name"
                            variant="standard"/>
                    </Box>
                    <Button
                        onClick={() => handleSignOut()}
                        color="inherit"
                    >
                        Sign Out
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}