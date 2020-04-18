import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchReadmeRequest } from "../../store/actions";
import { useParams } from "react-router-dom";
import { markdown } from "markdown-js";

const Readme = ({ fetchReadmeRequest, readme }) => {
  const { owner, title } = useParams();
  const { data } = readme;

  useEffect(() => {
    fetchReadmeRequest({ owner, title });
  }, [fetchReadmeRequest, owner, title]);

  const b64DecodeUnicode = (str) => {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  };

  if (!data) {
    return "no data";
  } else {
    // const content = toBinary(data.content);
    // console.log("content", content);
    const content = b64DecodeUnicode(data.content);
    const markup = markdown.toHTML(content);

    return <div>{markup}</div>;
  }
};

const mapDispatchToProps = { fetchReadmeRequest };
const mapStateToProps = ({ readme }) => ({ readme });

export default connect(mapStateToProps, mapDispatchToProps)(Readme);
