import * as Yup from 'yup';

export const employee_edit = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(25, "Name can't be longer than 25 characters").required("Please enter your name"),
    emailId: Yup.string().email("Invalid email format").required("Please enter your email"),
    mobile: Yup.string().min(2, "Mobile number must be at least 2 characters").required("Please enter your mobile number"),
    country: Yup.string().required("Please select your country").test('not-empty', 'Please select your country', value => value !== ''),
    state: Yup.string().min(2, "State must be at least 2 characters").required("Please enter your state"),
    district: Yup.string().min(2, "District must be at least 2 characters").required("Please enter your District"),
});
