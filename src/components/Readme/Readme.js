import React from "react";
import PropTypes from "prop-types";
import Truncate from "react-truncate-html";
import { getHtmlFromMarkdownBase64 } from "../../helpers/markdown";

import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "./ReadmeUITheme";

const Readme = ({ readme }) => {
  const { data, pending } = readme;
  const classes = useStyles();

  if (pending) {
    return (
      <div className={classes.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (!data) return "No readme was provided";

  return (
    <Truncate
      lines={30}
      ellipsis={"..."}
      dangerouslySetInnerHTML={{
        __html: getHtmlFromMarkdownBase64(data.content),
      }}
    />
  );
};

Readme.propTypes = {
  readme: PropTypes.object,
};

export default React.memo(Readme);
