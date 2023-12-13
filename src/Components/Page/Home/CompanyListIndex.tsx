import React, { useState, useEffect } from "react";
import { useGetCompanySearchByLazyLoadingQuery } from "../../../Apis/companyApi";
import { companyModel } from "../../../Interfaces";
import CompanyIndex from "./CompanyIndex";
import { useDispatch } from "react-redux";
import { setCompany } from "../../../Storage/Redux/companySlice";
import { MainLoader,MiniLoader } from "../Common";

function CompanyListIndex() {
  const [pageNum, setPageNum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [allCompanys, setAllCompanys] = useState<companyModel[]>([]);

  const dispatch = useDispatch();
  const search = "";

  const { data, isLoading } = useGetCompanySearchByLazyLoadingQuery({
    pageNum,
    search: search || "",
  });

  useEffect(() => {
    if (!isLoading && data && data.result) {
      setAllCompanys((prevCompanys) => [...prevCompanys, ...data.result]);
      setLoading(false);
      setHasMore(data.result.length > 0);
    }
  }, [isLoading, data]);

  const handleScroll = () => {
    if (!loading && hasMore) {
      const isReachedScrollEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isReachedScrollEnd) {
        setLoading(true);
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center"></ul>
      </div>

      {allCompanys.length > 0 &&
        allCompanys.map((company: companyModel, index: number) => (
          <CompanyIndex company={company} key={index} />
        ))}

      {loading && <MainLoader />}
      {!loading && !hasMore && <p>No more companys to load</p>}
    </div>
  );
}

export default CompanyListIndex;



