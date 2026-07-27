export const validateRegistration = (form) => {
    const errors = {};

    const indianPhoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // -------------------------
    // Name
    // -------------------------
    if (!form.name.trim()) {
        errors.name = "Name is required";
    } else if (form.name.trim().length > 25) {
        errors.name = "Name cannot exceed 25 characters";
    }

    // -------------------------
    // Gender
    // -------------------------
    if (!form.gender) {
        errors.gender = "Gender is required";
    }

    // -------------------------
    // Date of Birth
    // Internal format: YYYY-MM-DD
    // UI displays: DD/MM/YYYY
    // -------------------------
    if (!form.dateOfBirth) {
        errors.dateOfBirth = "Date of birth is required";
    } else {
        const date = new Date(
            `${form.dateOfBirth}T00:00:00`
        );

        if (Number.isNaN(date.getTime())) {
            errors.dateOfBirth = "Enter a valid date";
        } else {
            const today = new Date();

            today.setHours(23, 59, 59, 999);

            if (date > today) {
                errors.dateOfBirth =
                    "Date of birth cannot be in the future";
            }
        }
    }

    // -------------------------
    // Email - optional
    // -------------------------
    if (form.email.trim()) {
        if (form.email.trim().length > 25) {
            errors.email =
                "Email cannot exceed 25 characters";
        } else if (
            !emailRegex.test(form.email.trim())
        ) {
            errors.email =
                "Enter a valid email address";
        }
    }

    // -------------------------
    // Mobile / Phone
    // At least one is required
    // -------------------------
    const mobile = form.mobile.trim();
    const phone = form.phone.trim();

    if (!mobile && !phone) {
        errors.mobile =
            "Mobile or phone is required";
    }

    // Validate mobile only if entered
    if (
        mobile &&
        !indianPhoneRegex.test(mobile)
    ) {
        errors.mobile =
            "Enter a valid 10-digit Indian mobile number";
    }

    // Validate phone only if entered
    if (
        phone &&
        !indianPhoneRegex.test(phone)
    ) {
        errors.phone =
            "Enter a valid 10-digit Indian phone number";
    }

    // -------------------------
    // State
    // -------------------------
    if (!form.stateId) {
        errors.stateId = "State is required";
    }

    // -------------------------
    // City
    // -------------------------
    if (!form.city) {
        errors.city = "City is required";
    }

    return errors;
};