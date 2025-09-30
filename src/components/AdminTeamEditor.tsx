import React, { useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  image: string;
  description: string;
}

interface AdminTeamEditorProps {
  teamMembers: TeamMember[];
  onUpdateTeam: (members: TeamMember[]) => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
}

const AdminTeamEditor: React.FC<AdminTeamEditorProps> = ({
  teamMembers,
  onUpdateTeam,
  isAdminMode,
  onToggleAdmin
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<TeamMember>({
    name: '',
    role: '',
    credentials: '',
    image: '',
    description: ''
  });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...teamMembers[index] });
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = editForm;
      onUpdateTeam(updatedMembers);
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm({
      name: '',
      role: '',
      credentials: '',
      image: '',
      description: ''
    });
  };

  const handleAdd = () => {
    const newMember: TeamMember = {
      name: 'New Team Member',
      role: 'Position Title',
      credentials: 'Credentials',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Brief description of the team member.'
    };
    onUpdateTeam([...teamMembers, newMember]);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      onUpdateTeam(updatedMembers);
    }
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={onToggleAdmin}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
            isAdminMode
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isAdminMode ? 'Exit Admin' : 'Admin Mode'}
        </button>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="group text-center relative">
            {/* Admin Controls */}
            {isAdminMode && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-10">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            {editingIndex === index ? (
              /* Edit Form */
              <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Role"
                  />
                  <input
                    type="text"
                    value={editForm.credentials}
                    onChange={(e) => setEditForm({ ...editForm, credentials: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Credentials"
                  />
                  <input
                    type="url"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Image URL"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm resize-none"
                    rows={3}
                    placeholder="Description"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <CheckIcon className="h-4 w-4 mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Display Mode */
              <>
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 mx-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  {member.credentials}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </>
            )}
          </div>
        ))}

        {/* Add New Member Button */}
        {isAdminMode && (
          <div className="group text-center flex items-center justify-center">
            <button
              onClick={handleAdd}
              className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <PlusIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mb-2" />
              <span className="text-gray-500 group-hover:text-blue-600 font-medium">
                Add Team Member
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminTeamEditor;