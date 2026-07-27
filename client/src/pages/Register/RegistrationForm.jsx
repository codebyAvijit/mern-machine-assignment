import { HOBBIES } from "./register.constants";

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

    const labelClass =
        "mb-1 block text-sm font-medium text-gray-700";

    const errorClass = "mt-1 text-xs text-red-500";

    return (
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
                                name="name"
                                value={form.name}
                                onChange={onChange}
                                maxLength={25}
                                className={inputClass}
                            />

                            {errors.name && (
                                <p className={errorClass}>{errors.name}</p>
                            )}
                        </div>

                        {/* Gender */}
                        <div>
                            <label className={labelClass}>
                                Gender <span className="text-red-500">*</span>
                            </label>

                            <div className="flex gap-6 py-2">
                                {["Male", "Female"].map((gender) => (
                                    <label
                                        key={gender}
                                        className="flex items-center gap-2"
                                    >
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

                            {errors.gender && (
                                <p className={errorClass}>{errors.gender}</p>
                            )}
                        </div>

                        {/* DOB */}
                        <div>
                            <label className={labelClass}>
                                Date of Birth{" "}
                                <span className="text-red-500">*</span>
                            </label>

                            <input
                                name="dateOfBirth"
                                value={form.dateOfBirth}
                                onChange={onChange}
                                placeholder="dd/mm/yyyy"
                                className={inputClass}
                            />

                            {errors.dateOfBirth && (
                                <p className={errorClass}>
                                    {errors.dateOfBirth}
                                </p>
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
                                className={inputClass}
                            />

                            {errors.email && (
                                <p className={errorClass}>{errors.email}</p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className={labelClass}>Mobile</label>

                            <input
                                name="mobile"
                                value={form.mobile}
                                onChange={onChange}
                                className={inputClass}
                            />

                            {errors.mobile && (
                                <p className={errorClass}>{errors.mobile}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className={labelClass}>Phone</label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={onChange}
                                className={inputClass}
                            />
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
                                    {statesLoading
                                        ? "Loading..."
                                        : "Select State"}
                                </option>

                                {states.map((state) => (
                                    <option
                                        key={state._id}
                                        value={state._id}
                                    >
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
                                    {citiesLoading
                                        ? "Loading..."
                                        : "Select City"}
                                </option>

                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>

                            {errors.city && (
                                <p className={errorClass}>{errors.city}</p>
                            )}
                        </div>
                    </div>

                    {/* Hobbies */}
                    <div className="mt-6">
                        <label className={labelClass}>Hobbies</label>

                        <div className="flex flex-wrap gap-5">
                            {HOBBIES.map((hobby) => (
                                <label
                                    key={hobby}
                                    className="flex items-center gap-2"
                                >
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

                        {errors.picture && (
                            <p className={errorClass}>{errors.picture}</p>
                        )}
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
                            <p className={errorClass}>
                                {errors.agreeTerms}
                            </p>
                        )}
                    </div>

                    {errors.submit && (
                        <p className="mt-5 text-sm text-red-500">
                            {errors.submit}
                        </p>
                    )}

                    <div className="mt-7">
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded bg-blue-600 px-8 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default RegistrationForm;