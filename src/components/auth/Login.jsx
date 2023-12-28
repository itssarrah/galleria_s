import React, { useState, useEffect } from "react";
import "../../css/auth.css";
import InputField from "../InputField";
import { useTranslation } from "react-i18next";
import { ContributeBtn } from "../../components/navbar";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { EyeIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  const [errors, setErrors] = useState({});
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const bgClass = "white";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}api/login`, formData);

      if (response.data.status === "success") {
        console.log("Logged in successfully");

        const token = response.data.token;
        console.log("Received token:", token);
        localStorage.setItem("authToken", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
          const userResponse = await axios.get(
            `${BACKEND_URL}api/current_user`
          );

          if (userResponse.data.user_type === "user") {
            navigate("/profile", { state: userResponse.data });
          } else if (userResponse.data.user_type === "business") {
            navigate("/businessprofile", { state: userResponse.data });
          } else {
            console.error("Invalid user type in the response");
          }
          window.location.reload();
        } catch (error) {
          if (error.response.status === 401) {
            console.error(
              "Invalid or expired token. Redirecting to login page."
            );
          } else {
            console.error("Error fetching user details:", error);
          }
        }
      } else {
        setErrors({ general: response.data.message });
        console.error(response.data);
      }
    } catch (loginError) {
      console.error("Error during login:", loginError);
    }
  };

  return (
    <>
      <div>
        <form>
          <div className="relative w-[98%] md:bg-white md:h-[25rem] xl:h-[35rem] mx-auto mt-12 md:mt-[8rem] flex items-center flex-col md:flex-row justify-center rounded-2xl">
            <div className="md:absolute w-10/12 md:w-6/12 md:h-[30rem]  xl:h-[45rem] rounded-3xl loginbg md:right-[5rem] flex  flex-col justify-around px-2">
              <div className="flex flex-col items-center pt-12">
                <h1 className="font-sofia text-2xl xl:text-6xl">
                  {t("log_title")}
                </h1>
                <h1 className="font-sunflower opacity-50 text-lg xl:text-3xl xl:pt-8 mt-2 text-center">
                  {t("log_subtitle")}
                </h1>
              </div>

              <div className="w-full flex flex-col items-center gap-8 px-4 mt-4 md:mt-0">
                <InputField
                  type="email"
                  id="email"
                  placeholder="abcdef@example.com"
                  IconComponent={EnvelopeIcon}
                  label={t("email")}
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  name="email"
                  errorMessage={errors.email}
                  background={bgClass}
                />
                <InputField
                  type="password"
                  id="password"
                  placeholder="************"
                  IconComponent={EyeIcon}
                  maxl={20}
                  label={t("pass")}
                  value={formData.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  name="password"
                  errorMessage={errors.password}
                  background={bgClass}
                />
              </div>
              <div className="flex flex-col w-6/12 items-center justify-around gap-1 mx-auto py-8">
                <ContributeBtn
                  importance="primary"
                  text={t("log_btn")}
                  onClick={handleLogin}
                />
                <button className="underline text-blue-900 text-base md:text-lg font-sunflower font-bold ">
                  {t("forgot_pass")}
                </button>
              </div>
            </div>
            <div className="md:absolute left-0 top-0 md:px-12 md:py-12 w-full md:w-5/12 flex flex-col justify-around md:h-[26rem] xl:h-[30rem] bg-white mt-4 items-center md:items-start md:mt-0 md:bg-transparent gap-4 md:gap-0 px-4 py-4 rounded-xl">
              <h1 className="md:text-3xl xl:text-6xl font-sofia">
                {t("log_acc")}
              </h1>
              <h1 className="hidden md:block md:text-lg xl:text-3xl font-sunflower  opacity-60">
                {t("log_acc_sub")}
              </h1>
              <Link to="/choice" className="md:w-7/12 xl:w-4/12 w-6/12">
                <button className="signbtn text-base md:text-lg font-sofia font-bold  ">
                  {t("signup_btn")}
                </button>
              </Link>
            </div>
          </div>
        </form>
        <div className=" mt-4 md:mt-24">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Login;
