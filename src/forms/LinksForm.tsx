// src/forms/LinksForm.tsx

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/Button";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  link: z.string().url("Link must be a valid URL").min(1, "Link is required"),
});

export type LinksFormData = z.infer<typeof formSchema>;

type LinksFormProps = {
  //onSave` is a callback function
  //when the form is submitted this whill be called
  //accept one arg and the type is LinksFormData
  onSave: (data: LinksFormData) => void; // Function to call on save
  isLoading: boolean; // Whether the save process is loading
  title: string; // Title of the form dialog
  buttonText: string; // Text for the form button
};

const LinksForm = ({
  onSave,
  isLoading,
  title,
  buttonText,
}: LinksFormProps) => {
  const {
    //function used to register input fields with react-hook-form. You'll use this on your input elements.
    //handleSubmit  also from react-hook-form
    register,
    handleSubmit,
    //formState is an object returned by useForm, and we're extracting the errors property from it
    formState: { errors },
  } = useForm<LinksFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: LinksFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>


      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          //register function is used to register an input with react-hook-form
          //...register destruct the register
          //and get the name field
          {...register("name")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>

      

      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <input
          type="url"
          id="link"
          {...register("link")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.link && <p className="text-red-600">{errors.link.message}</p>}
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
