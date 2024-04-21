import React, { useState } from 'react';
import '../authpopup/AuthPopup.css';
import img from '../../../assets/HomePageText2.png';
import logo from '../../../assets/HomePageText2.png';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import dayjs from 'dayjs';

//
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthPopup = ({ setShowPopup,username, email}) => {
    const Navigate = useNavigate();
    const [showSignup, setShowSignup] = useState(false);
    const [signupformData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        weightInKg: 0.0,
        heightInCm: 0.0,
        goal: '',
        gender: '',
        dob: new Date(),
        activityLevel: ''
    });
    const [loginformData, setLoginFormData] = useState({
        email: '',
        password: '',
    });

    const handleClose = () => {
        setShowPopup(false);
        Navigate('/');
    };

    const handleLogin = () => {
        console.log(loginformData);

        fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData),
            credentials: 'include'
        })
        .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)
                    setShowPopup(false)
                    Navigate('/')
                    if (data.username && data.email) {
                        // Update username and email props
                        username(data.username);
                            email(data.email);
                    }
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    const handleSignup = () => {
        // console.log(process.env.NEXT_PUBLIC_BACKEND_API);

        fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupformData),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)

                    setShowSignup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='popup'>
            <button className='close'
                onClick={handleClose}
            >
                <AiOutlineClose/>
            </button>
            {
                showSignup ? (
                    <div className='authform'>

                        <div className='left'>
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Signup to become a freak</h1>
                            <form action="">
                                <Input
                                    color="warning"
                                    placeholder="name"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            name: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            email: e.target.value
                                        })
                                    }}
                                />
                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'

                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            password: e.target.value
                                        })
                                    }}
                                />


                                <Input color="warning" size="lg" variant="solid" type="number" placeholder='Weight in kg'
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            weightInKg: parseFloat(e.target.value)
                                        })
                                    }}
                                />

                                <Select
                                    color="warning"
                                    placeholder="Activity Level"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event,
                                        newValue,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            activityLevel: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="sedentary">Sedentary</Option>
                                    <Option value="light">Light</Option>
                                    <Option value="moderate">Moderate</Option>
                                    <Option value="active">Active</Option>
                                    <Option value="veryActive">Very Active</Option>
                                </Select>

                                <Select
                                    color="warning"
                                    placeholder="Goal"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event,
                                        newValue,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            goal: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="weightLoss">Lose</Option>
                                    <Option value="weightMaintain">Maintain</Option>
                                    <Option value="weightGain">Gain</Option>
                                </Select>

                                <Select
                                    color="warning"
                                    placeholder="Gender"
                                    size="lg"
                                    variant="solid"

                                    onChange={(
                                        event,
                                        newValue,
                                    ) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            gender: newValue?.toString() || ''
                                        })
                                    }}
                                >
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>

                                <label htmlFor="">Height</label>


                                <Input color="warning" size="lg" variant="solid" type="number" placeholder='cm'
                                    onChange={(e) => {
                                        setSignupFormData({
                                            ...signupformData,
                                            heightInCm: parseFloat(e.target.value)
                                        })
                                    }}
                                />


                                <label htmlFor="">Date of Birth</label>
                                <LocalizationProvider dateAdapter={AdapterDayjs}

                                >
                                    <DesktopDatePicker defaultValue={dayjs(new Date())}
                                        sx={{
                                            backgroundColor: 'white',
                                        }}

                                        onChange={(newValue) => {
                                            setSignupFormData({
                                                ...signupformData,
                                                dob: new Date(newValue)
                                            })
                                        }}
                                    />
                                </LocalizationProvider>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleSignup()
                                    }}
                                className='login_btn'>Signup</button>
                            </form>
                            <p>Already have an account?  <button onClick={() => {
                                setShowSignup(false)
                            }} className='login_btn'>Login</button></p>
                        </div>

                    </div>
                ) : (
                    <div className='authform'>
                        <div className='left'>
                            <img src={logo} alt="Logo" />
                        </div>
                        <div className='right'>
                            <h1>Login to become a freak</h1>
                            <form action="">
                                <Input
                                    color="warning"
                                    placeholder="email"
                                    size="lg"
                                    variant="solid"
                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            email: e.target.value
                                        })
                                    }}
                                />

                                <Input
                                    color="warning"
                                    placeholder="password"
                                    size="lg"
                                    variant="solid"
                                    type='password'

                                    onChange={(e) => {
                                        setLoginFormData({
                                            ...loginformData,
                                            password: e.target.value
                                        })
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleLogin()
                                    }}
                                className='login_btn'>Login</button>
                            </form>
                            <p>Don't have an account?  <button onClick={() => {
                                setShowSignup(true)
                            }} className='login_btn'>Signup</button></p>
                        </div>

                    </div>
                )
            }
        </div>
    );
}

export default AuthPopup;
