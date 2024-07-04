import { Button } from 'antd'
import React from 'react'

const AppointmentForm = () => {
  return (
    <>
        <form>
            <h3>Add Appointment</h3> 

            <div className='form__container'>
                <p className='form-field'>
                    <label htmlFor='full_name'>Full Name</label>
                    <input type='text' name='full_name' id='full_name' placeholder='Enter full name' />
                </p>

                <p className='form-field'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input type='text' name='mobile' id='mobile' placeholder='Enter contact number' />
                </p>

                <p className='form-field'>
                    <label htmlFor='company_name'>Company Name</label>
                    <input type='text' name='company_name' id='company_name' placeholder='Enter company name' />
                </p>

                <p className='form-field'>
                    <label htmlFor='company_location'>Company Location</label>
                    <input type='text' name='company_location' id='company_location' placeholder='Enter company location' />
                </p>

                <p className='form-field'>
                    <label htmlFor='designation'>Designation </label>
                    <input type='text' name='designation' id='designation' placeholder='Enter designation' />
                </p>

                <p className='form-field'>
                    <label htmlFor='address'>Address </label>
                    <input type='text' name='address' id='address' placeholder='Enter address' />
                </p>

                <p className='form-field'>
                    <label htmlFor='reference'>Reference </label>
                    <input type='text' name='reference' id='reference' placeholder='Enter reference' />
                </p>

                <p className='form-field'>
                    <label htmlFor='note'>Note</label>
                    <input type='text' name='note' id='note' placeholder='Enter note' />
                </p>
            </div>

            <Button className='form-btn' type='primary'>Submit</Button>
        </form>
    </>
  )
}

export default AppointmentForm