// src/forms/BioForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const MAX_BIO_LENGTH = 160;

const formSchema = z.object({
  bio: z
    .string()
    .max(MAX_BIO_LENGTH, `Bio must be ${MAX_BIO_LENGTH} characters or less`)
    .refine((bio) => /^[a-zA-Z0-9 ,.!?'"-]+$/.test(bio), {
      message: "Bio contains invalid characters",
    }),
});

export type BioFormData = z.infer<typeof formSchema>;

type BioFormProps = {
  onSave: (bioFormData: BioFormData) => void;
  isLoading: boolean;
  defaultValue?: string;
};

const BioForm = ({ onSave, isLoading, defaultValue = '' }: BioFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BioFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { bio: defaultValue },
  });

  const bioLength = watch('bio')?.length || 0;

  const onSubmit = (data: BioFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Update Bio</h2>
     
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Your Bio
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md resize-none text-white bg-gray-600"
          rows={4}
          placeholder="Enter your bio"
        />
        <p className="text-sm text-gray-500 mt-1">
          {bioLength}/{MAX_BIO_LENGTH} characters
        </p>
        {errors.bio && <p className="text-red-600">{errors.bio.message}</p>}
      </div>
     
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
      >
        {isLoading ? 'Updating...' : 'Update Bio'}
      </button>
    </form>
  );
};

export default BioForm;