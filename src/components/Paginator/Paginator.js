import React from "react";
import { connect } from "react-redux";
import {
  parseSearchQueryFromUrl,
  queryConstructor,
} from "../../helpers/queries";
import { fetchReposByQueryRequest } from "../../store/actions";

const Paginator = ({ pagination, fetchReposByQueryRequest }) => {
  const navigate = (pageNum) => {
    const query = queryConstructor.byPageForTitle(pageNum, "loftschool")
    fetchReposByQueryRequest(query);
  };

  // const buttons = Object.keys(pagination).map((paginationField) => {
  //   const pagesNames = ["next", "prev"];

  //   if (pagesNames.includes(paginationField)) {
  //     const pageUrl = pagination[paginationField];

  //     return (
  //       <button
  //         type="button"
  //         onClick={() => navigate(pageUrl)}
  //         key={paginationField}
  //       >
  //         {paginationField}
  //       </button>
  //     );
  //   }
  // });

  const generateButtons = () => {
    const buttons = [];

    for (let i = 1; i <= pagination.total; i++) {
      const button = (
        <button key={i} onClick={() => navigate(i)}>
          {i}
        </button>
      );
      buttons.push(button);
    }

    return buttons;
  };

  return <>{generateButtons()}</>;
};

const mapStateToProps = (state) => ({
  pagination: state.pagination,
});

const mapDispatchToProps = { fetchReposByQueryRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
