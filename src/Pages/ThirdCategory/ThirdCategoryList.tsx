import React from "react";
import {
  useDeleteThirdCategoryMutation,
  useGetThirdCategorysQuery,
} from "../../Apis/thirdCategoryApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { thirdCategoryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function ThirdCategoryList() {
  const [deleteThirdCategory] = useDeleteThirdCategoryMutation();
  const { data, isLoading } = useGetThirdCategorysQuery(null);
  const navigate = useNavigate();

  const handleThirdCategoryDelete = async (id: number) => {
    toast.promise(
      deleteThirdCategory(id),
      {
        pending: "Processing your request...",
        success: "ThirdCategory Deleted Successfully 👌",
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
            <h1 className="text-success">ThirdCategory List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/thirdCategory/thirdCategoryupsert")}
            >
              Add New ThirdCategory
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-4">ThirdCategoryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((thirdCategory: thirdCategoryModel) => {
              return (
                <div className="row border" key={thirdCategory.id}>
                  <div className="col-1">{thirdCategory.id}</div>
                  <div className="col-4">{thirdCategory.thirdCategoryName}</div>
                  <div className="col-3">{thirdCategory.isActive?.toString()}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/thirdCategory/thirdCategoryupsert/" + thirdCategory.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleThirdCategoryDelete(thirdCategory.id)}
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

export default ThirdCategoryList;
