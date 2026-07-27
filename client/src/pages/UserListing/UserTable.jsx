import { formatValue } from "../../utils/formatValue";

const UserTable = ({ users, loading }) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading users...
            </div>
        );
    }

    if (!users?.length) {
        return (
            <div className="py-10 text-center text-gray-500">
                No users found
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-700">
                        <th className="border p-3">Photo</th>
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Gender</th>
                        <th className="border p-3">Email</th>
                        <th className="border p-3">State</th>
                        <th className="border p-3">City</th>
                        <th className="border p-3">Hobbies</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user._id}
                            className="text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                            {/* Photo */}
                            <td className="border p-3">
                                {user.picture ? (
                                    <img
                                        src={`${apiUrl}/uploads/${user.picture}`}
                                        alt={formatValue(user.name, "User")}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span>
                                        {formatValue(null)}
                                    </span>
                                )}
                            </td>

                            {/* Name */}
                            <td className="border p-3">
                                {formatValue(user.name)}
                            </td>

                            {/* Gender */}
                            <td className="border p-3">
                                {formatValue(user.gender)}
                            </td>

                            {/* Email */}
                            <td className="border p-3">
                                {formatValue(user.email)}
                            </td>

                            {/* State */}
                            <td className="border p-3">
                                {formatValue(
                                    user.stateId?.name
                                )}
                            </td>

                            {/* City */}
                            <td className="border p-3">
                                {formatValue(user.city)}
                            </td>

                            {/* Hobbies */}
                            <td className="border p-3">
                                {formatValue(
                                    user.hobbies?.length
                                        ? user.hobbies.join(", ")
                                        : null
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;