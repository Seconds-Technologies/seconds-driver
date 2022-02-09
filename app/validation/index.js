import * as Yup from 'yup';

const phoneRegExp2 =
	/^(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?|\(?0)(?:\d{5}\)?[\s-]?\d{4,5}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{2}\)?[\s-]?\d{4}[\s-]?\d{4})(?:[\s-]?(?:x|ext\.?|#)\d{3,4})?$/;

export const signupSchema = Yup.object({
	phone: Yup.string().matches(phoneRegExp2, 'Phone number is not valid').required('* Required'),
	password: Yup.string().min(8, 'Min. 8 characters').required('Required'),
	confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
