import React, { useState } from "react";
import Form from "./Form";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <div className=" w-full">
      <div className="bg-[#212121] bg-blend-darken  shadow-xl" >
        <p className="w-full text-6xl text-center p-6 text-blue-300 font-extrabold ">
          {" "}
          Finanxe.{" "}
        </p>
      </div>

      {/* <p className='w-full text-2xl text-center pt-10 text-blue-300 font-extrabold '> Please login to continue. </p> */}
      <div className="w-full flex flex-col justify-center items-center mt-6 min-w-full">
        <p className="w-full text-2xl text-center pt-12 text-blue-300 font-extrabold p-4">
          {" "}
          Welcome to Finanxe.{" "}
        </p>
        <Form />
      </div>
    </div>
  );
};

export default LoginPage;
