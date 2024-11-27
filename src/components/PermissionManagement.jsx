import { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';

function PermissionManagement() {
    const [permissions, setPermissions] = useState([]);
    const [newPermission, setNewPermission] = useState({ name: '', description: '' });
    const [editingPermission, setEditingPermission] = useState(null);

    useEffect(() => {
        fetchPermissions();
    }, []);

    const fetchPermissions = async () => {
        const fetchedPermissions = await mockApi.getPermissions();
        setPermissions(fetchedPermissions);
    };

    const handleAddPermission = async (e) => {
        e.preventDefault();
        await mockApi.addPermission(newPermission);
        setNewPermission({ name: '', description: '' });
        fetchPermissions();
    };

    const handleEditPermission = async (e) => {
        e.preventDefault();
        if (editingPermission) {
            await mockApi.updatePermission(editingPermission.id, editingPermission);
            setEditingPermission(null);
            fetchPermissions();
        }
    };

    const handleDeletePermission = async (id) => {
        await mockApi.deletePermission(id);
        fetchPermissions();
    };

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-xl font-semibold text-gray-900">Permission Management</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Create and manage permissions for fine-grained access control.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <form onSubmit={handleAddPermission} className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
                    <div className="flex-grow">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Permission Name</label>
                        <input
                            type="text"
                            id="name"
                            value={newPermission.name}
                            onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={newPermission.description}
                            onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add Permission
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {permissions.map((permission) => (
                            <tr key={permission.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{permission.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{permission.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => setEditingPermission(permission)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                    <button onClick={() => handleDeletePermission(permission.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingPermission && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-xl max-w-md w-full">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Permission</h3>
                        <form onSubmit={handleEditPermission} className="space-y-4">
                            <div>
                                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Permission Name</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    value={editingPermission.name}
                                    onChange={(e) => setEditingPermission({ ...editingPermission, name: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    id="edit-description"
                                    value={editingPermission.description}
                                    onChange={(e) => setEditingPermission({ ...editingPermission, description: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={() => setEditingPermission(null)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PermissionManagement;

