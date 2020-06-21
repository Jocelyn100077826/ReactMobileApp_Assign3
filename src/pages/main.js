import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Button from "@material-ui/core/Button";
import BottomNav from '../components/BottomNav';

class main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            result:"error",
            feedlog: "",
            modal: false,
            item: null,
            latest: null,
            days: null,
            hours: null,
            minutes: null,
            data: null,
            threshold: null,
        };
    }

    abortController = new AbortController();

    async componentDidMount() {
        var now = new Date();

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
                var then = new Date(parseInt(latest.Item.timestamp));
                var delta = Math.abs(now - then) / 1000;
                var days = Math.floor(delta / 86400);
                delta -= days * 86400;
                var hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600
                var minutes = Math.floor(delta / 60) % 60;

                console.log(days + " / " + hours + " / " + minutes );

                this.setState({latest , days, hours, minutes } );
            })
            .catch(e=>{
                console.log(e);
                return e;
            })

        fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/sunlight', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: this.abortController.signal

        })
            .then(result=>result.json())
            .then(data=>{
                this.setState({data: data.latest} );
                console.log(data.latest);
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
            .then(threshold=>{
                let i = threshold.Item;
                this.setState({threshold: i});
                console.log(threshold.Item);
            })
            .catch(e=>{
                console.log(e);
                return e;
            })


    }
    componentWillUnmount() {
        this.abortController.abort();
    }
    handleWatering = () => {
        var water = {msg : "water"}
        fetch('https://mlnb6kftml.execute-api.us-east-1.amazonaws.com/Test/activate', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(water)

        })
            .then(result=>result.json())
            .then(item=>{
                console.log(item);
            })
            .catch(e=>{
                console.log(e);
                return e;
            })
    }

    render() {
        const img = {
            width: 150,
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
        }

        var light = "#D3D3D3"

        if (this.state.threshold !== null && this.state.data !== null){
            console.log(this.state.data.sun + " " + this.state.threshold.sunlightThreshold)
            if(parseInt(this.state.data.sun) <= parseInt(this.state.threshold.sunlightThreshold)){
                light ="#FFD700";
            }
        }

        return (
            <BottomNav>
                <Paper style={{height: "80vh", padding: "20px", marginLeft: "auto", marginRight: "auto", maxWidth: "500px"}}>
                    <Grid
                        container
                        spacing={1}
                        justify="flex-start"
                        style={{height: "80vh", paddingTop: "5vh"}}
                    >
                        <Grid item xs={3} >
                            <EmojiObjectsIcon style={{ fontSize: 40 ,padding:'0', margin: '0', color: light }}/>
                            <br/>
                            {/*<OpacityIcon style={{ fontSize: 40 , color: water}} />*/}
                        </Grid>
                        <Grid item xs={6} >
                            <img src="https://image.flaticon.com/icons/svg/628/628283.svg" alt="img" style={img}/>
                            <br/>
                            <Typography align="center" variant="body1" >
                                Sunlight: {this.state.data !== null&& this.state.data.sun}<br/>
                                Moisture: {this.state.data !== null&& this.state.data.water}
                            </Typography>
                            {this.state.latest !== null && <Typography align="center" variant="subtitle2">
                                Last Watered: {this.state.days} days,
                                {this.state.hours} hrs,
                                {this.state.minutes} mins ago
                            </Typography>}
                        </Grid>
                        <Grid item xs={12} style={{paddingLeft: "50px", paddingRight: "50px"}}>
                            <br/>
                            <Button fullWidth onClick={this.handleWatering} variant="contained" size="large" color="primary">
                                Water Plant
                            </Button>
                            <br/>
                            <br/>
                            {/*<Button fullWidth variant="contained" size="large" color="primary">*/}
                            {/*    Turn On Grow Lamp*/}
                            {/*</Button>*/}
                        </Grid>
                    </Grid>
                </Paper>
            </BottomNav>
        )
    }
}

export default main;