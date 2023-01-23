import * as React from 'react';
import "./login.scss"
import {LoggedIn} from "./LoggedIn";
import {Box, Grid, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";


type Props = {
    isUserLoggedIn?: boolean,
    errorMessage?: string,
    onSubmit: (data:any)=>void,
}

export function BasicLoginForm(props: Props) {

    const {register, handleSubmit, formState: {errors}} = useForm();

    if (props.isUserLoggedIn)
        return <LoggedIn name={""}/>;

    if (props.errorMessage) {
        alert("this.props.errorMessage " + props.errorMessage)
    }

    return (
        <Box sx={{display: "flex"}} justifyContent="center">
            <form onSubmit={handleSubmit(props.onSubmit)} id="loginForm">
                <Typography variant={"h4"}>Administration Console</Typography>
                <Box sx={{ margin: "auto"}}>
                    <Typography>Login</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label={"Username"}
                                variant={"standard"}
                                {...register("username", {required: true, maxLength: 35})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={"Password"}
                                variant={"standard"}
                                type={"password"}
                                autoComplete="current-password"
                                {...register("password", {required: true, maxLength: 35})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} variant={"contained"}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
}
