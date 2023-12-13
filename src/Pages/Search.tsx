import React from "react";
import { CompanyListSearchIndex } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";

function Search() {
  return (
    <div>
      <Banner/>
      <div className="container p-2">
        <CompanyListSearchIndex/>
      </div>
    </div>
  )
}

export default Search;
