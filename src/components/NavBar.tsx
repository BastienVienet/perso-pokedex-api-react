import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import {FormControlLabel, FormGroup, TextField} from "@mui/material";
import {ThemeContext} from "../context/ThemeContext";
import {MaterialUISwitch} from "../style/MaterialUISwitch";

type Props = {
    setFilter: (filter: string) => void, setUser: (user: object) => void,
}

export const NavBar = ({setFilter, setUser}: Props) => {

    const {themeState: [theme], toggleTheme} = useContext(ThemeContext)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    }
    const handleSignOut = () => {
        setUser({})
    }

    return (
        <Box>
            <AppBar
                position="fixed"
                sx={{px: 2, minHeight: '10vh'}}>
                <Toolbar sx={{display: 'flex', justifyContent: "space-between", flexGrow: 1, pb: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField
                            onChange={handleSearchChange}
                            label="Pokemon name"
                            variant="standard"/>
                    </Box>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Box>
                            <FormGroup sx={{mt: 3}}>
                                <FormControlLabel
                                    control={<MaterialUISwitch/>}
                                    onClick={toggleTheme}
                                    label={`${theme} mode`}
                                />
                            </FormGroup>
                        </Box>
                        <Button sx={{mt: 3}}
                                onClick={() => handleSignOut()}
                                color="inherit"
                        >
                            Sign Out
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}