import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/admininterceptor";
import UserNavbar from "../components/Aside/AdminNavbar";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
const URL = "http://localhost:3000/admin/dashboard";
const AdminDashBoard = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [adminTable, setAdminTable] = useState(true);
    const [transaction, setTransaction] = useState([]);
    // const [singleUserId, setSingleUserId] = useState([]);
    const {name,getName,setName} = useContext (AuthContext)

    const fetchData = async (event) => {
        try {
            console.log("fetchData");
            const response = await axiosInstance("/dashboard");
            console.log(response, "===response==fetchData");
            setUserDetails(response.data.alluser);
            setName(response.data.user.username)
        } catch (error) {
            genericError(error);
        }
    };

    const Auth = async (id,auth) => {
      try {
          console.log("fetchData");
          const response = await axiosInstance("/userAuth",{
            method:"PUT",
            data:{id,auth}
          });
          console.log(response, "===response==fetchData");
          setUserDetails(response.data.alluser);
      } catch (error) {
          genericError(error);
      }
  };

    const showDetails = async (singleUserId) => {
      try {
          console.log("fetchData");
          const response = await axiosInstance(`/sigletransation/${singleUserId}`);
          console.log(response, "===response==fetchData");
          setTransaction(response.data.user.transaction);
          setAdminTable((prev)=> !prev)
      } catch (error) {
          genericError(error);
      }
  };
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-full w-full h-screen  flex">
            <div className="max-w-[300px] w-full h-full  bg-[#445de7] ">
                <UserNavbar />
            </div>
            {adminTable ?(
            <div className="w-full h-full   ">
                <h1 className="text-center mt-3 mb-5 text-[25px] font-bold text-[#494646]">User Details</h1>
                <div className="bg-[#e2dfdf] h-full pl-10 pr-10 ">
                    <table className="w-full border-[2px]  ">
                        <tr className="bg-[#a6a9b8]  h-[50px] rounded-lg">
                            <th className="text-[#1d1c1c]">Name</th>
                            <th className="text-[#1d1c1c]">Ac Number</th>
                            <th className="text-[#1d1c1c]">Balance</th>
                            <th className="text-[#1d1c1c]">Status</th>
                            <th className="text-[#1d1c1c]">Datails</th>
                        </tr>
                        
                        {userDetails.map((data,index)=>(
                            <tr className="text-center bg-[white] h-[80px]" key={index}>
                            <td className="text-[#8d8787]">{data.username}</td>
                            <td className="text-[#8d8787]">{data.accountnumber}</td>
                            <td className="text-[#8d8787]">{data.total}</td>
                            <td className="text-[#8d8787]">{data.status?<p className="text-[green] cursor-pointer" onClick={()=>Auth(data._id,false)}>Unblock</p>:<p className="text-[red] cursor-pointer" onClick={()=>Auth(data._id,true)}>Block</p>}</td>
                            <td className="text-[#8d8787]" onClick={()=>showDetails(data._id)}><p className="cursor-pointer text-[blue]">Show</p></td>
                        </tr>
                        ))}
                        
                    </table>
                </div>
            </div>):(
              <div className="w-full h-full   ">
              <h1 className="text-center mt-3 mb-5 text-[25px] font-bold">Transaction history</h1>
              <div className="bg-[#e2dfdf] h-full pl-10 pr-10 ">
                  <table className="w-full border-[2px]  ">
                      <tr className="bg-[#a6a9b8]  h-[50px] rounded-lg">
                          <th className="text-[#1d1c1c]">Date</th>
                          <th className="text-[#1d1c1c]">Ac Number</th>
                          <th className="text-[#1d1c1c]">Status</th>
                          <th className="text-[#1d1c1c]">Amount</th>
                          <th className="text-[#1d1c1c]">Balance</th>
                      </tr>
                      {transaction.map((data,index)=>(
                          <tr className="text-center bg-[white] h-[80px]" key={index}>
                          <td className="text-[#8d8787]">{data.date.split('T')[0]}</td>
                          <td className="text-[#8d8787]">{data.accountnumber}</td>
                          <td className="text-[#8d8787]">{data.status}</td>
                          <td className="text-[#8d8787]">{data.amount}</td>
                          <td className="text-[#8d8787]">{data.balance}</td>
                      </tr>
                      ))}
                      
                  </table>
              </div>
          </div>
            )
}
        </div>
    );
};

export default AdminDashBoard;

