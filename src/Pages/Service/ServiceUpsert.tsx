import React, { useEffect, useState } from "react";
import {
  useCreateServiceMutation,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "../../Apis/serviceApi";
import { useGetFirstCategorysQuery } from "../../Apis/firstCategoryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const serviceData: { serviceName: string; firstCategoryId?: number } = {
  serviceName: "",
  firstCategoryId: undefined,
};

function ServiceUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [serviceInputs, setServiceInputs] = useState(serviceData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const { data } = useGetServiceByIdQuery(id);
  const { data: firstCategoriesData } = useGetFirstCategorysQuery(null);

  useEffect(() => {
    if (id && data && data.result) {
      const tempData = {
        serviceName: data.result.serviceName,
        firstCategoryId: data.result.firstCategoryId,
        isActive: data.result.isActive,
      };
      setServiceInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [id, data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleServiceInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setServiceInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFirstCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const firstCategoryId = parseInt(e.target.value);
    setServiceInputs((prevData) => ({
      ...prevData,
      firstCategoryId,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("ServiceName", serviceInputs.serviceName);
    formData.append("FirstCategoryId", serviceInputs.firstCategoryId?.toString() || "");
    formData.append("IsActive", isChecked.toString());

    let response;

    try {
      if (id) {
        // Update
        formData.append("Id", id);
        response = await updateService({ data: formData, id });
        toastNotify("Service updated successfully", "success");
      } else {
        // Create
        response = await createService(formData);
        toastNotify("Service created successfully", "success");
      }

      if (response) {
        setLoading(false);
        navigate("/service/servicelist");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toastNotify("Error during form submission", "error");
      setLoading(false);
    }
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">{id ? "Edit Service" : "Add Service"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="serviceName"
              value={serviceInputs.serviceName}
              onChange={handleServiceInput}
            />

            <label htmlFor="firstCategory">Select FirstCategory</label>
            <select
              className="form-control"
              name="firstCategoryId"
              value={serviceInputs.firstCategoryId || ""}
              onChange={handleFirstCategoryChange}
            >
              <option value="">Select FirstCategory</option>
              {firstCategoriesData?.result.map((firstCategory: any) => (
                <option key={firstCategory.id} value={firstCategory.id}>
                  {firstCategory.firstCategoryName}
                </option>
              ))}
            </select>

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              checked={isChecked}
              onChange={handleOnChange}
            />

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  {id ? "Update" : "Create"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate("/service/servicelist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ServiceUpsert;
