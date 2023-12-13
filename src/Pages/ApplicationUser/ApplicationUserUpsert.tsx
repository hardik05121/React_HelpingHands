import React, { useEffect, useState } from "react";
import {
  useGetApplicationUserByIdQuery,
  useUpdateApplicationUserMutation,
} from "../../Apis/applicationUserApi";
import { toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetApplicationRolesQuery,
} from "../../Apis/applicationRoleApi";
import{useGetApplicationUserRoleByUserIdQuery
} from "../../Apis/applicationUserRoleApi";

function ApplicationUserUpsert() {
  debugger
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [updateApplicationUser] = useUpdateApplicationUserMutation();
  const { data: applicationUserData } = useGetApplicationUserByIdQuery(userId);
  const { data: applicationRoleData } = useGetApplicationRolesQuery(null);
  const { data: applicationUserRoleData } = useGetApplicationUserRoleByUserIdQuery(userId);
  const [isCheckedMap, setIsCheckedMap] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (applicationRoleData) {
      const initialCheckedMap: Record<string, boolean> = {};
      applicationUserRoleData?.result.forEach((item: any) => {
        initialCheckedMap[item.roleId] = true;
      });
      setIsCheckedMap(initialCheckedMap);
      setSelectedRoleIds(applicationUserRoleData?.result.map((item: any) => item.roleId) || []);
    }
  }, [applicationRoleData, applicationUserRoleData]);


  const handleOnChange = (roleId: string) => {
    setIsCheckedMap((prevMap) => ({
      ...prevMap,
      [roleId]: !prevMap[roleId],
    }));

    setSelectedRoleIds((prevIds) => {
      if (prevIds.includes(roleId)) {
        // If colorId is already in the list, remove it
        return prevIds.filter((id) => id !== roleId);
      } else {
        // If colorId is not in the list, add it
        return [...prevIds, roleId];
      }
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (userId) {
      formData.append("UserId", userId);
      selectedRoleIds.forEach((roleId) => {
        formData.append("SelectedRoleIds", roleId);
      });

      
      const response = await updateApplicationUser(formData);
      if (response) {
        toastNotify("Payment updated successfully", "success");
        setLoading(false);
        navigate("/applicationUser/applicationUserlist");
      }
    }

    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      <h3 className="px-2 text-success">Edit Role For {applicationUserData?.result.userName}</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <div className="form-group">
              <label>Select Roles:</label>
              {applicationRoleData?.result.map((role: any) => (
                <div key={role.id}>
                  <input
                    type="checkbox"
                    name="SelectedRoleIds"
                    className="form-check-input"
                    id={`applicationRole-${role.id}`}
                    value={role.id}
                    checked={isCheckedMap[role.id] || false}
                    onChange={() => handleOnChange(role.id)}
                  />
                  <label htmlFor={`applicationRole-${role.id}`}>{role.name}</label>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-6">
                <button type="submit" className="btn btn-success form-control mt-3">
                  Save
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => navigate("/applicationUser/applicationUserlist")}
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

export default ApplicationUserUpsert;
