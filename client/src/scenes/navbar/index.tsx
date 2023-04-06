import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../index.css'

type Props = {}

const Navbar = (props: Props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="w-full bg-[#212121] h-16 flex items-center bg-blend-darken  shadow-lg">
        <div>
            <p className="w-full text-3xl text-center p-6 text-blue-300 font-extrabold">
                Finanxe
            </p>
        </div>
        
    </div>
  )
}

export default Navbar