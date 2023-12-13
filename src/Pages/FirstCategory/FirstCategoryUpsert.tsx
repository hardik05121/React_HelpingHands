import React, { useEffect, useState } from "react";
import {
  useCreateFirstCategoryMutation,
  useGetFirstCategoryByIdQuery,
  useUpdateFirstCategoryMutation,
} from "../../Apis/firstCategoryApi";
import { inputHelper, toastNotify } from "../../Helper";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../../Components/Page/Common";
import { apiResponse } from "../../Interfaces";

const firstCategoryData: { firstCategoryName: string } = {
  firstCategoryName: "",
};

function FirstCategoryUpsert() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [firstCategoryInputs, setFirstCategoryInputs] =
    useState(firstCategoryData);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [createFirstCategory] = useCreateFirstCategoryMutation();
  const [updateFirstCategory] = useUpdateFirstCategoryMutation();
  const { data } = useGetFirstCategoryByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        firstCategoryName: data.result.firstCategoryName,
        firstCategoryImage: data.result.firstCategoryImage,
        isActive: data.result.isActive,
      };
      setFirstCategoryInputs(tempData);
      setIsChecked(tempData.isActive);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setFirstCategoryInputs((prevData) => ({
      ...prevData,
      isActive: !isChecked,
    }));
  };

  const handleFirstCategoryInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, firstCategoryInputs);
    setFirstCategoryInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToDisplay(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageToStore(file);
    }
  };

  const generateUniqueFileName = () => {
    // Generate a unique string for the image file name
    return `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    formData.append("FirstCategoryName", firstCategoryInputs.firstCategoryName);
    formData.append("IsActive", isChecked.toString());

    // Check if there's a new image to upload
    if (imageToStore) {
      const uniqueFileName = generateUniqueFileName();
      formData.append("File", imageToStore, uniqueFileName);

      // Store the image path in the database (you might need to adjust this based on your API)
      formData.append("ImagePath", `images/${uniqueFileName}`);
    }

    try {
      let response: apiResponse;

      if (id) {
        formData.append("Id", id);
        response = await updateFirstCategory({ data: formData, id });

        if (response != null && response.data?.isSuccess) {
          toastNotify("FirstCategory updated successfully", "success");
          navigate("/firstCategory/firstCategorylist");
        } else {
          toastNotify("Invalid FirstCategory Data", "error");
        }
      } else {
        response = await createFirstCategory(formData);

        if (response != null && response.data?.isSuccess) {
          toastNotify("FirstCategory created successfully", "success");
          navigate("/firstCategory/firstCategorylist");
        } else {
          toastNotify("Invalid FirstCategory Data", "error");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      toastNotify("Error occurred", "error");
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="px-2 text-success">
        {id ? "Edit FirstCategory" : "Add FirstCategory"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="firstCategoryName"
              value={firstCategoryInputs.firstCategoryName}
              onChange={handleFirstCategoryInput}
            />

            <label htmlFor="checkbox">Is Active</label>
            <input
              className="form-check-input"
              type="checkbox"
              name="isActive"
              value={isChecked.toString()}
              checked={isChecked}
              onChange={handleOnChange}
            />

            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
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
                  onClick={() => navigate("/firstCategory/firstCategorylist")}
                  className="btn btn-secondary form-control mt-3"
                >
                  Back to FirstCategory
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default FirstCategoryUpsert;






// import React, { useEffect, useState } from "react";
// import {
//   useCreateFirstCategoryMutation,
//   useGetFirstCategoryByIdQuery,
//   useUpdateFirstCategoryMutation,
// } from "../../Apis/firstCategoryApi";
// import { inputHelper, toastNotify } from "../../Helper";
// import { useNavigate, useParams } from "react-router-dom";
// import { MainLoader } from "../../Components/Page/Common";
// import { apiResponse } from "../../Interfaces";
// import "../../Assets/Images";

// const firstCategoryData: { firstCategoryName: string } = {
//   firstCategoryName: "",
// };

// function FirstCategoryUpsert() {
//   const { id } = useParams();

//   const navigate = useNavigate();
//   const [firstCategoryInputs, setFirstCategoryInputs] =
//     useState(firstCategoryData);
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [imageToStore, setImageToStore] = useState<any>();
//   const [imageToDisplay, setImageToDisplay] = useState<string>("");
//   const [createFirstCategory] = useCreateFirstCategoryMutation();
//   const [updateFirstCategory] = useUpdateFirstCategoryMutation();
//   const { data } = useGetFirstCategoryByIdQuery(id);

//   useEffect(() => {
//     if (data && data.result) {
//       const tempData = {
//         firstCategoryName: data.result.firstCategoryName,
//         isActive: data.result.isActive,
//       };
//       setFirstCategoryInputs(tempData);
//       setIsChecked(tempData.isActive);
//       setImageToDisplay(data.result.image);
//     }
//   }, [data]);

//   const handleOnChange = () => {
//     setIsChecked(!isChecked);
//     setFirstCategoryInputs((prevData) => ({
//       ...prevData,
//       isActive: !isChecked,
//     }));
//   };

//   const handleFirstCategoryInput = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const tempData = inputHelper(e, firstCategoryInputs);
//     setFirstCategoryInputs(tempData);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       const imgType = file.type.split("/")[1];
//       const validImgTypes = ["jpeg", "jpg", "png"];

//       const isImageTypeValid = validImgTypes.filter((e) => {
//         return e === imgType;
//       });

//       if (file.size > 1000 * 1024) {
//         setImageToStore("");
//         toastNotify("File Must be less then 1 MB", "error");
//         return;
//       } else if (isImageTypeValid.length === 0) {
//         setImageToStore("");
//         toastNotify("File Must be in jpeg, jpg or png", "error");
//         return;
//       }

//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       setImageToStore(file);
//       reader.onload = (e) => {
//         const imgUrl = e.target?.result as string;
//         setImageToDisplay(imgUrl);
//       };
//     }
//   };
  
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();

//     formData.append("FirstCategoryName", firstCategoryInputs.firstCategoryName);
//     formData.append("IsActive", isChecked.toString());
//     if (imageToDisplay) formData.append("File", imageToStore);

//     try {
//       let response: apiResponse;

//       if (id) {
//         formData.append("Id", id);
//         response = await updateFirstCategory({ data: formData, id });

//         if (response != null && response.data?.isSuccess) {
//           toastNotify("FirstCategory updated successfully", "success");
//           navigate("/firstCategory/firstCategorylist");
//           setLoading(true);
//         } else {
//           toastNotify("Invalid FirstCategory Data", "error");
//         }
//       } else {
//         response = await createFirstCategory(formData);

//         if (response != null && response.data?.isSuccess) {
//           toastNotify("FirstCategory created successfully", "success");
//           navigate("/firstCategory/firstCategorylist");
//         } else {
//           toastNotify("Invalid FirstCategory Data", "error");
//         }
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       toastNotify("Error occurred", "error");
//     }
//     setLoading(false);
//   };
//   //   try {
//   //     let response: apiResponse;

//   //     if (id) {
//   //       formData.append("Id", id);
//   //       response = await updateFirstCategory({ data: formData, id });

//   //       if (response != null && response.data?.isSuccess) {
//   //         toastNotify("FirstCategory updated successfully", "success");
//   //         navigate("/firstCategory/firstCategorylist");
//   //       } else {
//   //         if (response.data && response.data.errorMessages != null) {
//   //           toastNotify(response.data.errorMessages[0], "error");
//   //         } else {
//   //           toastNotify("An error occurred", "error");
//   //         }
//   //       }
//   //     } else {
//   //       response = await createFirstCategory(formData);

//   //       if (response != null && response.data?.isSuccess) {
//   //         toastNotify("FirstCategory created successfully", "success");
//   //         navigate("/firstCategory/firstCategorylist");
//   //       } else {
//   //         if (response.data && response.data.errorMessages != null) {
//   //           toastNotify(response.data.errorMessages[0], "error");
//   //         } else {
//   //           toastNotify("An error occurred", "error");
//   //         }
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error("API Error:", error);
//   //     toastNotify("An error occurred", "error");
//   //   }

//   //   setLoading(false);
//   // };

//   return (
//     <div className="container border mt-5 p-5 bg-light">
//       {loading && <MainLoader />}
//       <h3 className="px-2 text-success">
//         {id ? "Edit FirstCategory" : "Add FirstCategory"}
//       </h3>
//       <form method="post" onSubmit={handleSubmit}>
//         <div className="row mt-3">
//           <div className="col-md-7">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Name"
//               required
//               name="firstCategoryName"
//               value={firstCategoryInputs.firstCategoryName}
//               onChange={handleFirstCategoryInput}
//             />

//             <label htmlFor="checkbox">Is Active</label>
//             <input
//               className="form-check-input"
//               type="checkbox"
//               name="isActive"
//               value={isChecked.toString()}
//               checked={isChecked}
//               onChange={handleOnChange}
//             />

//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="form-control mt-3"
//             />
//             <div className="row">
//               <div className="col-6">
//                 <button
//                   type="submit"
//                   className="btn btn-success form-control mt-3"
//                 >
//                   {id ? "Update" : "Create"}
//                 </button>
//               </div>
//               <div className="col-6">
//                 <a
//                   onClick={() => navigate("/firstCategory/firstCategorylist")}
//                   className="btn btn-secondary form-control mt-3"
//                 >
//                   Back to FirstCategory
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-5 text-center">
//             <img
//               src={imageToDisplay}
//               style={{ width: "100%", borderRadius: "30px" }}
//               alt=""
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default FirstCategoryUpsert;
