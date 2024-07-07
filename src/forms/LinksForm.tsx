// src/forms/LinksForm.tsx

// this page will render the form 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Link must be a valid URL").min(1, "Link is required"),
});

export type LinksFormData = z.infer<typeof formSchema>;

type LinksFormProps = {
  onSave: (data: LinksFormData) => void; // Function to call on save
  isLoading: boolean; // Whether the save process is loading
  title: string; // Title of the form dialog
  buttonText: string; // Text for the form button
  defaultValues?: Partial<LinksFormData>; // Default values for the form
};

const LinksForm = ({
  onSave,
  isLoading,
  title,
  buttonText,
  defaultValues,
}: LinksFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LinksFormData>({
    resolver: zodResolver(formSchema),
    defaultValues, // Set default values here
  });

  const onSubmit = (data: LinksFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Link
        </label>
        <input
          type="url"
          id="url"
          {...register("url")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.url && <p className="text-red-600">{errors.url.message}</p>}
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

export default LinksForm;
