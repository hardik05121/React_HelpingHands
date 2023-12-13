import React from "react";
import { CompanyListIndex } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";

function Home() {
  return (
    <div>
      <Banner/>
      <div className="container p-2">
        <CompanyListIndex/>
      </div>
    </div>
  )
}

export default Home;
