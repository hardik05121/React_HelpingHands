import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  useDeleteCountryMutation,
  useGetCountryByLazyLoadingQuery
} from "../../Apis/countryApi";
import { toast } from "react-toastify";
import { MainLoader, MiniLoader } from "../../Components/Page/Common";
import { countryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CountryListByLazyLoading() {
  const [deleteCountry] = useDeleteCountryMutation();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, isSuccess } = useGetCountryByLazyLoadingQuery(pageNumber);
  const [isFetching, setIsFetching] = useState(false);
  const [allCountries, setAllCountries] = useState<countryModel[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isSuccess) {
      if (data.result && data.result.length > 0) {
        // Check for duplicate data before appending
        const newCountries = data.result.filter((newCountry: any) => {
          return !allCountries.some((existingCountry) => existingCountry.id === newCountry.id);
        });

        setAllCountries((prevCountries) => [...prevCountries, ...newCountries]);
      } else {
        // No more data, set hasMore to false
        setHasMore(false);
      }
    }
  }, [data, isSuccess]);

  const lastCountryRef = useCallback(
    (node: any) => {
      if (isLoading || !isSuccess || isFetching || !node) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      observer.current.observe(node);
    },
    [isLoading, isSuccess, isFetching]
  );

  const handleCountryDelete = async (id: number) => {
    toast.promise(
      deleteCountry(id),
      {
        pending: "Processing your request...",
        success: "Country Deleted Successfully 👌",
        error: "Error encountered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Country List By LazyLoading</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/country/countryupsert")}
            >
              Add New Country
            </button>
          </div>

          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-4">CountryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-4">Action</div>
            </div>

            {allCountries.map((country: countryModel, index: number) => (
              <div
                className="row border"
                ref={index === data.result.length - 1 ? lastCountryRef : null}
                key={country.id}
              >
                <div className="col-1">{country.id}</div>
                <div className="col-4">{country.countryName}</div>
                <div className="col-3">{country.isActive?.toString()}</div>
                <div className="col-4">
                  <button className="btn btn-success">
                    <i
                      className="bi bi-pencil-fill"
                      onClick={() =>
                        navigate("/country/countryupsert/" + country.id)
                      }
                    ></i>
                  </button>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleCountryDelete(country.id)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* {isSuccess && !data.result && <MiniLoader />}
          {isFetching && <MiniLoader />} */}

          {isSuccess && !hasMore && <p>No more data to fetch</p>}
      {isFetching && hasMore && <MiniLoader />}
        </div>
      )}
    </>
  );
}

export default CountryListByLazyLoading;