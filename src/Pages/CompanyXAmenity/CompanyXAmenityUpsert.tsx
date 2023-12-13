import React, { useEffect, useState } from "react";
import { useGetCompanyByIdQuery } from "../../Apis/companyApi";
import { useGetAmenityByFirstCategoryIdQuery } from "../../Apis/amenityApi";
import { useGetCompanyXAmenityByCompanyIdQuery, useCreateCompanyXAmenityMutation } from "../../Apis/companyXAmenityApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function CompanyXAmenityUpsert() {
  const { companyId , firstCategoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: companyData } = useGetCompanyByIdQuery(companyId);
  const { data: amenityData } = useGetAmenityByFirstCategoryIdQuery(firstCategoryId);
  const { data: companyXAmenityData } = useGetCompanyXAmenityByCompanyIdQuery(companyId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  const [createCompanyXAmenity] = useCreateCompanyXAmenityMutation();

  useEffect(() => {
    if (amenityData) {
      const initialCheckedMap: Record<string, boolean> = {};
      companyXAmenityData?.result.forEach((item: any) => {
        initialCheckedMap[item.amenityId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedCompanyIds(companyXAmenityData?.result.map((item: any) => item.amenityId) || []);
    }
  }, [amenityData, companyXAmenityData]);

  const handleOnChange = (amenityId: string) => {
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [amenityId]: !prevMap[amenityId],
    }));
    
    setSelectedCompanyIds((prevIds) => {
      if (prevIds.includes(amenityId)) {
        // If colorId is already in the list, remove it
        return prevIds.filter((id) => id !== amenityId);
      } else {
        // If colorId is not in the list, add it
        return [...prevIds, amenityId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (companyId) {
      formData.append("CompanyId", companyId);
      selectedCompanyIds.forEach((amenityId) => {
        formData.append("SelectedAmenityIds", amenityId);
      });

      const response = await createCompanyXAmenity(formData);
      if (response) {
        toastNotify("Amenity updated successfully", "success");
        setLoading(false);
        navigate("/company/companylist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">Edit Amenity For {companyData?.result.companyName}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Colors:</label>
              {amenityData?.result.map((amenity: any) => (
                <a key={amenity.id} className="form-check text-decoration:none">
                  <input
                    type="checkbox"
                    name="SelectedAmenityIds"
                    className="form-check-input"
                    id={`amenity-${amenity.id}`}
                    value={amenity.id}
                    checked={isCheckedMap[amenity.id] || false}
                    onChange={() => handleOnChange(amenity.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`color-${amenity.id}`}
                  >
                    {amenity.amenityName}
                  </label>
                </a>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/company/companylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to CarList
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CompanyXAmenityUpsert;



    // var data : any = {
    //   CompanyId : companyData?.result.id
    // };
    // selectedPayments.map((val,index) => {
    //   data[`PaymentId[${index}]`] = val
    // });
  
    // const data: any[] = selectedPayments.map((val, index) => ({
    //   CompanyId: companyData?.result.id,
    //   PaymentId: val,
    // }));
    // console.log(data);