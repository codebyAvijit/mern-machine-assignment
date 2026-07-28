import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import RegistrationForm from "./RegistrationForm";
import { INITIAL_FORM, DRAFT_KEY } from "./register.constants";
import { validateRegistration } from "./registerValidation";
import { getStates, getCitiesByState } from "../../api/state.api";
import { registerUser } from "../../api/user.api";

import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "../../utils/storage";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState(() =>
    getStorageItem(DRAFT_KEY, INITIAL_FORM),
  );

  // API data
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // File cannot be persisted in localStorage
  const [picture, setPicture] = useState(null);

  // UI state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);

  // -----------------------------
  // Load States
  // -----------------------------

  useEffect(() => {
    const loadStates = async () => {
      try {
        setStatesLoading(true);

        const data = await getStates();

        setStates(data);
      } catch (error) {
        console.error("Failed to load states:", error);

        setErrors((previous) => ({
          ...previous,
          stateId: "Unable to load states",
        }));
      } finally {
        setStatesLoading(false);
      }
    };

    loadStates();
  }, []);

  // -----------------------------
  // Load Cities
  // -----------------------------

  useEffect(() => {
    const loadCities = async () => {
      if (!form.stateId) {
        setCities([]);
        return;
      }

      try {
        setCitiesLoading(true);

        const data = await getCitiesByState(form.stateId);

        const cityList = Array.isArray(data) ? data : data?.cities || [];

        setCities(cityList);
      } catch (error) {
        console.error("Failed to load cities:", error);

        setCities([]);

        setErrors((previous) => ({
          ...previous,
          city: "Unable to load cities",
        }));
      } finally {
        setCitiesLoading(false);
      }
    };

    loadCities();
  }, [form.stateId]);

  // -----------------------------
  // Persist Form Draft
  // -----------------------------

  useEffect(() => {
    setStorageItem(DRAFT_KEY, form);
  }, [form]);

  // -----------------------------
  // Generic Input Change
  // -----------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      submit: "",
    }));
  };

  // -----------------------------
  // State Change
  // -----------------------------

  const handleStateChange = (event) => {
    const stateId = event.target.value;

    setForm((previous) => ({
      ...previous,
      stateId,
      city: "",
    }));

    setCities([]);

    setErrors((previous) => ({
      ...previous,
      stateId: "",
      city: "",
      submit: "",
    }));
  };

  // -----------------------------
  // Hobby Change
  // -----------------------------

  const handleHobbyChange = (hobby) => {
    setForm((previous) => {
      const alreadySelected = previous.hobbies.includes(hobby);

      return {
        ...previous,

        hobbies: alreadySelected
          ? previous.hobbies.filter((item) => item !== hobby)
          : [...previous.hobbies, hobby],
      };
    });
  };

  // -----------------------------
  // Picture Change
  // -----------------------------

  const handlePictureChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPicture(null);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setPicture(null);

      setErrors((previous) => ({
        ...previous,
        picture: "Only JPG and PNG images are allowed",
      }));

      // Reset browser file input
      event.target.value = "";

      return;
    }

    setPicture(file);

    setErrors((previous) => ({
      ...previous,
      picture: "",
      submit: "",
    }));
  };

  // -----------------------------
  // Terms Change
  // -----------------------------

  const handleTermsChange = (event) => {
    const checked = event.target.checked;

    setForm((previous) => ({
      ...previous,
      agreeTerms: checked,
    }));

    setErrors((previous) => ({
      ...previous,
      agreeTerms: "",
      submit: "",
    }));
  };

  // -----------------------------
  // Submit
  // -----------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate normal fields first
    const validationErrors = validateRegistration(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Assignment requirement:
    // Terms validation should only happen
    // after other fields are valid.
    if (!form.agreeTerms) {
      setErrors({
        agreeTerms: "Please agree to the Terms and Conditions",
      });

      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("gender", form.gender);
      formData.append("dateOfBirth", form.dateOfBirth.trim());
      formData.append("email", form.email.trim());
      formData.append("password", form.password);
      formData.append("mobile", form.mobile.trim());
      formData.append("phone", form.phone.trim());
      formData.append("stateId", form.stateId);
      formData.append("city", form.city);

      // Append hobbies using the same key
      // so backend receives an array.
      form.hobbies.forEach((hobby) => {
        formData.append("hobbies", hobby);
      });

      // Picture is optional
      if (picture) {
        formData.append("picture", picture);
      }

      await registerUser(formData);

      removeStorageItem(DRAFT_KEY);

      toast.success("Registration successful! Please login.");

      navigate("/login");

      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setErrors({
        submit: message,
      });

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegistrationForm
      form={form}
      states={states}
      cities={cities}
      picture={picture}
      errors={errors}
      loading={loading}
      statesLoading={statesLoading}
      citiesLoading={citiesLoading}
      onChange={handleChange}
      onStateChange={handleStateChange}
      onHobbyChange={handleHobbyChange}
      onPictureChange={handlePictureChange}
      onTermsChange={handleTermsChange}
      onSubmit={handleSubmit}
    />
  );
};

export default Register;
