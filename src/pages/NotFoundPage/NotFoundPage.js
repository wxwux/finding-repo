import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import useStyles from "./NotFoundUITheme";

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h2" component="h2">
        D'oh!
      </Typography>
      <Typography variant="h1" component="h1" className={classes.number}>
        404
      </Typography>
      <Typography variant="h6" component="h3">
        Looks as if page or document requested was not found
      </Typography>
      <Typography variant="h6" component="h4">
        Don't be sad and <Link to="/">try again</Link>
      </Typography>
    </div>
  );
};

export default React.memo(NotFoundPage);
