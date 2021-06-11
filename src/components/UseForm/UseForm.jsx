import { useState } from "react";

const UseForm = (callback) => {
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		event.persist();

		// User Registration Validation
		switch (event.target.name) {
			case "password":
				setErrors((errors) => ({
					...errors,
					password:
						event.target.value.length < 5
							? "Password must be at least 5 characters"
							: null,
				}));
				break;
			case "confirmPassword":
				setErrors((errors) => ({
					...errors,
					confirmPassword:
						event.target.value !== values.password
							? "Passwords do not match!"
							: null,
				}));
				break;
			default:
				break;
		}

		setValues((values) => ({
			...values,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		callback();
	};

	const clearValues = () => {
		setValues({});
	};
	return { errors, values, handleChange, handleSubmit, clearValues };
};

export default UseForm;
