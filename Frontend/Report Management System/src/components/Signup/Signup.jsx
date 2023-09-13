import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../utils/ApiURLS";

const Signup = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let showError;
  const onSubmit = async (data) => {
    try {
      const result = await axios.post(baseURL + "api/auth/signUp", {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email,
        profession: data.profession,
        favourite_color: data.favourite_color,
        password: data.password,
      });

      localStorage.setItem("refreshToken", result.data.refreshToken);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("loggedinUser", JSON.stringify(result.data.user));
      navigate("/");
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  return (
    <div>
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">Signup now!</h1>
            <p class="py-6">
              Welcome. Have the best experince by signning in our website. You
              will get your desire items and will be able to have the best
              service.
            </p>
          </div>

          <div class="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="card-body">
                <div className="flex gap-5">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      class="input input-bordered"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.name?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.name.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Address</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Address"
                      class="input input-bordered"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "Address is required",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.address?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.address.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Phone</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Phone"
                      class="input input-bordered"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone is required",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.Phone?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.Phone.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      class="input input-bordered"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                        pattern: {
                          value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                          message: "Provide a valid Email",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.email?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                      {errors.email?.type === "pattern" && (
                        <span className="label-text-alt text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Profession</span>
                    </label>
                    <input
                      type="profession"
                      placeholder="Your Profession"
                      class="input input-bordered"
                      {...register("profession", {
                        required: {
                          value: true,
                          message: "Profession is required",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.profession?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.profession.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">Favourite Color</span>
                    </label>
                    <input
                      type="favourite_color"
                      placeholder="Favourite Color"
                      class="input input-bordered"
                      {...register("favourite_color", {
                        required: {
                          value: true,
                          message: "Favourite Color is required",
                        },
                      })}
                    />
                    <label class="label">
                      {errors.favourite_color?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.favourite_color.message}
                        </span>
                      )}
                    </label>
                    <p>{showError}</p>
                    {/* <label>
                    <Link to='/login'>
                      <button className=''>
                        Already have an account? Login here.
                      </button>
                    </Link>
                  </label> */}
                  </div>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your Password"
                    class="input input-bordered"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                      pattern: {
                        maxLength: 20,
                        message: "Provide a valid Password",
                      },
                    })}
                  />
                  <label class="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                  <p>{showError}</p>
                  <label>
                    <Link to="/login">
                      <button className="">
                        Already have an account?{" "}
                        <span className="font-bold"> Login here</span>
                      </button>
                    </Link>
                  </label>
                </div>
                <div class="form-control mt-6">
                  <button type="submit" class="btn btn-primary">
                    Signup
                  </button>
                </div>
              </div>
            </form>
            <div class="flex justify-center"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
