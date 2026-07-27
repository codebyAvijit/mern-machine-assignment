import { formatValue } from "../../utils/formatValue";

const UserTable = ({
    users,
    loading,
    page = 1,
    limit = 10,
}) => {
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
            <table className="w-full min-w-[700px] border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm text-gray-700">
                        <th className="border p-3">Reg. No.</th>
                        <th className="border p-3">Photo</th>
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Gender</th>
                        <th className="border p-3">State</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user._id}
                            className="text-sm text-gray-700 hover:bg-gray-50"
                        >
                            <td className="border p-3">
                                {(page - 1) * limit + index + 1}
                            </td>

                            <td className="border p-3">
                                {user.picture ? (
                                    <img
                                        src={`${apiUrl}/uploads/${user.picture}`}
                                        alt={formatValue(user.name, "User")}
                                        className="h-12 w-12 rounded object-cover"
                                    />
                                ) : (
                                    formatValue(null)
                                )}
                            </td>

                            <td className="border p-3">
                                {user.email ? (
                                    <a
                                        href={`mailto:${user.email}`}
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        {formatValue(user.name)}
                                    </a>
                                ) : (
                                    formatValue(user.name)
                                )}
                            </td>

                            <td className="border p-3">
                                {formatValue(user.gender)}
                            </td>

                            <td className="border p-3">
                                {formatValue(user.stateId?.name)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;