import React from "react";
import {
  useDeleteStateMutation,
  useGetStatesQuery,
} from "../../Apis/stateApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { stateModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function StateList() {
  const [deleteState] = useDeleteStateMutation();
  const { data, isLoading } = useGetStatesQuery(null);
  const navigate = useNavigate();

  const handleStateDelete = async (id: number) => {
    toast.promise(
      deleteState(id),
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
            <h1 className="text-success">State List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/state/stateupsert")}
            >
              Add New State
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-3">StateName</div>
              <div className="col-3">CountryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-2">Action</div>
            </div>

            {data.result.map((state: stateModel) => {
              return (
                <div className="row border" key={state.id}>
                  <div className="col-1">{state.id}</div>
                  <div className="col-3">{state.stateName}</div>
                  <div className="col-3">{state.country?.countryName}</div>
                  <div className="col-3">{state.isActive?.toString()}</div>
                  <div className="col-2">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/state/stateupsert/" + state.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleStateDelete(state.id)}
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

export default StateList;
