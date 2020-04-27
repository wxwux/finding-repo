import React from "react";
import PropTypes from "prop-types";
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
    <Grid id="repo-stats" className={classes.container}>
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

Stats.propTypes = {
  forks: PropTypes.number.isRequired,
  issues: PropTypes.number.isRequired,
  subscribers: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
};

export default React.memo(Stats);
