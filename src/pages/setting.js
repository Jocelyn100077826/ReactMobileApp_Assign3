import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import BottomNav from '../components/BottomNav';

class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            result:"error",
            feedlog: "",
            modal: false,
            item: null,
            sunlightThreshold: "",
            moistureThreshold: "",
            automation: "",
            latest: null,
            stat: null
        };
    }

    abortController = new AbortController();

    async componentDidMount() {
        fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/stat', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: this.abortController.signal

        })
            .then(result=>result.json())
            .then(stat=>{
                this.setState({stat} );
                console.log(stat);
            })
            .catch(e=>{
                console.log(e);
                return e;
            })

        fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/threshold', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: this.abortController.signal
        })
            .then(result=>result.json())
            .then(item=>{
                let i = item.Item;
                this.setState({item: i, moistureThreshold: i.moistureThreshold, sunlightThreshold: i.sunlightThreshold, automation: i.timeBetween});
                console.log(item.Item);
            })
            .catch(e=>{
                console.log(e);
                return e;
            })

        fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/water', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: this.abortController.signal
        })
            .then(result=>result.json())
            .then(latest=>{
                this.setState({latest: latest.Item.timestamp} );
                // console.log(latest.Item.timestamp);
            })
            .catch(e=>{
                console.log(e);
                return e;
            })

    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    render() {
        const ava = {
            width: '80px',
            height: '80px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '30px',
            marginBottom: '10px',
            display: 'block'
        }

        const handleInput = (e) =>{
            this.setState({ [e.target.name] : e.target.value });
            console.log(this.state.automation + " , " + this.state.sunlightThreshold + " , " + this.state.moistureThreshold);
        }

        const handleSubmit = (e) => {
            console.log(this.state.automation + " , " + this.state.sunlightThreshold + " , " + this.state.moistureThreshold);
            let ans = this.state.latest + (this.state.automation * 86400000)

            fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/threshold', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "mt": this.state.moistureThreshold,
                    "st": this.state.sunlightThreshold,
                    "tb": this.state.automation,
                    "msg": "threshold",
                    "latest": ans
                })
            })
            .then(result=>{window.alert("Successfully Updated")})
            .catch(e=>{
                console.log(e);
                return e;
            })
            var unix = Math.round(+new Date());
            let auto = parseInt(this.state.latest) + (this.state.automation * 86400000);
            console.log("auto: " + auto);
            console.log("unix: " + unix);
            if(auto <= unix){
                console.log("auto");

                fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/water', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "ts": unix
                    })
                })
                    .then(result=>{console.log("Successfully Updated")})
                    .catch(e=>{
                        console.log(e);
                        return e;
                    })
            }
        }

        return (
            <BottomNav>
                <Paper style={{height: 650, marginLeft: "auto", marginRight: "auto", maxWidth: "500px"}}>
                    <Grid
                        container
                        justify="space-between"
                        spacing={1}
                        style={{ padding: "0"}}
                    >
                        <Grid item xs={12}>
                        <Paper style={{padding:"20px",backgroundColor: "#2F4F4F"}}>
                            <Avatar alt="Profile Pic" src="https://img3.wikia.nocookie.net/__cb20110818044110/digimon/images/f/f8/Leafmon_t.gif" style={ava}/>
                            <Typography variant="h6" align='center' style={{color: '#fff'}} gutterBottom>
                                        Username
                                    </Typography>
                        </Paper>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: "20px", paddingLeft: "20px"}}>
                            <Typography variant="h5" style={{color: '#4682B4'}} gutterBottom>
                                Threshold
                            </Typography>
                        </Grid>
                        <Grid item container justify="space-between" style={{paddingLeft: "25px", paddingRight: "25px"}} xs={12}>
                            <Grid item xs={8}>
                                <Typography variant="body1" style={{paddingTop: "10px"}}>
                                    Moisture
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{paddingTop: "5px"}}>
                                    Recommended: {this.state.stat !== null&& Math.round(this.state.stat.moisture) }
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{marginBottom: "15px"}}>
                                <TextField value={this.state.moistureThreshold} name="moistureThreshold" onChange={handleInput}/>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" style={{paddingTop: "10px"}}>
                                    Sunlight
                                </Typography>
                                <Typography variant="caption" color="textSecondary" style={{paddingTop: "5px"}}>
                                    Recommended: {this.state.stat !== null&& Math.round(this.state.stat.sunlight) }
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{marginBottom: "35px"}}>
                                <TextField value={this.state.sunlightThreshold} name="sunlightThreshold" onChange={handleInput} />
                            </Grid>
                            <Grid item xs={12}>
                            <Divider />
                            <br/>
                            <br/>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="body1" style={{paddingTop: "10px"}}>
                                    Auto Water Every n Days
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{marginBottom: "35px"}}>
                                <TextField value={this.state.automation} name="automation" onChange={handleInput} />
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: "35px"}}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <Button fullWidth variant="contained" size="large" color="primary" onClick={handleSubmit}>
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <br/>
            </BottomNav>
        )
    }
}

export default setting;