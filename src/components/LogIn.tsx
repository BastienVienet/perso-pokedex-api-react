import * as React from 'react';
import {useEffect, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import jwtDecode from "jwt-decode";
import {CredentialResponse} from "google-one-tap";

type Props = {
    setUser: (user: object) => void
}

export const LogIn = ({setUser}: Props) => {

    const signInDivRef = useRef<HTMLButtonElement | null>(null)

    const handleCallbackResponse = (credentialResponse: CredentialResponse) => {
        let userObject: Object = jwtDecode(credentialResponse!.credential)
        setUser(userObject)
    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '298464813913-rh03pksk5pkj5d1vtmbencjnenqs7u6v.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        if (signInDivRef.current) {
            google.accounts.id.renderButton(
                signInDivRef.current,
                {theme: "outline", size: "large"}
            );
        }

        google.accounts.id.prompt();
        // eslint-disable-next-line
    }, [])

    const Copyright = (props: any) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="http://localhost:3000">
                    Pokedex - Vienet Bastien
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const theme = createTheme();

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{mb: 2, bgcolor: 'primary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box>
                            <Button
                                ref={signInDivRef}
                                fullWidth
                                sx={{my: 3}}
                            >
                                Sign In
                            </Button>
                        </Box>
                        <Copyright/>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}