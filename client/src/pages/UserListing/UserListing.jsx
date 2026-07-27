import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../api/user.api";
import UserTable from "./UserTable";

const UserListing = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getUsers({
                    page: 1,
                    limit: 10,
                });

                setUsers(response.data || []);
                setPagination(response.pagination);
            } catch (error) {
                console.error("Failed to load users:", error);

                setError("Unable to load users");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-7xl rounded-md bg-white shadow-md">
                <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            User Listing
                        </h1>

                        {pagination && (
                            <p className="mt-1 text-sm text-gray-500">
                                {pagination.total} users found
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add User
                    </button>
                </div>

                {error && (
                    <div className="m-5 rounded bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="p-5">
                    <UserTable
                        users={users}
                        loading={loading}
                    />
                </div>
            </div>
        </main>
    );
};

export default UserListing;