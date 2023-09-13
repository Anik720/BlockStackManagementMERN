import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import Navbar from "../../Shared/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../utils/ApiURLS";
import Swal from "sweetalert2";
import axiosMiddleware from "../../middleware/axiosMiddleware";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.number().required("Phone is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  profession: Yup.string().required("Profession is required"),
  favourite_color: Yup.string().required("Favourite Color is required"),
});

const ReportDetails = () => {
  let { mode, id } = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isAddressDirty, setIsAddressDirty] = useState(false);
  const [isPhoneDirty, setIsPhoneDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isProfessionDirty, setIsProfessionDirty] = useState(false);
  const [isColorDirty, setIsColorDirty] = useState(false);
  const [errorOccurred, setErrorOccurred] = React.useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    profession: "",
    favourite_color: "",
  });

  const [reportDetail, setReportDetail] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    profession: "",
    favourite_color: "",
  });
  const onSubmit = async (data) => {
    let formValues = getValues();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (mode === "edit") {
          axiosMiddleware({
            method: "patch",
            url: baseURL + `api/v1/report/${id}`,
            data: formValues,
          })
            .then((response) => {
              // Handle the API response
              Swal.fire("Saved!", "", "success");
              setTimeout(() => {
                navigate("/");
              }, 3000);
            })
            .catch((error) => {
              toast(error.response.data.message);
            });
        }

        if (mode === "create") {
          axiosMiddleware({
            method: "post",
            url: baseURL + `api/v1/report`,
            data: formValues,
          })
            .then((response) => {
              // Handle the API response
              Swal.fire("Saved!", "", "success");
              setTimeout(() => {
                navigate("/");
              }, 3000);
            })
            .catch((error) => {
              toast(error.response.data.message);
              // Set error state to true on error
              // Use setTimeout to trigger a re-render after 3 seconds
              // Handle errors (e.g., unauthorized, network errors)
            });
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  useEffect(() => {
    if (mode == "view" || mode == "edit") {
      getReportDetails();
      setIsNameDirty(true);
      setIsAddressDirty(true);
      setIsPhoneDirty(true);
      setIsEmailDirty(true);
      setIsProfessionDirty(true);
      setIsColorDirty(true);
    }
  }, [errorOccurred]);

  const getReportDetails = async () => {
    await axiosMiddleware({
      method: "get",
      url: baseURL + `api/v1/report/${id}`,
    })
      .then((result) => {
        // Handle the API response
        const { name, address, phone, email, profession, favourite_color } =
          result.data.data;
        // Use the setValue function to populate the form fields
        setValue("name", name);
        setValue("address", address);
        setValue("phone", phone);
        setValue("email", email);
        setValue("profession", profession);
        setValue("favourite_color", favourite_color);

        setReportDetail({
          name,
          address,
          phone,
          email,
          profession,
          favourite_color,
        });
        setErrorOccurred(false);
      })
      .catch((error) => {
        // Set error state to true on error
        // Use setTimeout to trigger a re-render after 3 seconds
        // Handle errors (e.g., unauthorized, network errors)
      });
  };

  const validateInput = async (name, value) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      // No validation error, clear the error message
      setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      switch (name) {
        case "name":
          setIsNameDirty(true);
          break;
        case "address":
          setIsAddressDirty(true);
          break;
        case "phone":
          setIsPhoneDirty(true);
          break;
        case "email":
          setIsEmailDirty(true);
          break;
        case "profession":
          setIsProfessionDirty(true);
          break;
        case "favourite_color":
          setIsColorDirty(true);
          break;
        default:
          break;
      }
    } catch (error) {
      // Validation error, set the error message
      switch (name) {
        case "name":
          setIsNameDirty(false);
          break;
        case "address":
          setIsAddressDirty(false);
          break;
        case "phone":
          setIsPhoneDirty(false);
          break;
        case "email":
          setIsEmailDirty(false);
          break;
        case "profession":
          setIsProfessionDirty(false);
          break;
        case "favourite_color":
          setIsColorDirty(false);
          break;
        default:
          break;
      }
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit(onSubmit)} className="m-20">
        <div className="flex gap-5 mb-5">
          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Name"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.name}
                  helperText={fieldErrors.name}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("name", e.target.value);
                  }}
                />
              )}
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Address"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.address}
                  helperText={fieldErrors.address}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("address", e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-5 mb-5">
          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Phone
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Phone"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.phone}
                  helperText={fieldErrors.phone}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("phone", e.target.value);
                  }}
                />
              )}
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Email
            </label>

            <Controller
              name="email"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Email"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.email}
                  helperText={fieldErrors.email}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("email", e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>

        <div className="flex gap-5 mb-5">
          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Profession
            </label>
            <Controller
              name="profession"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Profession"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.profession}
                  helperText={fieldErrors.profession}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("profession", e.target.value);
                  }}
                />
              )}
            />
          </div>

          <div className="w-1/2">
            <label htmlFor="name" className="text-xl font-bold">
              Favaourite Color
            </label>

            <Controller
              name="favourite_color"
              control={control}
              defaultValue=""
              disabled={mode == "view" ? true : false}
              render={({ field }) => (
                <TextField
                  placeholder="Favourite Color"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldErrors.favourite_color}
                  helperText={fieldErrors.favourite_color}
                  onChange={(e) => {
                    field.onChange(e);
                    validateInput("favourite_color", e.target.value);
                  }}
                />
              )}
            />
          </div>
        </div>
      </form>

      {mode == "create" ? (
        <div
          style={{
            position: "relative",
          }}
        >
          <Button
            type="submit"
            disabled={
              !(
                isNameDirty &&
                isAddressDirty &&
                isPhoneDirty &&
                isEmailDirty &&
                isProfessionDirty &&
                isColorDirty
              )
            }
            style={{
              background:
                isNameDirty &&
                isAddressDirty &&
                isPhoneDirty &&
                isEmailDirty &&
                isProfessionDirty &&
                isColorDirty
                  ? "black"
                  : "gray",
              color: "white",
              position: "absolute",
              bottom: "-50px",
              right: "70px",
              padding: "5px 25px",
            }}
            onClick={onSubmit}
          >
            Create
          </Button>
        </div>
      ) : (
        ""
      )}
      {mode == "edit" ? (
        <div
          style={{
            position: "relative",
          }}
        >
          <Button
            type="submit"
            disabled={
              !(
                isNameDirty &&
                isAddressDirty &&
                isPhoneDirty &&
                isEmailDirty &&
                isProfessionDirty &&
                isColorDirty
              )
            }
            style={{
              background:
                isNameDirty &&
                isAddressDirty &&
                isPhoneDirty &&
                isEmailDirty &&
                isProfessionDirty &&
                isColorDirty
                  ? "black"
                  : "gray",
              color: "white",
              position: "absolute",
              bottom: "-50px",
              right: "70px",
              padding: "5px 25px",
            }}
            onClick={onSubmit}
          >
            Edit
          </Button>
        </div>
      ) : (
        ""
      )}
      <ToastContainer />
    </div>
  );
};

export default ReportDetails;
