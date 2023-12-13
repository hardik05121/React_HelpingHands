import React, { useEffect, useState } from "react";
import { useGetCompanyByIdQuery } from "../../Apis/companyApi";
import { useGetServiceByFirstCategoryIdQuery } from "../../Apis/serviceApi";
import { useGetCompanyXServiceByCompanyIdQuery, 
  useCreateCompanyXServiceMutation
 } from "../../Apis/companyXServiceApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";

function CompanyXServiceUpsert() {
  const { companyId , firstCategoryId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data: companyData } = useGetCompanyByIdQuery(companyId);
  const { data: serviceData } = useGetServiceByFirstCategoryIdQuery(firstCategoryId);
  const { data: companyXServiceData } = useGetCompanyXServiceByCompanyIdQuery(companyId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  const [createCompanyXService] = useCreateCompanyXServiceMutation();

  useEffect(() => {
    if (serviceData) {
      const initialCheckedMap: Record<string, boolean> = {};
      companyXServiceData?.result.forEach((item: any) => {
        initialCheckedMap[item.serviceId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedCompanyIds(companyXServiceData?.result.map((item: any) => item.serviceId) || []);
    }
  }, [serviceData, companyXServiceData]);

  const handleOnChange = (serviceId: string) => {
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [serviceId]: !prevMap[serviceId],
    }));
    
    setSelectedCompanyIds((prevIds) => {
      if (prevIds.includes(serviceId)) {
        // If colorId is already in the list, remove it
        return prevIds.filter((id) => id !== serviceId);
      } else {
        // If colorId is not in the list, add it
        return [...prevIds, serviceId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    if (companyId) {
      formData.append("CompanyId", companyId);
      selectedCompanyIds.forEach((serviceId) => {
        formData.append("SelectedServiceIds", serviceId);
      });

      const response = await createCompanyXService(formData);
      if (response) {
        toastNotify("Service updated successfully", "success");
        setLoading(false);
        navigate("/company/companylist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success"> Edit Service For {companyData?.result.companyName}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Colors:</label>
              {serviceData?.result.map((service: any) => (
                <a key={service.id} className="form-check text-decoration:none">
                  <input
                    type="checkbox"
                    name="SelectedServiceIds"
                    className="form-check-input"
                    id={`service-${service.id}`}
                    value={service.id}
                    checked={isCheckedMap[service.id] || false}
                    onChange={() => handleOnChange(service.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`color-${service.id}`}
                  >
                    {service.serviceName}
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

export default CompanyXServiceUpsert;




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