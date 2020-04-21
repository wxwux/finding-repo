import React from "react";

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import CallSplitIcon from "@material-ui/icons/CallSplit";
import BugReportIcon from "@material-ui/icons/BugReport";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";

import useStyles from "./StatsUITheme";

const Item = ({ amount, icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      {icon}
      <span className={classes.number}>{amount}</span>
    </div>
  );
};

const Stats = ({ forks, issues, subscribers, stars }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container}>
      <Item icon={<CallSplitIcon />} amount={forks}></Item>
      <Divider orientation="vertical" flexItem />
      <Item icon={<BugReportIcon />} amount={issues}></Item>
      <Divider orientation="vertical" flexItem />
      <Item icon={<VisibilityIcon />} amount={subscribers}></Item>
      <Divider orientation="vertical" flexItem />
      <Item icon={<StarIcon />} amount={stars}></Item>
    </Grid>
  );
};

export default Stats;
