import { useState, useEffect } from 'react';
import { mockApi } from '../services/mockApi';

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const fetchedRoles = await mockApi.getRoles();
    setRoles(fetchedRoles);
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    await mockApi.addRole(newRole);
    setNewRole({ name: '', permissions: [] });
    fetchRoles();
  };

  const handleEditRole = async (e) => {
    e.preventDefault();
    if (editingRole) {
      await mockApi.updateRole(editingRole.id, editingRole);
      setEditingRole(null);
      fetchRoles();
    }
  };

  const handleDeleteRole = async (id) => {
    await mockApi.deleteRole(id);
    fetchRoles();
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">Role Management</h2>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Define and manage roles and their permissions.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <form onSubmit={handleAddRole} className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              type="text"
              id="name"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex-grow">
            <label htmlFor="permissions" className="block text-sm font-medium text-gray-700">Permissions (comma-separated)</label>
            <input
              type="text"
              id="permissions"
              value={newRole.permissions.join(',')}
              onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value.split(',').map(p => p.trim()) })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full md:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg
-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Role
          </button>
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.map((role) => (
              <tr key={role.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {role.permissions.map((permission, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2 mb-2">
                      {permission}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => setEditingRole(role)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button onClick={() => handleDeleteRole(role.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingRole && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Edit Role</h3>
            <form onSubmit={handleEditRole} className="space-y-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Role Name</label>
                <input
                  type="text"
                  id="edit-name"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="edit-permissions" className="block text-sm font-medium text-gray-700">Permissions (comma-separated)</label>
                <input
                  type="text"
                  id="edit-permissions"
                  value={editingRole.permissions.join(',')}
                  onChange={(e) => setEditingRole({ ...editingRole, permissions: e.target.value.split(',').map(p => p.trim()) })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setEditingRole(null)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

export default RoleManagement;

