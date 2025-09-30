import React, { useState, useRef } from 'react';
import { 
  PencilIcon, 
  PlusIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon,
  PhotoIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import { teamMemberService, TeamMember } from '../lib/supabase';

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
    image_url: '',
    description: '',
    order_index: 0
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditForm({ ...teamMembers[index] });
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      // Generate a temporary ID for new members
      const memberId = editForm.id || `temp-${Date.now()}`;
      const imageUrl = await teamMemberService.uploadImage(file, memberId);
      
      setEditForm(prev => ({ ...prev, image_url: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSave = async () => {
    if (editingIndex === null) return;

    setIsSaving(true);
    try {
      let updatedMember: TeamMember;

      if (editForm.id) {
        // Update existing member
        updatedMember = await teamMemberService.update(editForm.id, editForm);
      } else {
        // Create new member
        updatedMember = await teamMemberService.create({
          ...editForm,
          order_index: teamMembers.length + 1
        });
      }

      // Update local state
      const updatedMembers = [...teamMembers];
      updatedMembers[editingIndex] = updatedMember;
      onUpdateTeam(updatedMembers);
      
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Failed to save team member. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditForm({
      name: '',
      role: '',
      credentials: '',
      image_url: '',
      description: '',
      order_index: 0
    });
  };

  const handleAdd = () => {
    const newMember: TeamMember = {
      name: 'New Team Member',
      role: 'Position Title',
      credentials: 'Credentials',
      image_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      description: 'Brief description of the team member.',
      order_index: teamMembers.length + 1
    };
    
    const updatedMembers = [...teamMembers, newMember];
    onUpdateTeam(updatedMembers);
    setEditingIndex(updatedMembers.length - 1);
    setEditForm(newMember);
  };

  const handleDelete = async (index: number) => {
    const member = teamMembers[index];
    
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) {
      return;
    }

    try {
      if (member.id) {
        // Delete from database
        await teamMemberService.delete(member.id);
        
        // Delete associated image if it's stored in Supabase
        if (member.image_url) {
          await teamMemberService.deleteImage(member.image_url);
        }
      }

      // Update local state
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      onUpdateTeam(updatedMembers);
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('Failed to delete team member. Please try again.');
    }
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={onToggleAdmin}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
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
          <div key={member.id || index} className="group text-center relative">
            {/* Admin Controls */}
            {isAdminMode && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-10">
                <button
                  onClick={() => handleEdit(index)}
                  className="p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                  title="Edit team member"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 shadow-lg"
                  title="Delete team member"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            )}

            {editingIndex === index ? (
              /* Edit Form */
              <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-blue-500">
                <div className="space-y-4">
                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={editForm.image_url}
                        alt="Preview"
                        className="w-32 h-32 mx-auto rounded-xl object-cover border-2 border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                        }}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                          <CloudArrowUpIcon className="h-8 w-8 text-white animate-pulse" />
                        </div>
                      )}
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <PhotoIcon className="h-4 w-4" />
                      <span>{isUploading ? 'Uploading...' : 'Change Photo'}</span>
                    </button>
                  </div>

                  {/* Form Fields */}
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full Name"
                  />
                  
                  <input
                    type="text"
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job Title"
                  />
                  
                  <input
                    type="text"
                    value={editForm.credentials}
                    onChange={(e) => setEditForm({ ...editForm, credentials: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Credentials"
                  />
                  
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Brief description and expertise"
                  />
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving || isUploading}
                      className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckIcon className="h-4 w-4" />
                      <span>{isSaving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Display Mode */
              <>
                <div className="relative mb-4">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-48 h-48 mx-auto rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
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
              className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center group"
            >
              <PlusIcon className="h-12 w-12 text-gray-400 group-hover:text-blue-500 mb-2 transition-colors duration-300" />
              <span className="text-gray-500 group-hover:text-blue-600 font-medium transition-colors duration-300">
                Add Team Member
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {(isSaving || isUploading) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-700">
                {isUploading ? 'Uploading image...' : 'Saving changes...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTeamEditor;