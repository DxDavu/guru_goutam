// @/components/settingsForms/FormModal.jsx

'use client'
import { deleteUser } from '@/actions/userActions';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

const deleteActionMap = {
  Users: deleteUser,
}


const UsersForm = dynamic(() => import("@/components/settingsForms/UsersForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms = {
  Users: (type,data,rolesOptions, departmentsOptions, branchesOptions,setOpen) => (
    <UsersForm 
      type={type}
      data={data}
      setOpen={setOpen}
      rolesOptions={rolesOptions} 
      departmentsOptions={departmentsOptions} 
      branchesOptions={branchesOptions} 
    />
  ),
};

const FormModal = ({ table, type, data, id, rolesOptions = [], departmentsOptions = [], branchesOptions = [] }) => {
  const parsedData = data ? JSON.parse(data) : null;

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {

    const [state, formAction] = useFormState(deleteActionMap[table],{success: false, error:false});

    const router = useRouter();

    useEffect(() => {

      console.log('==formmodal useeffect state====');
      console.log(state);
      console.log('==formmodal useeffect state=====');

      if(state.success) {

        toast('User has been deleted');
        setOpen(false);
        router.refresh();
      }
    },[state])



    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" defaultValue={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table} data?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, parsedData, rolesOptions, departmentsOptions, branchesOptions,setOpen)
    ) : (
      "Form not found!"
    );
  };
 
  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default FormModal;
