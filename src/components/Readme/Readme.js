import React from "react";
import { connect } from "react-redux";
import Truncate from "react-truncate-html";
import { getHtmlFromMarkdownBase64 } from "../../helpers/markdown";

import { fetchReadmeRequest } from "../../store/actions";

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
      ellipsis={"<span>read more</span>"}
      dangerouslySetInnerHTML={{
        __html: getHtmlFromMarkdownBase64(data.content),
      }}
    />
  );
};

const mapDispatchToProps = { fetchReadmeRequest };
const mapStateToProps = ({ readme }) => ({ readme });

export default connect(mapStateToProps, mapDispatchToProps)(Readme);
