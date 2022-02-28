import * as React from 'react';
import {connect} from 'react-redux';
import {createLoginAction} from './redux/loginActions';
import {isUserLoggedIn} from '../selectors';
import "./login.scss"
import {LoggedIn} from "./LoggedIn";
import {AppState, Product} from "../AppState";
import {Box, Grid, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";


type Props = {
    isUserLoggedIn?: boolean,
    errorMessage?: string,
    onSubmit: (data:any)=>void,
    // handleSubmit: Function
}

// type State = {
// 	username?: string,
// 	password?: string
// }

export function BasicLoginForm(props: Props) {

    const {register, handleSubmit, formState: {errors}} = useForm();

    if (props.isUserLoggedIn)
        return <LoggedIn name={""}/>;

    if (props.errorMessage) {
        alert("this.props.errorMessage " + props.errorMessage)
    }

    return (
        <Box p={3}>
            <form onSubmit={handleSubmit(props.onSubmit)} id="loginForm">
                <Typography>Login</Typography>
                <Box m={1}>
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
