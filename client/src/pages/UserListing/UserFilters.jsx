const UserFilters = ({
    filters,
    states,
    onChange,
    onReset,
}) => {
    const inputClass =
        "w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500";

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Name Search */}
            <input
                type="text"
                name="name"
                value={filters.name}
                onChange={onChange}
                placeholder="Search by name"
                className={inputClass}
            />

            {/* Gender */}
            <select
                name="gender"
                value={filters.gender}
                onChange={onChange}
                className={inputClass}
            >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            {/* State */}
            <select
                name="stateId"
                value={filters.stateId}
                onChange={onChange}
                className={inputClass}
            >
                <option value="">All States</option>

                {states.map((state) => (
                    <option
                        key={state._id}
                        value={state._id}
                    >
                        {state.name}
                    </option>
                ))}
            </select>

            {/* Reset */}
            <button
                type="button"
                onClick={onReset}
                className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default UserFilters;