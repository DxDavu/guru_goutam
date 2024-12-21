// @/components/groupLibraryForms/GroupForm.jsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createGroup, updateGroup } from "@/actions/inventory/groupActions";
import axios from "axios";

const schema = z.object({
  group_name: z.string().nonempty("Group Name is required!"),
  description: z.string().optional(),
  product_qty: z.number().min(1, "Quantity must be at least 1").optional(),
  active_status: z.boolean().default(true),
});

const GroupForm = ({ type, data }) => {
  const router = useRouter();
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

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData, e) => {
    try {
      const file = e.target.image?.files[0];
      let filePath = "";

      // If there's a file, upload it first
      if (file) {
        const uploadData = new FormData();
        uploadData.append("image", file);

        const res = await axios.post("/api/upload", uploadData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        filePath = res.data.filePath;
      }

      // Call server action with file path
      if (type === "create") {
        await createGroup({ ...formData, group_image: filePath });
      } else {
        await updateGroup({
          ...formData,
          id: data?._id,
          group_image: filePath || data?.group_image,
        });
      }

      toast.success(
        `Group ${type === "create" ? "created" : "updated"} successfully!`
      );
      router.push("/inventory/group");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  });

  return (
    <form onSubmit={onSubmit}  className="w-full max-w-screen-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className=" flex bg-gray-200 p-6 border rounded-1g shadow-1g mb-6   gap-6 mt-5 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-6 w-full">
          <div className=" bg-gray-50 p-6 border rounde-dlg shadow-lg">
            <h3 className="font-semibold ">Product Details :</h3>
            <div className=" grid grid-cols-2 gap-4   bg-gray-50 p-6 border rounde-dlg  w-full">
              <div className="col-span-2">
                <label className="text-sm font-medium">Group Name</label>
                <Input
                  {...register("group_name")}
                  placeholder="Enter Group Name"
                />
                {errors.group_name && (
                  <p className="text-red-500 text-xs">
                    {errors.group_name.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  {...register("description")}
                  placeholder="Enter Description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className=" bg-gray-50 p-6 border rounde-dlg shadow-lg">
            <div>
              <label className="font-medium">Total Quantity:</label>
              <Input
                {...register("product_qty", { valueAsNumber: true })}
                type="number"
                min="1"
                placeholder="Total Quantity"
                className="w-full mb-10"
              />
            </div>

            <div className="mt-4 lg:mt-0 w-full lg:w-auto">
        <div className="bg-gray-50 p-6 border rounded-lg shadow-lg">
          <h1 className="font-extrabold">Control</h1>
          <label className="font-medium">Active Status:</label>
          <input
            type="checkbox"
            checked={watch("active_status")}
            className="mt-5"
            onChange={(e) => setValue("active_status", e.target.checked)}
          />
        </div>
      </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex justify-end">
        <Button
          variant="outline"
          onClick={() => router.push("/inventory/group")}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-500 text-white mx-2">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
