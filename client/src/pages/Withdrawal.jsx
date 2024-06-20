import React, { useState } from "react";
import './Withdrawal.css'
import UserNavbar from "../components/Aside/UserNavbar";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from '../../utils/userinterceptor';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Withdrawal = () => {
    const navigate = useNavigate();

    const [fields, setFields] = useState({
        name: "",
        accountnumber: "",
        amount: "",
    });

    const [errorFields, setErrorFields] = useState({
        name: false,
        accountnumber: false,
        amount: false,
    });

    const handleChange = (event) => {
        setFields((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            if (isFormValid()) {
                try {
                    console.log("it is valid");
                    console.log(fields);

                    const response = await axiosInstance("/withdrawel", {
                      method: "PUT", 
                      data: fields,
                  });

                    console.log(response);

                    if (response.data.message === "Transation successfull") {
                        toast.success("Transation successfull");

                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                    }
                } catch (error) {
                    console.log("it is login error catch");
                    console.log(error);
                }
            }
        } catch (error) {
            console.log("it is login error catch");
            console.log(error);
        }
    };

    const isFormValid = () => {
        console.log(fields);
        const errors = {
            name: false,
            accountnumber: false,
            amount: false,
        };

        if (fields.name === "") {
            errors.name = true;
        }
        if (fields.accountnumber === "") {
            errors.accountnumber = true;
        }
        if (fields.amount === "") {
            errors.amount = true;
        }

        setErrorFields(errors);

        if (Object.values(errors).some((error) => error === true)) {
            console.log("false");
            return false;
        }
        console.log("true");
        return true;
    };

    return (
        <div className="max-w-full w-full h-screen  flex">
            <div className="max-w-[300px] w-full h-full  bg-[#445de7] ">
                <UserNavbar />
            </div>
            <div className="w-full h-full ">
                <h1 className="text-center mt-3 mb-5 text-[25px] font-bold text-[#494646]">Withdrawal</h1>
                <div className="bg-[#e2dfdf] h-full pl-10 pr-10 flex justify-center items-center">

                <form onSubmit={handleSubmit} className="w-[500px] h-[400px] border-[1px] border-[#9999ce] p-10 rounded-md">
                        <div className="mb-8 w-full ">
                            <label htmlFor="" className="text-sm">
                                Account holder name
                            </label>
                            <div className="border-b-[2px] border-[#7272bd]  w-full">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name='name'
                                    className="w-full text-sm h-full outline-none bg-transparent "
                                    onChange={handleChange}
                                />
                            </div>
                            {errorFields.name && <p className="text-xs text-[red]">Name is required</p>}
                        </div>
                        <div className="mb-8 w-full ">
                            <label htmlFor="" className="text-sm">
                                Account number
                            </label>
                            <div className="border-b-[2px] border-[#7272bd]  w-full">
                                <input
                                    type="text"
                                    placeholder="Account number"
                                    name='accountnumber'
                                    className="w-full text-sm h-full outline-none bg-transparent "
                                    onChange={handleChange}
                                />
                            </div>
                            {errorFields.accountnumber && <p className="text-xs text-[red]">Password is required</p>}
                        </div>
                        <div className="mb-8 w-full ">
                            <label htmlFor="" className="text-sm">
                                Amount
                            </label>
                            <div className="border-b-[2px] border-[#7272bd]  w-full">
                                <input
                                    type="text"
                                    placeholder="amount"
                                    name='amount'
                                    className="w-full text-sm h-full outline-none bg-transparent "
                                    onChange={handleChange}
                                />
                            </div>
                            {errorFields.amount && <p className="text-xs text-[red]">Amount is required</p>}
                        </div>
                        <div className='mt-10  withdrawal-ogin-grad w-full rounded-2xl cursor-pointer h-8 flex items-center justify-center'><button className="text-white">proceed</button></div>
                    </form>

                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Withdrawal;
