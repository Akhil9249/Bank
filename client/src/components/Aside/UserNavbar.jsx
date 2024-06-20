import React, { useContext } from "react";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import userImage from "../../assets/userImage.png";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { AuthContext } from "../../../context/authContext";

const UserNavbar = () => {
    const {name} = useContext(AuthContext)
  const navigate = useNavigate()
  const logOut =()=>{
    localStorage.removeItem('userToken');
    navigate("/")   
}
    return (
        <div className="w-full min-h-[400px] flex flex-col items-center">
            <div className="w-[100px] h-[100px] border-[1px] border-[#9999c5] mt-5 flex flex-col items-center justify-center rounded-md cursor-pointer">
                <div className="w-[50px] h-[50px] rounded-full ">
                    <img src={userImage} style={{ objectFit: "cover" }} alt="" className="w-[50px] h-[50px] rounded-full" />
                </div>
                <p className="text-sm text-white ">{name}</p>
            </div>
            <Link to="/dashboard">
                <div className="w-[100px] h-[100px] border-[1px] border-[#9999c5] mt-10 flex flex-col items-center justify-center rounded-md ">
                    <IoMdHome size={35} style={{ color: "white" }} />
                    <p className="text-sm text-white cursor-pointer">Home</p>
                </div>
            </Link>
            <Link to="/withdrawel">
                <div className="w-[100px] h-[100px] border-[1px] border-[#9999c5] mt-10 flex flex-col items-center justify-center rounded-md ">
                    <FaRegMoneyBillAlt size={35} style={{ color: "white" }} />
                    <p className="text-sm text-white cursor-pointer">withdrawal</p>
                </div>
            </Link>
            <Link to="/deposit">
                <div className="w-[100px] h-[100px] border-[1px] border-[#9999c5] mt-10 flex flex-col items-center justify-center rounded-md cursor-pointer">
                    <GiPayMoney size={35} style={{ color: "white" }} />

                    <p className="text-sm text-white ">deposit</p>
                </div>
            </Link>
            <div className="w-[100px] h-[50px] border-[1px] border-[#9999c5] mt-10 flex flex-col items-center justify-center rounded-md cursor-pointer" onClick={logOut}>    
                <p className="text-sm text-white ">LOG OUT</p>
                </div>
        </div>
    );
};

export default UserNavbar;
