import React from "react";
import {
  useDeleteAmenityMutation,
  useGetAmenitysQuery,
} from "../../Apis/amenityApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { amenityModel, stateModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function AmenityList() {
  const [deleteAmenity] = useDeleteAmenityMutation();
  const { data, isLoading } = useGetAmenitysQuery(null);
  const navigate = useNavigate();

  const handleAmenityDelete = async (id: number) => {
    toast.promise(
      deleteAmenity(id),
      {
        pending: "Processing your request...",
        success: "State Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Amenity List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/amenity/amenityupsert")}
            >
              Add New Amenity
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-3">AmenityName</div>
              <div className="col-3">FirstCategoryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((amenity: amenityModel) => {
              return (
                <div className="row border" key={amenity.id}>
                  <div className="col-1">{amenity.id}</div>
                  <div className="col-3">{amenity.amenityName}</div>
                  <div className="col-3">{amenity.firstCategory?.firstCategoryName}</div>
                  <div className="col-3">{amenity.isActive?.toString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/amenity/amenityupsert/" + amenity.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleAmenityDelete(amenity.id)}
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

export default AmenityList;
