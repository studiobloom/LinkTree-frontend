// src/forms/ImageForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const formSchema = z.object({
  imageFile: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Image is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .gif formats are supported."
    )
    .transform((files) => files[0]),
});

export type ImageFormData = z.infer<typeof formSchema>;

type ImageFormProps = {
  onSave: (imageFormData: ImageFormData) => void;
  isLoading: boolean;
};

const ImageForm = ({ onSave, isLoading }: ImageFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: ImageFormData) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold">Update Avatar</h2>
     
      <div>
        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
           Upload Image
        </label>
        <input
          type="file"
          id="imageFile"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          {...register("imageFile")}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.imageFile && <p className="text-red-600">{errors.imageFile.message as string}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
      >
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
};

export default ImageForm;