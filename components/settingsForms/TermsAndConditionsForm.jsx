"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { createTerm, updateTerm } from "@/actions/termsandConditionsActions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

// Schema for validation
const schema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(5, { message: "Description must be at least 5 characters long!" }),
  effective_date: z.string().optional(),
  active_status: z.boolean().default(true),
});

const TermsAndConditionsForm = ({ type, data }) => {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  const router = useRouter();

  const [state, formAction] = useFormState(
    type === "create" ? createTerm : updateTerm,
    {
      success: false,
      error: false,
      message: "",
    }
  );

  // Reset form data on edit mode
  useEffect(() => {
    if (data) {
      reset({
        ...data,
        effective_date: data.effective_date ? new Date(data.effective_date).toISOString().split("T")[0] : "",
      });
    }
  }, [data, reset]);

  const onSubmit = handleSubmit((formData) => {
    try {
      formAction({ ...formData, id: data?._id });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  });

  useEffect(() => {
    if (state.success) {
      toast(`Term ${type === "create" ? "created" : "updated"} successfully!`);
      router.push("/settings/terms");
    } else if (state.error) {
      setError(state.message);
    }
  }, [state, router, type]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{type === "create" ? "Create a New Term" : "Edit Term"}</h1>

      <div className="flex flex-col gap-4">
        <InputField label="Title" name="title" register={register} error={errors.title} />
        <InputField label="Description" name="description" register={register} error={errors.description} />
        <InputField label="Effective Date" name="effective_date" type="date" register={register} error={errors.effective_date} />
      </div>

      {error && <span className="text-red-500">{error}</span>}

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => router.push("/settings/terms")}>
          Cancel
        </Button>
        <Button className="bg-blue-400 text-white p-2 rounded-md" type="submit">
          {type === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default TermsAndConditionsForm;
