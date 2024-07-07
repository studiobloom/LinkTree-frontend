// src/forms/addUserNameForm.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";

const formSchema = z.object({
  username: z.string().min(1, "Name is required")
});

export type UserNameData = z.infer<typeof formSchema>;

type UserNameFormProps = {
  onSave: (data: UserNameData) => void;
  isLoading: boolean;
  title: string;
  buttonText: string;
  error: string | null;
};

const UserNameForm = ({ onSave, isLoading, title, buttonText, error }: UserNameFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserNameData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: UserNameData) => {

    // Convert username to lowercase before proceeding
    const lowercasedData = { ...data, username: data.username.toLowerCase() };
    onSave(lowercasedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          {...register("username")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default UserNameForm;
