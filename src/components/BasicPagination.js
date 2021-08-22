import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function BasicPagination() {
  const classes = useStyles();
  return (
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '6vh' }}
>
    <div className={classes.root}>
      <Grid item xs>
        <Pagination count={10} color="primary" />
      </Grid>
    </div>
    </Grid>
  );
}