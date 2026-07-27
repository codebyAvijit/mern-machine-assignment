import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../api/user.api";
import { getStates } from "../../api/state.api";

import UserTable from "./UserTable";
import UserFilters from "./UserFilters";

const INITIAL_FILTERS = {
    name: "",
    gender: "",
    stateId: "",
};

const UserListing = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [states, setStates] = useState([]);

    const [filters, setFilters] =
        useState(INITIAL_FILTERS);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Load States once
    useEffect(() => {
        const loadStates = async () => {
            try {
                const data = await getStates();
                setStates(data);
            } catch (error) {
                console.error(
                    "Failed to load states:",
                    error
                );
            }
        };

        loadStates();
    }, []);

    // Load users whenever filters/page changes
    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getUsers({
                    name: filters.name || undefined,
                    gender: filters.gender || undefined,
                    stateId: filters.stateId || undefined,
                    page: pagination.page,
                    limit: pagination.limit,
                });

                setUsers(response.data || []);

                setPagination((previous) => ({
                    ...previous,
                    ...response.pagination,
                }));
            } catch (error) {
                console.error(
                    "Failed to load users:",
                    error
                );

                setError("Unable to load users");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [
        filters.name,
        filters.gender,
        filters.stateId,
        pagination.page,
        pagination.limit,
    ]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));

        // Always return to page 1 after filtering
        setPagination((previous) => ({
            ...previous,
            page: 1,
        }));
    };

    const handleResetFilters = () => {
        setFilters(INITIAL_FILTERS);

        setPagination((previous) => ({
            ...previous,
            page: 1,
        }));
    };

    const handlePreviousPage = () => {
        setPagination((previous) => ({
            ...previous,
            page: Math.max(previous.page - 1, 1),
        }));
    };

    const handleNextPage = () => {
        setPagination((previous) => ({
            ...previous,
            page: Math.min(
                previous.page + 1,
                previous.totalPages
            ),
        }));
    };

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-7xl rounded-md bg-white shadow-md">

                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            User Listing
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {pagination.total} users found
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/register")
                        }
                        className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add User
                    </button>
                </div>

                {/* Filters */}
                <div className="border-b border-gray-200 p-5">
                    <UserFilters
                        filters={filters}
                        states={states}
                        onChange={
                            handleFilterChange
                        }
                        onReset={
                            handleResetFilters
                        }
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="mx-5 mt-5 rounded bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="p-5">
                    <UserTable
                        users={users}
                        loading={loading}
                    />
                </div>

                {/* Pagination */}
                {!loading &&
                    pagination.totalPages > 0 && (
                        <div className="flex flex-col gap-3 border-t border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-gray-600">
                                Page{" "}
                                {pagination.page} of{" "}
                                {pagination.totalPages}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={
                                        handlePreviousPage
                                    }
                                    disabled={
                                        pagination.page <= 1
                                    }
                                    className="rounded border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    onClick={
                                        handleNextPage
                                    }
                                    disabled={
                                        pagination.page >=
                                        pagination.totalPages
                                    }
                                    className="rounded border border-gray-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
            </div>
        </main>
    );
};

export default UserListing;