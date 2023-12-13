import React, { useEffect, useState } from "react";
import {
  useCreateAmenityMutation,
  useGetAmenityByIdQuery,
  useUpdateAmenityMutation,
} from "../../Apis/amenityApi";
import { useGetFirstCategorysQuery } from "../../Apis/firstCategoryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";

const amenityData: { amenityName: string; firstCategoryId?: number } = {
  amenityName: "",
  firstCategoryId: undefined,
};

function AmenityUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [amenityInputs, setAmenityInputs] = useState(amenityData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createAmenity] = useCreateAmenityMutation();
  const [updateAmenity] = useUpdateAmenityMutation();
  const { data } = useGetAmenityByIdQuery(id);
  const { data: firstCategoriesData } = useGetFirstCategorysQuery(null);

  useEffect(() => {
    if (id && data && data.result) {
      const tempData = {
        amenityName: data.result.amenityName,
        firstCategoryId: data.result.firstCategoryId,
        isActive: data.result.isActive,
      };
      setAmenityInputs(tempData);
      setIsChecked(tempData.isActive);
    }
  }, [id, data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAmenityInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, amenityInputs);
    setAmenityInputs(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("AmenityName", amenityInputs.amenityName);
    formData.append("IsActive", isChecked.toString());
    formData.append("FirstCategoryId", amenityInputs.firstCategoryId?.toString() || "");

    let response;

    try {
      if (id) {
        // Update
        formData.append("Id", id);
        response = await updateAmenity({ data: formData, id });
        toastNotify("Amenity updated successfully", "success");
      } else {
        // Create
        response = await createAmenity(formData);
        toastNotify("Amenity created successfully", "success");
      }

      if (response) {
        setLoading(false);
        navigate("/amenity/amenitylist");
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
      <h3 className="px-2 text-success">{id ? "Edit Amenity" : "Add Amenity"}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="amenityName"
              value={amenityInputs.amenityName}
              onChange={handleAmenityInput}
            />

            <label htmlFor="firstCategory">Select FirstCategory</label>
            <select
              className="form-control"
              name="firstCategoryId"
              value={amenityInputs.firstCategoryId || ""}
              onChange={handleAmenityInput}
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
                  onClick={() => navigate("/amenity/amenitylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to Amenity
                </a>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AmenityUpsert;
