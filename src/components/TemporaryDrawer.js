import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SingleBedIcon from '@material-ui/icons/SingleBed';
import WeekendIcon from '@material-ui/icons/Weekend';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import ChromeReaderModeOutlinedIcon from '@material-ui/icons/ChromeReaderModeOutlined';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
     <Divider />
    <h2>Categories </h2>
    <Divider />
      <List>
      
          <ListItem button key={'Tables'}>
            <ListItemIcon> <LocalDiningOutlinedIcon /></ListItemIcon>
            <ListItemText primary={'Tables'} />
          </ListItem>
          
          <ListItem button key={'Chairs'}>
            <ListItemIcon> <EventSeatIcon /></ListItemIcon>
            <ListItemText primary={'Chairs'} />
          </ListItem>
          <ListItem button key={'Sofas'}>
            <ListItemIcon> <WeekendIcon /></ListItemIcon>
            <ListItemText primary={'Sofas'} />
          </ListItem>
          <ListItem button key={'Beds'}>
            <ListItemIcon> <SingleBedIcon /></ListItemIcon>
            <ListItemText primary={'Beds'} />
          </ListItem>
          <ListItem button key={'Storage'}>
            <ListItemIcon> <ChromeReaderModeOutlinedIcon /></ListItemIcon>
            <ListItemText primary={'Storage'} />
          </ListItem>
      
      </List>
      <Divider />

    </div>
  );

  return (
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '6vh' }}
>
  <Grid item xs={12}>
  <Typography className={classes.root}>
  {['Categories'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
     
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
          <Button>        
          Newest Products
          </Button>
          <Button>
           Offerts
          </Button>
          <Button>
           About Us
          </Button>
        </React.Fragment>
      ))}

    </Typography>
  </Grid>   
</Grid>   
  );
}