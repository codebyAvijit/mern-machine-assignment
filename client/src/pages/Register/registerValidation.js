export const validateRegistration = (form) => {
    const errors = {};

    if (!form.name.trim()) {
        errors.name = "Name is required";
    } else if (form.name.trim().length > 25) {
        errors.name = "Name cannot exceed 25 characters";
    }

    if (!form.gender) {
        errors.gender = "Gender is required";
    }

    if (!form.dateOfBirth.trim()) {
        errors.dateOfBirth = "Date of birth is required";
    } else {
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

        if (!dateRegex.test(form.dateOfBirth)) {
            errors.dateOfBirth = "Use dd/mm/yyyy format";
        } else {
            const [day, month, year] = form.dateOfBirth
                .split("/")
                .map(Number);

            const date = new Date(year, month - 1, day);

            const isValid =
                date.getFullYear() === year &&
                date.getMonth() === month - 1 &&
                date.getDate() === day;

            if (!isValid) {
                errors.dateOfBirth = "Enter a valid date";
            }
        }
    }

    if (form.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email.trim())) {
            errors.email = "Enter a valid email address";
        }
    }

    if (!form.mobile.trim() && !form.phone.trim()) {
        errors.mobile = "Mobile or phone is required";
    }

    if (!form.stateId) {
        errors.stateId = "State is required";
    }

    if (!form.city) {
        errors.city = "City is required";
    }

    return errors;
};