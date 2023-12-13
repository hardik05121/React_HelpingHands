import React from "react";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "../../Apis/serviceApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { serviceModel } from "../../Interfaces";
import { useNavigate } from "react-router";
function ServiceList() {
  const [deleteService] = useDeleteServiceMutation();
  const { data, isLoading } = useGetServicesQuery(null);
  const navigate = useNavigate();

  const handleServiceDelete = async (id: number) => {
    toast.promise(
      deleteService(id),
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
            <h1 className="text-success">Service List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/service/serviceupsert")}
            >
              Add New Service
            </button>
          </div>
         
          <div className="p-2">
            <div className="row border">
            <div className="col-1">Id</div>
              <div className="col-2">serviceName</div>
              <div className="col-2">FirstCategoryName</div>
              <div className="col-2">IsActive</div>
              <div className="col-3">Action</div>
            </div>

            {data.result.map((service: serviceModel) => {
              return (
                <div className="row border" key={service.id}>
                  <div className="col-1">{service.id}</div>
                  <div className="col-2">{service.serviceName}</div>
                  <div className="col-2">{service.firstCategory?.firstCategoryName}</div>
                  <div className="col-2">{service.isActive?.toString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/service/serviceupsert/" + service.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleServiceDelete(service.id)}
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

export default ServiceList;
