import axios from 'axios';
import React, { useEffect, useState } from 'react'
import bg1 from '../Images/bg1.png'
import { employee_add } from '../../schemas';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValues = {
  name: '',
  emailId: '',
  mobile: '',
  country: '',
  state: '',
  district: ''
};

function AddEmp() {
  const [country, setCountry] = useState([]);

  const getCountry = async () => {
    try {
      const res = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountry(res.data);
    } catch (error) {
      console.error("Failed to fetch country data", error);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: employee_add,
    onSubmit: async (values) => {
      try {
        const formData = {
          'name': values.name,
          'emailId': values.emailId,
          'mobile': values.mobile,
          'state': values.state,
          'country': values.country,
          'district': values.district,
        }
        console.log(formData)
        console.log("add api called");

        await axios.post(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the request is treated as multipart
          },
        });
        toast.success('Employee Added', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        resetForm();
      } catch (error) {
        console.error("Failed to add employee", error);
        toast.error('Addition Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition: Bounce,
        });
        resetForm();
      }
    },
  });

  useEffect(() => {
    getCountry();
  }, [])
  return (
    <main className='w-full h-screen overflow-y-auto flex flex-col gap-5'>
      <div className='min-h-[50px] text-white text-[19px] flex items-center justify-start px-5 py-3' style={{ background: ' linear-gradient(90deg, rgba(8,57,123,1) 36%, rgba(3,15,37,1) 100%)' }}>
        <span className='uppercase font-semibold tracking-widest'>
          Add Employee
        </span>
      </div>
      <div className='px-10 py-3 w-full flex flex-col items-center justify-center'>
        <div className='w-full flex ' style={{ boxShadow: '5px 7px 44px -20px black' }}>
          <div className='bg-[#b5cff8] xl:w-2/5 hidden xl:flex xl:items-center xl:justify-center '>
            <img src={bg1} alt="" className='max-h-[389px] max-w-[440px]' />
          </div>
          <form onSubmit={handleSubmit} className='py-7 px-7 xl:w-3/5 w-full flex flex-col gap-2'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name" className='tracking-wider text-base'>Name</label>
              <input type="text" id='name' placeholder='Enter Name' className='outline-none border-2 border-slate-300 focus:border-[#0f4bab] px-2 py-1 rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                autoComplete='off' />
              {errors.name && touched.name && <p className='text-red-500 mb-2'>{errors.name}</p>}
            </div>
            <div className='flex flex-col  gap-1'>
              <label htmlFor="emailId" className='tracking-wider text-base'>Email</label>
              <input type="text" id='emailId' placeholder='Enter Email Id' className='outline-none border-2 border-slate-300 focus:border-[#0f4bab] px-2 py-1 rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.emailId}
                autoComplete='off' />
              {errors.emailId && touched.emailId && <p className='text-red-500 mb-2'>{errors.emailId}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="mobile" className='tracking-wider text-base'>Mobile</label>
              <input type="text" id='mobile' placeholder='Enter Mobile No.' className='outline-none border-2 border-slate-300 focus:border-[#0f4bab]  px-2 py-1 rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.mobile}
                autoComplete='off' />
              {errors.mobile && touched.mobile && <p className='text-red-500 mb-2'>{errors.mobile}</p>}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="country" className='tracking-wider text-base'>Country</label>
              <select id="country" placeholder="Select Country" className='outline-none  px-2 py-1 border-2 border-slate-300 focus:border-[#0f4bab]  rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
                autoComplete='off'>
                <option value="" className='text-slate-600'>Select Country</option>
                {
                  country.map((item, index) => (
                    <option key={index} value={item.country}>{item.country}</option>
                  ))
                }
              </select>
              {errors.country && touched.country && <p className='text-red-500 mb-2'>{errors.country}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="state" className='tracking-wider text-base'>State</label>
              <input type="text" id='state' placeholder='Enter State' className='outline-none border-2 border-slate-300  focus:border-[#0f4bab] p px-2 py-1 rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.state}
                autoComplete='off' />
              {errors.state && touched.state && <p className='text-red-500 mb-2'>{errors.state}</p>}
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="district" className='tracking-wider text-base'>District</label>
              <input type="text" id='district' placeholder='Enter District' className='outline-none border-2 border-slate-300  focus:border-[#0f4bab]  px-2 py-1 rounded-md'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.district}
                autoComplete='off' />
              {errors.district && touched.district && <p className='text-red-500 mb-2'>{errors.district}</p>}
            </div>
            <div className='pt-2'>
              <button type='submit' className='bg-[#0f4bab] px-2 py-1 text-white text-base rounded-lg w-full tracking-widest hover:bg-blue-900'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default AddEmp