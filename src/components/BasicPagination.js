import React, { Fragment } from 'react';
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
  justify="center"
  style={{ minHeight: '6vh' }}
>
    <Fragment className={classes.root}>
      <Grid item xs>
        <Pagination count={10} color="primary" />
      </Grid>
    </Fragment>
    </Grid>
  );
}