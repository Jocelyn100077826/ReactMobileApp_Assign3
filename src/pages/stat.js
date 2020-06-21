import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import Demo from '../components/Chart';
import BottomNav from '../components/BottomNav';

class stat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            result:"error",
            feedlog: "",
            modal: false,
            item: null,
            data: null,
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
            .then(item=>{
                this.setState({item} );
                console.log(item);
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
                this.setState({data} );
                console.log(data);
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
        return (
            <BottomNav>
                <Paper style={{height: 750}}>
                    <Grid
                        container
                        justify="space-evenly"
                        spacing={0}
                        style={{ padding: "0", paddingTop: "25px"}}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h5" style={{color: '#4682B4', paddingLeft: '20px'}} gutterBottom>
                                Statistics
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Paper style={{padding:"5px",backgroundColor: "#A52A2A"}}>
                                <Typography variant="subtitle2" style={{color: '#fff'}} gutterBottom>
                                    Sunlight
                                </Typography>
                                <Typography variant="caption" style={{color: '#fff'}} gutterBottom>
                                    Average: {this.state.item !== null? this.state.item.sunlight : ""}<br/>
                                    Variance: {this.state.item !== null? this.state.item.varianceS : ""}<br/>
                                    Std. Deviation: {this.state.item !== null? (Math.sqrt(parseFloat(this.state.item.varianceS))).toFixed(2): ""}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={5}>
                            <Paper style={{padding:"5px",backgroundColor: "#6495ED"}}>
                                <Typography variant="subtitle2" style={{color: '#fff'}} gutterBottom>
                                    Moisture
                                </Typography>
                                <Typography variant="caption" style={{color: '#fff'}} gutterBottom>
                                    Average: {this.state.item !== null? this.state.item.moisture : ""}<br/>
                                    Variance: {this.state.item !== null? this.state.item.varianceM : ""}<br/>
                                    Std. Deviation: {this.state.item !== null? (Math.sqrt(parseFloat(this.state.item.varianceM))).toFixed(2) : ""}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={{marginTop: '20px'}}>
                                {this.state.data !== null && <Demo data={this.state.data}/>}
                            </Card>
                        </Grid>
                    </Grid>
                </Paper>

            </BottomNav>
        )
    }
}

export default stat;