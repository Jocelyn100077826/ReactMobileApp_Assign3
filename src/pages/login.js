import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BottomNav from '../components/BottomNav';
import TextField from "@material-ui/core/TextField";

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            un: "",
            pw: ""
        };
    }

    handleChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value });
        console.log(this.state);
    }

    handleLogin = () =>{
        if(this.state.un === "admin" && this.state.pw === "admin"){
            console.log("hi");
            window.location.href = '/main';
        }else{
            window.alert("Invalid username or password")
        }
    }

    render() {

        return (
            <BottomNav login={true}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Paper style={{padding: "40px", marginLeft: "auto", marginRight: "auto", maxWidth: "500px"}}>
                    <Typography variant="h6" align='center'>
                        Login
                    </Typography>
                    <br/>
                    <TextField
                        label="Username"
                        fullWidth
                        name="un"
                        onChange={this.handleChange}
                        variant="outlined"
                    />
                    <br/>
                    <br/>
                    <TextField
                        label="Password"
                        fullWidth
                        name="pw"
                        type="password"
                        onChange={this.handleChange}
                        variant="outlined"
                    />
                    <br/>
                    <br/>
                    <Button variant="contained" fullWidth color="primary" onClick={this.handleLogin}>
                        Login
                    </Button>
                </Paper>
            </BottomNav>
        )
    }
}

export default login;