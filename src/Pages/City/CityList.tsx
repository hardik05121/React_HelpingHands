import React from "react";
import {
  useDeleteCityMutation,
  useGetCitysQuery,
} from "../../Apis/cityApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { cityModel } from "../../Interfaces";
import { useNavigate } from "react-router";
function CityList() {
  const [deleteCity] = useDeleteCityMutation();
  const { data, isLoading } = useGetCitysQuery(null);
  const navigate = useNavigate();

  const handleCityDelete = async (id: number) => {
    toast.promise(
      deleteCity(id),
      {
        pending: "Processing your request...",
        success: "City Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
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
            <h1 className="text-success">City List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/city/cityupsert")}
            >
              Add New City
            </button>
          </div>
         
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-2">City Name</div>
              <div className="col-2">Country Name</div>
              <div className="col-2">City Name</div>
              <div className="col-2">Is Active</div>
              <div className="col-3">Action</div>
            </div>

            {data.result.map((city: cityModel) => {
              return (
                <div className="row border" key={city.id}> 
                  <div className="col-1">{city.id}</div>
                  <div className="col-2">{city.cityName}</div>
                  <div className="col-2">{city.country?.countryName}</div>
                  <div className="col-2">{city.state?.stateName}</div>
                  <div className="col-2">{city.isActive?.toString()}</div>
                  <div className="col-3">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/city/cityupsert/" + city.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCityDelete(city.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default CityList;
