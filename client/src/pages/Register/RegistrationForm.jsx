import { HOBBIES } from "./register.constants";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const RegistrationForm = ({
  form,
  states,
  cities,
  picture,
  errors,
  loading,
  statesLoading,
  citiesLoading,
  onChange,
  onStateChange,
  onHobbyChange,
  onPictureChange,
  onTermsChange,
  onSubmit,
}) => {
  const inputClass =
    "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500";

  const labelClass = "mb-1 block text-sm font-medium text-gray-700";

  const errorClass = "mt-1 text-xs text-red-500";

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Allow only digits and maximum 10 characters.
  const handlePhoneChange = (event) => {
    const { name, value } = event.target;

    const numericValue = value.replace(/\D/g, "").slice(0, 10);

    onChange({
      target: {
        name,
        value: numericValue,
      },
    });
  };

  // Keep our form state as YYYY-MM-DD.
  // The DatePicker only DISPLAYs it as DD/MM/YYYY.
  const handleDateChange = (date) => {
    const formattedDate =
      date && date.isValid() ? date.format("YYYY-MM-DD") : "";

    onChange({
      target: {
        name: "dateOfBirth",
        value: formattedDate,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-md bg-white shadow-md">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-xl font-semibold text-white">
              Employee Registration
            </h1>
          </div>

          <form onSubmit={onSubmit} className="p-6" noValidate>
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className={labelClass}>
                  Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  maxLength={25}
                  className={inputClass}
                />

                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>
                  Gender <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-6 py-2">
                  {["Male", "Female"].map((gender) => (
                    <label key={gender} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={form.gender === gender}
                        onChange={onChange}
                      />

                      {gender}
                    </label>
                  ))}
                </div>

                {errors.gender && <p className={errorClass}>{errors.gender}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className={labelClass}>
                  Date of Birth <span className="text-red-500">*</span>
                </label>

                <DatePicker
                  format="DD/MM/YYYY"
                  disableFuture
                  value={form.dateOfBirth ? dayjs(form.dateOfBirth) : null}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      placeholder: "DD/MM/YYYY",
                      error: Boolean(errors.dateOfBirth),
                      sx: {
                        "& .MuiInputBase-root": {
                          fontSize: "14px",
                          height: "38px",
                        },
                      },
                    },
                  }}
                />

                {errors.dateOfBirth && (
                  <p className={errorClass}>{errors.dateOfBirth}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  maxLength={25}
                  placeholder="Enter email"
                  className={inputClass}
                />

                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              {/* Password */}

              <div>
                <label className={labelClass}>
                  Password <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    className={`${inputClass} pr-10`}
                  />

                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className={errorClass}>{errors.password}</p>
                )}
              </div>
              {/* Confirm Password */}
              {/* Confirm Password */}
              <div>
                <label className={labelClass}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={onChange}
                    className={`${inputClass} pr-10`}
                  />

                  <button
                    type="button"
                    onClick={handleToggleConfirmPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className={errorClass}>{errors.confirmPassword}</p>
                )}
              </div>
              {/* Mobile */}
              <div>
                <label className={labelClass}>Mobile</label>

                <div className="flex">
                  <span className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10 digit number"
                    className="w-full rounded-r border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone</label>

                <div className="flex">
                  <span className="flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10 digit number"
                    className="w-full rounded-r border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>

              {/* State */}
              <div>
                <label className={labelClass}>
                  State <span className="text-red-500">*</span>
                </label>

                <select
                  name="stateId"
                  value={form.stateId}
                  onChange={onStateChange}
                  disabled={statesLoading}
                  className={inputClass}
                >
                  <option value="">
                    {statesLoading ? "Loading..." : "Select State"}
                  </option>

                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>

                {errors.stateId && (
                  <p className={errorClass}>{errors.stateId}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  City <span className="text-red-500">*</span>
                </label>

                <select
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  disabled={!form.stateId || citiesLoading}
                  className={inputClass}
                >
                  <option value="">
                    {citiesLoading ? "Loading..." : "Select City"}
                  </option>

                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {errors.city && <p className={errorClass}>{errors.city}</p>}
              </div>
            </div>

            {/* Hobbies */}
            <div className="mt-6">
              <label className={labelClass}>Hobbies</label>

              <div className="flex flex-wrap gap-5">
                {HOBBIES.map((hobby) => (
                  <label key={hobby} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.hobbies.includes(hobby)}
                      onChange={() => onHobbyChange(hobby)}
                    />

                    {hobby}
                  </label>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div className="mt-6">
              <label className={labelClass}>Photo</label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={onPictureChange}
              />

              {picture && (
                <p className="mt-1 text-xs text-gray-500">
                  Selected: {picture.name}
                </p>
              )}

              {errors.picture && <p className={errorClass}>{errors.picture}</p>}
            </div>

            {/* Terms */}
            <div className="mt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={onTermsChange}
                />
                I Agree to Terms and Conditions
              </label>

              {errors.agreeTerms && (
                <p className={errorClass}>{errors.agreeTerms}</p>
              )}
            </div>

            {errors.submit && (
              <p className="mt-5 text-sm text-red-500">{errors.submit}</p>
            )}

            <div className="mt-7">
              <button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-600 px-8 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </LocalizationProvider>
  );
};

export default RegistrationForm;
