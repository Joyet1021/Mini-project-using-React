import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import cover_image from '../assets/cover_image.jpg';


const Otp = () => {
    const [inputs, setInputs] = useState({
        otp1: '',
        otp2: '',
        otp3:'',
        otp4:''
    });
   
    const handleSubmit =  (e) => {
        e.preventDefault();
    };

    return (
        <div className='w-full h-screen flex items-center justify-center bg-gray-100'>
            <div className={`w-[60%] h-[30rem] lg:w-[70%] md:w-[50%] sm:w-[55%] flex overflow-hidden rounded-lg shadow-2xl`}>
                    <div className="hidden lg:flex w-1/2 h-full ">
                        <img src={cover_image} className="w-full h-full object-cover lg:object-fill" alt="Cover" />
                    </div>
                <div className="w-1/2 h-full flex-grow flex flex-col  bg-gray-200 items-center ">
                <form onSubmit={handleSubmit} className='flex flex-1 items-center justify-center w-[80%] h-full flex-col'>
                        <div className='font-bold text-2xl'>Verify OTP</div><br />
                        <div className='w-4/5 '>
                            <div className='w-full h-16 flex justify-center gap-[3%]  mb-10   '>
                                <input type="text" name="otp1" value={inputs.otp1} onChange={(e) => setInputs({ ...inputs, otp1: e.target.value })} className="w-[20%] h-[80%] flex items-center justify-center text-center font-medium" maxLength="1" placeholder="" inputMode="numeric" pattern="[0-9]"/>
                                <input type="text" name="otp2" value={inputs.otp2} onChange={(e) => setInputs({ ...inputs, otp2: e.target.value })} className="w-[20%] h-[80%] flex items-center justify-center text-center font-medium" maxLength="1" placeholder="" inputMode="numeric" pattern="[0-9]"/>
                                <input type="text" name="otp3" value={inputs.otp3} onChange={(e) => setInputs({ ...inputs, otp3: e.target.value })} className="w-[20%] h-[80%] flex items-center justify-center text-center font-medium" maxLength="1" placeholder="" inputMode="numeric" pattern="[0-9]"/>
                                <input type="text" name="otp4" value={inputs.otp4} onChange={(e) => setInputs({ ...inputs, otp4: e.target.value })} className="w-[20%] h-[80%] flex items-center justify-center text-center font-medium" maxLength="1" placeholder="" inputMode="numeric" pattern="[0-9]"/>
                                <br />
                            </div>
                            <button className='w-full h-8 bg-green-600 flex justify-center text-white hover:bg-green-800 font-bold'>Verify</button>
                            <p>Don't have an account ? </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Otp;
