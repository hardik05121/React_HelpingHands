import React from "react";
import {
  useDeleteCompanyXServiceMutation,
  useGetCompanyXServicesQuery,
} from "../../Apis/companyXServiceApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { companyXServiceModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function CompanyXServiceList() {
  const [deleteCompanyXService] = useDeleteCompanyXServiceMutation();
  const { data, isLoading } = useGetCompanyXServicesQuery(null);
  const navigate = useNavigate();

  const handleCompanyXServiceDelete = async (id: number) => {
    toast.promise(
      deleteCompanyXService(id),
      {
        pending: "Processing your request...",
        success: "CompanyXService Deleted Successfully 👌",
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
            <h1 className="text-success">CompanyXService List</h1>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Id</div>
              <div className="col-4">Company Name</div>
              <div className="col-4">Service Name</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((companyXService: companyXServiceModel) => {
              return (
                <div className="row border" key={companyXService.id}>
                  <div className="col-2">{companyXService.id}</div>
                  <div className="col-4">{companyXService.company?.companyName}</div>
                  <div className="col-4">{companyXService.service?.serviceName}</div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleCompanyXServiceDelete(companyXService.id)}
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

export default CompanyXServiceList;
