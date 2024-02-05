import { object, string } from 'yup';
// import { LocateMe } from '../utility/getLocation';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const RegistrationValidationSchema = () => {
    return object({
        fullName: string().required('Full name is required')
        .matches(/^[a-zA-Z ]+$/, 'Full name must contain only letters and spaces'),
      email: string().email('Invalid email').required('Email is required'),
      password:string().min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    });
}

export const LoginValidationSchema = () => {
    return object({
        email: string().label('Email address').email().required('Email Address field is required'),
        password: string().label('Password').required('Password field is required'),
    });
}



export const AddressValidationSchema = () => {
    return object({
        address: string().required('Address field is required'),
       
    });
}

