import React from "react";
import {
  useDeleteFirstCategoryMutation,
  useGetFirstCategorysQuery,
} from "../../Apis/firstCategoryApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { firstCategoryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function FirstCategoryList() {
  const [deleteFirstCategory] = useDeleteFirstCategoryMutation();
  const { data, isLoading , refetch} = useGetFirstCategorysQuery(null);
  const navigate = useNavigate();

  const handleFirstCategoryDelete = async (id: number) => {
    toast.promise(
      deleteFirstCategory(id),
      {
        pending: "Processing your request...",
        success: "FirstCategory Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      },
    );
    refetch();
  };

  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">FirstCategory List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/firstCategory/firstCategoryupsert")}
            >
              Add New FirstCategory
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-4">FirstCategoryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((firstCategory: firstCategoryModel) => {
              return (
                <div className="row border" key={firstCategory.id}>
                  <div className="col-1">{firstCategory.id}</div>
                  <div className="col-4">{firstCategory.firstCategoryName}</div>
                  <div className="col-3">{firstCategory.isActive?.toString()}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/firstCategory/firstCategoryupsert/" + firstCategory.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleFirstCategoryDelete(firstCategory.id)}
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

export default FirstCategoryList;
