import React from "react";
import {
  useDeleteSecondCategoryMutation,
  useGetSecondCategorysQuery,
} from "../../Apis/secondCategoryApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Components/Page/Common";
import { secondCategoryModel } from "../../Interfaces";
import { useNavigate } from "react-router-dom";

function SecondCategoryList() {
  const [deleteSecondCategory] = useDeleteSecondCategoryMutation();
  const { data, isLoading } = useGetSecondCategorysQuery(null);
  const navigate = useNavigate();

  const handleSecondCategoryDelete = async (id: number) => {
    toast.promise(
      deleteSecondCategory(id),
      {
        pending: "Processing your request...",
        success: "SecondCategory Deleted Successfully 👌",
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
            <h1 className="text-success">SecondCategory List</h1>

            <button
              className="btn btn-success"
              onClick={() => navigate("/secondCategory/secondCategoryupsert")}
            >
              Add New SecondCategory
            </button>
          </div>
          
          <div className="p-2">
            <div className="row border">
              <div className="col-1">Id</div>
              <div className="col-4">SecondCategoryName</div>
              <div className="col-3">IsActive</div>
              <div className="col-4">Action</div>
            </div>

            {data.result.map((secondCategory: secondCategoryModel) => {
              return (
                <div className="row border" key={secondCategory.id}>
                  <div className="col-1">{secondCategory.id}</div>
                  <div className="col-4">{secondCategory.secondCategoryName}</div>
                  <div className="col-3">{secondCategory.isActive?.toString()}</div>
                  <div className="col-4">
                    <button className="btn btn-success">
                      <i
                        className="bi bi-pencil-fill"
                        onClick={() =>
                          navigate("/secondCategory/secondCategoryupsert/" + secondCategory.id)
                        }
                      ></i>
                    </button>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleSecondCategoryDelete(secondCategory.id)}
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

export default SecondCategoryList;
