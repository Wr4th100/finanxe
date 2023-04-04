import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

type Props = {};

const registerSchema = yup.object().shape({
  username: yup.string().required("required"),
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

interface User {
  username: string;
  password: string;
  name: string;
  email: string;
}

const Form = (props: Props) => {
  const [pagetype, setPagetype] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pagetype === "login";
  const isRegister = pagetype === "register";

  const register = async (values: User, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://localhost:8080/users/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),

      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser)
    onSubmitProps.resetForm();
  
    if (savedUser) {
      setPagetype("login");
    }
  };
  

  const login = async (values, onSubmitProps) => {
    console.log("VALUES", values);
    const loggedInResponse = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
    
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex flex-col justify-center items-center  "
        >
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-400 text-md font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              className={`border-gray-300 border-2 rounded w-full min-w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 ${
                errors.username && touched.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && touched.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username}</div>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-400 text-md font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              className={`border-gray-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 ${
                errors.password && touched.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && touched.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>

          {isRegister && (
            <>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-400 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`border-gray-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-400 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`border-gray-300 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-400 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
            </>
          )}

          {/* <button type="submit" className="btn btn-primary">
            {isLogin ? "Login" : "Register"}
          </button>
          <button

            type="button"
            className="btn btn-link"
            onClick={() => setPagetype(isLogin ? "register" : "login")}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button> */}

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          <button
            type="button"
            className="mt-4 block w-full text-center text-gray-400 hover:underline"
            onClick={() => setPagetype(isLogin ? "register" : "login")}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
