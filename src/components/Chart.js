import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import * as PropTypes from "prop-types";
import Box from "@material-ui/core/Box";


function TabPanel(props) {
    const { children, value, index} = props;

    return (
        <div>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const format = () => tick => tick;
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={`${text}`}
        />
    );
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
    },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            tabs: 0,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // console.log(this.props.data);
        let v = 0;
        let arr = [];
        for(v = 0; v < 24; v++){
            let t = {};
            t.hour = v.toString();
            t.sun = parseFloat(this.props.data["s"+v.toString()]);
            t.moisture = parseFloat(this.props.data["w"+v.toString()]);
            arr.push(t);
        }
        this.setState({item : arr});
        console.log(arr);
    }

    handleChange = (event, newValue) => {
        this.setState({tabs: newValue});
    }

    render() {
        const { item, tabs} = this.state;
        const { classes } = this.props;

        return (
            <Paper>
                <AppBar position="static" color="default">
                    <Tabs value={tabs} onChange={this.handleChange} indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth" aria-label="simple tabs example">
                        <Tab label="Sunlight" {...a11yProps(0)} />
                        <Tab label="Moisture" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={tabs} index={0}>
                    {item !== null && <Chart
                        data={item}
                        className={classes.chart}
                    >
                        <ArgumentAxis tickFormat={format}/>
                        <ValueAxis
                            max={50}
                            labelComponent={ValueLabel}
                        />

                        <LineSeries
                            name="Sunlight Value"
                            valueField="sun"
                            argumentField="hour"
                        />
                        <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label}/>
                        <Title
                            text={`Average Sunlight Each Hour`}
                            textComponent={TitleText}
                        />
                        <Animation/>
                    </Chart>}
                </TabPanel>
                <TabPanel value={tabs} index={1}>
                    {item !== null && <Chart
                        data={item}
                        className={classes.chart}
                    >
                        <ArgumentAxis tickFormat={format}/>
                        <ValueAxis
                            max={50}
                            labelComponent={ValueLabel}
                        />

                        <LineSeries
                            name="Moisture Value"
                            valueField="moisture"
                            argumentField="hour"
                        />
                        <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label}/>
                        <Title
                            text={`Average Moisture Each Hour`}
                            textComponent={TitleText}
                        />
                        <Animation/>
                    </Chart>}
                </TabPanel>

            </Paper>
        );
    }
}

export default withStyles(demoStyles, { name: 'Demo' })(Demo);
