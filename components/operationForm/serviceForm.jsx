"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import {
  createService,
  updateService,
} from "@/actions/operation/serviceActions";

const schema = z.object({
  image: z.any().optional(), // Image optional
  type: z.string().nonempty("Type is required!"),
  priority: z.string().nonempty("Priority is required!"),
  product_id: z.number().positive("Product ID must be a positive number!"),
  product_name: z.string().nonempty("Product Name is required!"),
  order_no: z.number().positive("Order No must be a positive number!"),
  client_id: z.number().positive("Client ID must be a positive number!"),
  amc: z.string().nonempty("AMC is required!"),
  sale_date: z
    .preprocess(
      (value) => (value ? new Date(value) : undefined),
      z.date().or(z.undefined())
    )
    .refine((val) => !!val, { message: "Delivery Challan Date is required!" }),
  client_name: z.string().nonempty("Client Name is required!"),
  service_head: z.string().nonempty("Service Head is required!"),
  service_staff: z.string().nonempty("Service Staff is required!"),
  service_receive_data: z
    .preprocess(
      (value) => (value ? new Date(value) : undefined),
      z.date().or(z.undefined())
    )
    .refine((val) => !!val, { message: "Delivery Challan Date is required!" }),
  start_date_time: z
    .preprocess(
      (value) => (value ? new Date(value) : undefined),
      z.date().or(z.undefined())
    )
    .refine((val) => !!val, { message: "Delivery Challan Date is required!" }),
  end_date_time: z
    .preprocess(
      (value) => (value ? new Date(value) : undefined),
      z.date().or(z.undefined())
    )
    .refine((val) => !!val, { message: "Delivery Challan Date is required!" }),
  task_duration: z.string().nonempty("Task Duration is required!"),
  expense: z.number().positive("Expense must be a positive number!"),
});

const ServiceForm = ({ type, data }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(data?.image || null);
  const [tempImg, setTempImg] = useState(null);
  const [img, setImg] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const [state, formAction] = useFormState(
    type === "create" ? createService : updateService,
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
    setImg(result.info); // Save the uploaded image info
    setImagePreview(result.info.secure_url); // Update the preview with the new image
  };

  const handleRemoveImage = () => {
    setImg(null);
    setImagePreview(data?.image || null);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(
        `Service ${type === "create" ? "created" : "updated"} successfully!`
      );
      router.push("/operation/service");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.message);
    }
  }, [state, router, type]);

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white w-full max-w-screen-2xl mx-auto p-4 shadow-md rounded-lg"
    >
      <div className="p-2   mb-6 gap-6 grid grid-cols-3">

        {/* Column 1: Basic Information */}
        <div className=" p-4 border rounded-lg shadow-lg w-full">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-medium mb-1 text-sm md:text-xs text-gray-700 mb-1">
              Upload Product Image
            </label>
            {imagePreview ? (
              <div className="relative">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={64}
                  height={64}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <span className="text-xs text-gray-500">
                <Image src="/upload.png" alt="Upload Icon" width={28} height={28} />
              </span>
            )}
            <CldUploadWidget uploadPreset="gurugoutam" onSuccess={handleImageUpload}>
              {({ open }) => (
                <button
                  type="button"
                  onClick={() => open()}
                  className="px-4 py-2 font-medium mb-1 text-sm md:text-xs text-white bg-blue-600 rounded-md shadow hover:bg-blue-700"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
            <p className="mt-2 text-xs text-gray-500">Supported formats: JPG, PNG (max size: 2MB)</p>
          </div>
          {/* Product ID */}
          <div className="mb-4">
            <label className="font-medium mb-1 text-sm md:text-xs">Product ID</label>
            <Input
              type="number"
              {...register("product_id", { valueAsNumber: true })}
              placeholder="Enter Product ID"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.product_id && <p className="text-red-500 text-xs">{errors.product_id.message}</p>}
          </div>
          {/* Product Name */}
          <div className="mb-4">
            <label className="font-medium mb-1 text-sm md:text-xs">Product Name</label>
            <Input
              {...register("product_name")}
              placeholder="Enter Product Name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.product_name && <p className="text-red-500 text-xs">{errors.product_name.message}</p>}
          </div>
        </div>

        {/* Column 2: Additional Details */}
        <div className="bg-white p-2 border rounded-lg shadow-lg w-[370px] ">
          <h3 className="text-lg font-semibold mb-2 ">Additional Details</h3>
          <div className=" p-2 grid grid-cols-2 gap-4 ">
            {/* Type */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Type</label>
              <Input
                {...register("type")}
                placeholder="Enter Type"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
            </div>
            {/* Priority */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Priority</label>
              <Input
                {...register("priority")}
                placeholder="Enter Priority"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.priority && <p className="text-red-500 text-xs">{errors.priority.message}</p>}
            </div>
            {/* Order No */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Order No</label>
              <Input
                type="number"
                {...register("order_no", { valueAsNumber: true })}
                placeholder="Enter Order No"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.order_no && <p className="text-red-500 text-xs">{errors.order_no.message}</p>}
            </div>
            {/* Client ID */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Client ID</label>
              <Input
                type="number"
                {...register("client_id", { valueAsNumber: true })}
                placeholder="Enter Client ID"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.client_id && <p className="text-red-500 text-xs">{errors.client_id.message}</p>}
            </div>

            {/* Service Staff */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Service Staff</label>
              <Input
                {...register("service_staff")}
                placeholder="Enter Service Staff"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.service_staff && <p className="text-red-500 text-xs">{errors.service_staff.message}</p>}
            </div>
            {/* Start Date & Time */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Start Date & Time</label>
              <Input
                type="date"
                {...register("start_date_time")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.start_date_time && <p className="text-red-500 text-xs">{errors.start_date_time.message}</p>}
            </div>
            {/* End Date & Time */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">End Date & Time</label>
              <Input
                type="date"
                {...register("end_date_time")}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.end_date_time && <p className="text-red-500 text-xs">{errors.end_date_time.message}</p>}
            </div>
            {/* Task Duration */}
            <div className="mb-4">
              <label className="font-medium mb-1 text-sm md:text-xs">Task Duration</label>
              <Input
                {...register("task_duration")}
                placeholder="Enter Task Duration"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {errors.task_duration && <p className="text-red-500 text-xs">{errors.task_duration.message}</p>}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 border rounded-lg shadow w-52 h-60 items ml-20	">
          <h3 className="text-lg font-semibold mb-4">Control:</h3>
          <label className="flex items-center gap-2">
            <span>Active Status</span>
            <input type="checkbox" {...register("activeStatus")} />
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/operation/service")}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
