import React from "react";
import {
  useDeleteCompanyXAmenityMutation,
  useGetCompanyXAmenitysQuery,
} from "../../Apis/companyXAmenityApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { companyXAmenityModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CompanyXAmenityList() {
  const [deleteCompanyXAmenity] = useDeleteCompanyXAmenityMutation();
  const { data, isLoading } = useGetCompanyXAmenitysQuery(null);
  const navigate = useNavigate();

  const handleCompanyXAmenityDelete = async (id: number) => {
    toast.promise(
      deleteCompanyXAmenity(id),
      {
        pending: "Processing your request...",
        success: "CompanyXAmenity Deleted Successfully 👌",
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
            <h1 className="text-success">CompanyXAmenity List</h1>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Id</div>
              <div className="col-4">Company Name</div>
              <div className="col-4">Amenity Name</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((companyXAmenity: companyXAmenityModel) => {
              return (
                <div className="row border" key={companyXAmenity.id}>
                  <div className="col-2">{companyXAmenity.id}</div>
                  <div className="col-4">{companyXAmenity.company?.companyName}</div>
                  <div className="col-4">{companyXAmenity.amenity?.amenityName}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCompanyXAmenityDelete(companyXAmenity.id)}
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

export default CompanyXAmenityList;
