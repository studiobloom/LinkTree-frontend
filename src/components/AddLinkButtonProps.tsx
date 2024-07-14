// src/components/AddLinkButton.tsx
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './Dialog';
import LinksForm, { LinksFormData } from '../forms/LinksForm';

type AddLinkButtonProps = {
  onSave: (data: LinksFormData) => Promise<void>;
  disabled: boolean;
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const AddLinkButton = ({ onSave, disabled, isLoading, isOpen, onOpenChange }: AddLinkButtonProps) => {
  const handleSave = async (data: LinksFormData) => {
    await onSave(data);
  };
 
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button 
          disabled={disabled} 
          className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition duration-200 mb-4"
        >
          Add Link
        </button>
      </DialogTrigger>
      {/* this is the add link form the pop up style */}
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 p-4 rounded-md shadow-lg">
        <LinksForm
          onSave={handleSave}
          isLoading={isLoading}
          title="Add New Link"
          buttonText="Add Link"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddLinkButton;