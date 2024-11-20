"use client";

import { useForm, useFormState } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { createContact, updateContact } from "@/actions/crm/contactActions";

const schema = z.object({
  name: z.string().nonempty("Name is required!"),
  email: z.string().email("Invalid email!").nonempty("Email is required!"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be 10 digits!")
    .nonempty("Phone is required!"),
  image: z.any().optional(),
  notes: z.string().optional(),
});

const ContactForm = ({ type, data }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(data?.image || null);
  const [img, setImg] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [state, formAction] = useFormState(
    type === "create" ? createContact : updateContact,
    { success: false, error: false, message: "" }
  );

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const plainData = {
        ...formData,
        image: img?.secure_url || data?.image,
        id: data?._id,
      };

      await formAction(plainData);
    } catch (error) {
      console.error(error.message || "An unexpected error occurred.");
      toast.error(error.message || "An unexpected error occurred.");
    }
  });

  const handleImageUpload = (result) => {
    setImg(result.info);
    setImagePreview(result.info.secure_url);
  };

  const handleRemoveImage = () => {
    setImg(null);
    setImagePreview(data?.image || null);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(
        `Contact ${type === "create" ? "created" : "updated"} successfully!`
      );
      router.push("/crm/contacts");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-screen-2xl mx-auto p-8 bg-white shadow-md rounded-lg"
    >
      <div className="bg-gray-200 p-6 border rounded-lg shadow-lg mb-6 flex gap-9">
        {/* Contact Details */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>

          <div className="mb-4">
            <label className="text-sm font-medium">Name</label>
            <Input
              {...register("name")}
              placeholder="Enter Name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register("email")}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Phone</label>
            <Input
              {...register("phone")}
              placeholder="Enter Phone"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Current Image</label>
            {imagePreview && (
              <div className="mb-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Upload New Image</label>
            <CldUploadWidget
              uploadPreset="contactUploads"
              onSuccess={handleImageUpload}
            >
              {({ open }) => (
                <div
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                  onClick={() => open()}
                >
                  <img
                    src="/upload.png"
                    alt="Upload Icon"
                    width={28}
                    height={28}
                  />
                  <span>Click Here</span>
                </div>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-4">Notes</h3>
          <textarea
            {...register("notes")}
            placeholder="Enter Notes"
            rows="10"
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-center mt-5 gap-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="w-[500px] h-[42px] px-4 py-2 border rounded-tl-lg rounded-br-lg border-opacity-0"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-[500px] h-[42px] px-4 py-2 bg-blue-500 text-white rounded-tl-lg rounded-br-lg border-opacity-0"
        >
          {state.loading
            ? "Submitting..."
            : type === "create"
            ? "Create"
            : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
