import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import useStyles from "./UserInfoUITheme";

const UserInfo = ({ user }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.avatar}
        image={user["avatar_url"]}
        title={user.login}
      ></CardMedia>
      <CardContent>
        <Typography id="user-name" variant="h4" component="h4" className={classes.username}>
          {user.login}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
