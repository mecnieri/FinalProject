import React, { Component } from "react";
import Pagination from "react-js-pagination";
require("bootstrap/less/bootstrap.less");

<div>
    <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
    />
</div>

