// src/components/renderUserForm.tsx

import { Dialog, DialogContent } from './Dialog';
import UserForm, { UserNameData } from '../forms/addUserNameForm';

type AddUserNameProps = {
  onSave: (data: UserNameData) => void;
  isLoading: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  error: string | null;
};

const RenderUserForm = ({ onSave, isLoading, isOpen, onOpenChange, error }: AddUserNameProps) => {

  const handleOpenChange = (open: boolean) => {
    // if user try to close username popup form 
    if (!open) {
      alert("You must enter a username to continue.");
      return;
    }
    //else change teh state of open to close 
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50 p-4 rounded-md shadow-lg">
        <UserForm
          onSave={onSave}
          isLoading={isLoading}
          title='Enter User name'
          buttonText="Submit user name"
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RenderUserForm;
