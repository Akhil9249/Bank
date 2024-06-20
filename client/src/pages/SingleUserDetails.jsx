import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/userinterceptor";

import UserNavbar from "../components/Aside/AdminNavbar";

const SingleUserDetails = () => {
    const [transaction, setTransaction] = useState([]);

    const fetchData = async (event) => {
        try {
            console.log("fetchData");
            const response = await axiosInstance("/dashboard");
            console.log(response, "===response==fetchData");
            setTransaction(response.data.user.transaction);
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
            <div className="w-full h-full   ">
                <h1 className="text-center mt-3 mb-5 text-[25px] font-bold">Tarnsation history</h1>
                <div className="bg-[#e2dfdf] h-full pl-10 pr-10 ">
                    <table className="w-full border-[2px]  ">
                        <tr className="bg-[#a6a9b8]  h-[50px] rounded-lg">
                            <th className="text-[#1d1c1c]">Date</th>
                            <th className="text-[#1d1c1c]">Ac Number</th>
                            <th className="text-[#1d1c1c]">Status</th>
                            <th className="text-[#1d1c1c]">Amound</th>
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
        </div>
    );
};

export default SingleUserDetails;
