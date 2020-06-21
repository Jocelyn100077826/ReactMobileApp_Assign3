import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

class BottomNav extends Component {

    render(){
        if(this.props.login === true){
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
        return (
            <div>
                {this.props.children}
            <AppBar position="fixed" color="primary" style={{top: "auto", bottom: 0}}>
                <CssBaseline />
                <BottomNavigation>
                    <BottomNavigationAction label="Recents" value="recents" component={Link} to="/main" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Favorites" value="favorites" component={Link} to="/stat" icon={<BarChartIcon />} />
                    <BottomNavigationAction label="Nearby" value="nearby" component={Link} to="/setting" icon={<SettingsIcon />} />
                </BottomNavigation>
            </AppBar>
            </div>
        );
    }
}

export default BottomNav;