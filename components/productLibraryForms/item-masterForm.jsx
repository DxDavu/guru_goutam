

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { z } from "zod";
// import { useFormState } from "react-dom"; // Importing useFormState
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { createItemMaster, getActiveProductCategories, getItemsByCategory, updateItemMaster } from "@/actions/productLibrary/item-masterActions";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// // Schema validation using Zod
// const schema = z.object({
//   item_name: z.string().min(1, { message: "Item Name is required!" }),
//   category: z.string().nonempty("Category is required!"),
//   item: z.string().nonempty("Item is required!"),
//   description: z.string().optional(),
//   active_status: z.boolean().default(true),
// });

// const ItemMasterForm = ({ type, data }) => {
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);

//   // Initialize useForm with default values
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: data || { item_name: "", category: "", item: "", description: "", active_status: true }, // Set defaults if data is not available
//   });

//   const router = useRouter();

//   // Correctly setting up useFormState and checking the formAction
//   const [state, formAction] = useFormState(
//     type === "create" ? createItemMaster : updateItemMaster,
//     {
//       success: false,
//       error: false,
//       message: "",
//     }
//   );

//   // Fetch categories and data when the component is mounted
//   useEffect(() => {
//     async function fetchOptions() {
//       try {
//         const categoriesData = await getActiveProductCategories();
//         setCategories(categoriesData);

//         if (data) {
//           reset({
//             ...data,
//             category: data.category?._id || data.category || "", // Ensure category is correctly mapped
//             item: data.item?._id || data.item || "", // Ensure item is correctly mapped
//           });
//           setSelectedCategory(data.category?._id || data.category || "");
//         }
//       } catch (error) {
//         console.error("Error fetching options:", error.message || error);
//       }
//     }
//     fetchOptions();
//   }, [data, reset]); // Re-fetch when data changes

//   // Fetch items for the selected category
//   useEffect(() => {
//     async function fetchItems() {
//       if (selectedCategory) {
//         try {
//           // Mock data as per your request
//           const mockItemsData = [
//             {
//               _id: "1",
//               name: "Dell XPS 13",
//               type: "laptop",
//               price: "$1,199.99",
//               specifications: {
//                 processor: "Intel Core i7-1165G7",
//                 ram: "16 GB LPDDR4x",
//                 storage: "512 GB SSD",
//                 display: { size: "13.4 inches", resolution: "1920 x 1200" },
//                 graphics: "Intel Iris Xe Graphics",
//                 battery_life: "Up to 14 hours",
//               },
//               availability: "In stock",
//             },
//             {
//               _id: "2",
//               name: "HP Pavilion Desktop",
//               type: "desktop",
//               price: "$649.99",
//               specifications: {
//                 processor: "AMD Ryzen 5 3500",
//                 ram: "8 GB DDR4",
//                 storage: { type: "HDD", capacity: "1 TB" },
//                 graphics: { type: "NVIDIA GeForce GTX 1650", memory: "4 GB" },
//                 operating_system: "Windows 10 Home",
//               },
//               availability: "In stock",
//             },
//             {
//               _id: "3",
//               name: "LG UltraFine 5K Display",
//               type: "monitor",
//               price: "$1,299.99",
//               specifications: {
//                 size: "27 inches",
//                 resolution: "5120 x 2880",
//                 panel_type: "IPS",
//                 refresh_rate: 60,
//                 connectivity_ports: [
//                   { type: "Thunderbolt 3", count: 1 },
//                   { type: "USB-C", count: 3 },
//                 ],
//               },
//               availability: "Out of stock",
//             },
//           ];
//           setItems(mockItemsData);
//         } catch (error) {
//           console.error("Error fetching items:", error.message || error);
//         }
//       }
//     }
//     fetchItems();
//   }, [selectedCategory]);

//   // Handle form submission
//   const onSubmit = handleSubmit(async (formData) => {
//     // Ensure formAction is a function
//     if (typeof formAction === "function") {
//       try {
//         // Perform the form action with formData
//         await formAction({ ...formData, id: data?._id }); // Pass data._id if available
//       } catch (err) {
//         console.error("Error during form submission:", err);
//       }
//     } else {
//       console.error("formAction is not a function");
//     }
//   });

//   // Show success or error messages based on form submission state
//   useEffect(() => {
//     if (state.success) {
//       toast.success(`Item ${type === "create" ? "created" : "updated"} successfully!`);
//       router.push("/product-library/item-master");
//       router.refresh();
//     } else if (state.error) {
//       toast.error(state.message || "An error occurred.");
//     }
//   }, [state, router, type]);

//   return (
//     <form
//       className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg"
//       onSubmit={onSubmit}
//     >
//       <h1 className="text-xl font-semibold">
//         {type === "create" ? "Add item " : "Edit item "}
//       </h1>
//       <div className="bg-gray-200 p-2 px-6 border rounded-lg shadow-lg mb-6">

//         {/* Category Dropdown */}
//         <div className="mb-4 w-60">
//           <div>
//             <label className="text-sm font-medium">Product Category</label>
//           </div>
//           <Select
//             onValueChange={(value) => {
//               setValue("category", value);
//               setSelectedCategory(value); // Set selected category
//             }}
//             value={watch("category") || ""}
//           >
//             <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
//               <SelectValue placeholder="Select Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {categories.map((category) => (
//                   <SelectItem key={category._id} value={category._id.toString()}>
//                     {category.category_name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.category && (
//             <p className="text-red-500 text-xs">{errors.category.message}</p>
//           )}
//         </div>

//         {/* Item Dropdown */}
//         <div className="mb-4 w-60">
//           <div>
//             <label className="text-sm font-medium">Product Item</label>
//           </div>
//           <Select
//             onValueChange={(value) => {
//               setValue("item", value);
//               setSelectedItem(items.find(item => item._id === value)); // Set selected item details
//             }}
//             value={watch("item") || ""}
//             disabled={!selectedCategory} // Disable item dropdown if no category is selected
//           >
//             <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
//               <SelectValue placeholder="Select Item" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {items.map((item) => (
//                   <SelectItem key={item._id} value={item._id.toString()}>
//                     {item.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.item && (
//             <p className="text-red-500 text-xs">{errors.item.message}</p>
//           )}
//         </div>

//         {/* Display Selected Item Details */}
//         {selectedItem && (
//           <div className="mt-6 p-4 bg-gray-100 border rounded-md">
//             <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
//             <p><strong>Type:</strong> {selectedItem.type}</p>
//             <p><strong>Price:</strong> {selectedItem.price}</p>
//             <p><strong>Availability:</strong> {selectedItem.availability}</p>
//             <div>
//               <h3 className="font-medium mt-4">Specifications:</h3>
//               <ul>
//                 {Object.entries(selectedItem.specifications).map(([key, value]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row gap-6 ">
//           {/* Category Information Fields */}
//           <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
//             <div>
//               <label className="text-sm font-medium">Item Name</label>
//               <Input
//                 {...register("item_name")}
//                 placeholder="Enter Item Name"
//                 className="w-full max-w-xs border border-gray-300 rounded-md p-2"
//               />
//               {errors.item_name && (
//                 <p className="text-red-500 text-xs">{errors.item_name.message}</p>
//               )}

//               <label className="text-sm font-medium">Description</label>
//               <Input
//                 {...register("description")}
//                 placeholder="Enter Description"
//                 className="w-full max-w-xs border border-gray-300 rounded-md p-2"
//               />
//               {errors.description && (
//                 <p className="text-red-500 text-xs">{errors.description.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Active Status Section */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-80 h-28">
//             <h3 className="text-lg font-semibold mb-4">Control</h3>
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 checked={watch("active_status")}
//                 onCheckedChange={(checked) => setValue("active_status", checked)}
//               />
//               <label className="text-sm font-medium">Active Status</label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <Button variant="outline" onClick={() => router.push("/product-library/item-master")}>
//           Cancel
//         </Button>
//         <Button type="submit" className="bg-blue-500 text-white">
//           {type === "create" ? "Create" : "Update"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ItemMasterForm;




// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { createItemMaster, getActiveProductCategories, updateItemMaster } from "@/actions/productLibrary/item-masterActions";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";

// // Schema validation using Zod
// const schema = z.object({
//   item_name: z.string().min(1, { message: "Item Name is required!" }),
//   category: z.string().nonempty("Category is required!"),
//   item: z.string().nonempty("Item is required!"),
//   description: z.string().optional(),
//   active_status: z.boolean().default(true),
// });

// const ItemMasterForm = ({ type, data }) => {
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);  // Stores items for the selected category
//   const [selectedCategory, setSelectedCategory] = useState("");  // Currently selected category
//   const [selectedItem, setSelectedItem] = useState(null);  // Stores selected item details
//   const [formState, setFormState] = useState({ success: false, error: false, message: "" });  // Tracks form submission result

//   // Sample categories and items
//   const sampleCategories = [
//     { id: "1", name: "Laptops" },
//     { id: "2", name: "Desktops" },
//     { id: "3", name: "Monitors" }
//   ];

//   const sampleItems = {
//     "1": [  // Laptops
//       {
//         "type": "laptop",
//         "name": "Dell XPS 13",
//         "brand": "Dell",
//         "model": "XPS 13 9310",
//         "specifications": {
//           "processor": "Intel Core i7-1165G7",
//           "ram": "16 GB LPDDR4x",
//           "storage": "512 GB SSD",
//           "display": {
//             "size": "13.4 inches",
//             "resolution": "1920 x 1200"
//           },
//           "graphics": "Intel Iris Xe Graphics",
//           "battery_life": "Up to 14 hours"
//         },
//         "price": "$1,199.99",
//         "availability": "In stock"
//       },
//       {
//         "type": "laptop",
//         "name": "MacBook Pro",
//         "brand": "Apple",
//         "model": "MacBook Pro M1",
//         "specifications": {
//           "processor": "Apple M1 Chip",
//           "ram": "16 GB",
//           "storage": "1 TB SSD",
//           "display": {
//             "size": "13.3 inches",
//             "resolution": "2560 x 1600"
//           },
//           "graphics": "Apple Integrated Graphics",
//           "battery_life": "Up to 17 hours"
//         },
//         "price": "$1,499.99",
//         "availability": "In stock"
//       }
//     ],
//     "2": [  // Desktops
//       {
//         "type": "desktop",
//         "name": "HP Pavilion Desktop",
//         "brand": "HP",
//         "model": "TP01-0050",
//         "specifications": {
//           "processor": "AMD Ryzen 5 3500",
//           "ram": "8 GB DDR4",
//           "storage": {
//             "type": "HDD",
//             "capacity": "1 TB"
//           },
//           "graphics": {
//             "type": "NVIDIA GeForce GTX 1650",
//             "memory": "4 GB"
//           },
//           "operating_system": "Windows 10 Home"
//         },
//         "price": "$649.99",
//         "availability": "In stock"
//       }
//     ],
//     "3": [  // Monitors
//       {
//         "type": "monitor",
//         "name": "LG UltraFine 5K Display",
//         "brand": "LG",
//         "model": "27MD5KL-B",
//         "specifications": {
//           "size": "27 inches",
//           "resolution": "5120 x 2880",
//           "panel_type": "IPS",
//           "refresh_rate": 60,
//           "connectivity_ports": [
//             { "type": "Thunderbolt 3", "count": 1 },
//             { "type": "USB-C", "count": 3 }
//           ]
//         },
//         "price": "$1,299.99",
//         "availability": "Out of stock"
//       }
//     ]
//   };

//   // Initialize useForm with default values
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       item_name: data?.item_name || "", // Ensure default value is set
//       category: data?.category?._id || "", // Ensure default value is set
//       item: data?.item?._id || "", // Ensure default value is set
//       description: data?.description || "", // Ensure default value is set
//       active_status: data?.active_status || true, // Ensure default value is set
//     }, 
//   });

//   const router = useRouter();

//   // Fetch categories and data when the component is mounted
//   useEffect(() => {
//     // Mock categories fetch
//     setCategories(sampleCategories);

//     if (data) {
//       reset({
//         ...data,
//         category: data.category?._id || data.category || "", // Ensure category is correctly mapped
//         item: data.item?._id || data.item || "", // Ensure item is correctly mapped
//       });
//       setSelectedCategory(data.category?._id || data.category || "");
//     }
//   }, [data, reset]); // Re-fetch when data changes

//   // Fetch items for the selected category
//   useEffect(() => {
//     if (selectedCategory) {
//       setItems(sampleItems[selectedCategory] || []);
//     } else {
//       setItems([]);
//     }
//   }, [selectedCategory]);

//   // Handle form submission
//   const onSubmit = handleSubmit(async (formData) => {
//     console.log("aaaaaaaaaaaa",formData);
    
//     setFormState({ ...formState, success: false, error: false });  // Reset form state before submission
//     try {
//       await (type === "create" ? createItemMaster : updateItemMaster)({ ...formData, id: data?._id });
//       setFormState({ success: true, error: false, message: `Item ${type === "create" ? "created" : "updated"} successfully!` });
//     } catch (err) {
//       setFormState({ success: false, error: true, message: err.message || "An error occurred." });
//     }
//   });

//   // Show success or error messages based on form submission state
//   useEffect(() => {
//     if (formState.success) {
//       toast.success(formState.message);
//       router.push("/product-library/item-master");
//       router.refresh();
//     } else if (formState.error) {
//       toast.error(formState.message);
//     }
//   }, [formState, router, type]);

//   return (
//     <form className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold">{type === "create" ? "Add item" : "Edit item"}</h1>
//       <div className="bg-gray-200 p-2 px-6 border rounded-lg shadow-lg mb-6">
//         {/* Category Dropdown */}
//         <div className="mb-4 w-60">
//           <label className="text-sm font-medium">Product Category</label>
//           <Select
//             onValueChange={(value) => {
//               setValue("category", value);
//               setSelectedCategory(value); // Set selected category
//             }}
//             value={watch("category") || ""}
//           >
//             <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
//               <SelectValue placeholder="Select Category" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {categories.map((category) => (
//                   <SelectItem key={category.id} value={category.id}>
//                     {category.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
//         </div>

//         {/* Product Item Dropdown */}
//         <div className="mb-4 w-60">
//           <label className="text-sm font-medium">Product Item</label>
//           <Select
//             onValueChange={(value) => {
//               setValue("item", value);
//               setSelectedItem(items.find(item => item.name === value)); // Set selected item details
//             }}
//             value={watch("item") || ""}
//             disabled={!selectedCategory} // Disable item dropdown if no category is selected
//           >
//             <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
//               <SelectValue placeholder="Select Item" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 {items.map((item) => (
//                   <SelectItem key={item.name} value={item.name}>
//                     {item.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.item && <p className="text-red-500 text-xs">{errors.item.message}</p>}
//         </div>

//         {/* Display Selected Item Details */}
//         {selectedItem && (
//           <div className="mt-6 p-4 bg-gray-100 border rounded-md">
//             <h2 className="text-lg font-semibold">{selectedItem.name}</h2>
//             <p><strong>Type:</strong> {selectedItem.type}</p>
//             <p><strong>Brand:</strong> {selectedItem.brand}</p>
//             <p><strong>Model:</strong> {selectedItem.model}</p>
//             <p><strong>Price:</strong> {selectedItem.price}</p>
//             <p><strong>Availability:</strong> {selectedItem.availability}</p>
//             <div>
//               <h3 className="font-medium mt-4">Specifications:</h3>
//               <ul>
//                 {Object.entries(selectedItem.specifications).map(([key, value]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Item Name and Description Fields */}
//         <div className="flex flex-col md:flex-row gap-6 ">
//           <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
//             <div>
//               <label className="text-sm font-medium">Item Name</label>
//               <Input
//                 {...register("item_name")}
//                 placeholder="Enter Item Name"
//                 className="w-full max-w-xs border border-gray-300 rounded-md p-2"
//               />
//               {errors.item_name && <p className="text-red-500 text-xs">{errors.item_name.message}</p>}

//               <label className="text-sm font-medium">Description</label>
//               <Input
//                 {...register("description")}
//                 placeholder="Enter Description"
//                 className="w-full max-w-xs border border-gray-300 rounded-md p-2"
//               />
//               {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
//             </div>
//           </div>

//           {/* Active Status Section */}
//           <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-80 h-28">
//             <h3 className="text-lg font-semibold mb-4">Control</h3>
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 id="active_status"
//                 {...register("active_status")}
//                 checked={watch("active_status")}
//               />
//               <label htmlFor="active_status">Active Status</label>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center gap-4">
//         <Button variant="outline" type="button" className="border">Cancel</Button>
//         <Button type="submit" className="bg-blue-600 text-white">Submit</Button>
//       </div>
//     </form>
//   );
// };

// export default ItemMasterForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  createItemVariant,
  updateItemVariant,
  getActiveProductCategories,
  getActiveItemMasters,
} from "@/actions/productLibrary/item-variantActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define schema for form validation
const schema = z.object({
  item_name: z.string().nonempty("Item Name is required!"),
  category: z.string().nonempty("Category is required!"),
  type: z.string().nonempty("Type is required!"),
  active_status: z.boolean().default(true),
});

const ItemVariantForm = ({ type, data }) => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [itemMasters, setItemMasters] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      item_name: data?.item_name || "",
      category: data?.category?._id || "",
      type: data?.type || "",
      active_status: data?.active_status ?? true,
    },
  });

  const { errors } = useFormState({
    control,
  });

  useEffect(() => {
    async function fetchOptions() {
      try {
        const [categoriesData, items] = await Promise.all([
          getActiveProductCategories(),
          getActiveItemMasters(),
        ]);
        setCategories(categoriesData);
        setItemMasters(items);

        if (data) {
          reset({
            ...data,
            category: data.category?._id || data.category || "",
          });
        }
      } catch (error) {
        console.error("Error fetching options:", error.message || error);
      }
    }
    fetchOptions();
  }, [data, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      if (type === "create") {
        await createItemVariant(formData);
        toast.success("Item Variant created successfully!");
      } else {
        await updateItemVariant({ ...formData, id: data?._id });
        toast.success("Item Variant updated successfully!");
      }
      router.push("/product-library/item-variant");
      router.refresh();
    } catch (error) {
      console.error("Error saving item variant:", error);
      toast.error(error.response?.data?.message || "Failed to save item variant.");
    }
  });

  return (
    <form
      className="w-full max-w-1xl mx-auto p-8 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add Item Variant" : "Edit Product Variant"}
      </h1>
      <div className="bg-gray-200 p-2 px-2 border rounded-lg shadow-lg mb-6">
        <div className="mb-4 w-60">
          <label className="text-sm font-medium">Product Category</label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            value={watch("category") || ""}
          >
            <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id.toString()}>
                    {category.category_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-500 text-xs">{errors.category.message}</p>
          )}
        </div>

        {/* Category Information and Active Status Side by Side */}
        <div className="flex flex-col md:flex-row gap-6 w-62">
          {/* Category Information Fields */}
          <div className="bg-gray-50 flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
            <div>
              <label className="text-sm font-medium">Item/Specification Name</label>
              <Select
                onValueChange={(value) => setValue("item_name", value)}
                value={watch("item_name") || ""}
              >
                <SelectTrigger className="w-full max-w-xs border border-gray-300 rounded-md p-2">
                  <SelectValue placeholder="Select Item Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {itemMasters.map((item) => (
                      <SelectItem key={item._id} value={item._id.toString()}>
                        {item.item_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.item_name && (
                <p className="text-red-500 text-xs">{errors.item_name.message}</p>
              )}

              <label className="text-sm font-medium">Type</label>
              <Input
                {...register("type")}
                placeholder="Enter Item Type"
                className="w-full max-w-xs border border-gray-300 rounded-md p-2"
              />
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
              )}
            </div>
          </div>

          {/* Active Status Section */}
          <div className="bg-gray-50 p-6 border rounded-lg shadow-lg w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Control</h3>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={watch("active_status")}
                onCheckedChange={(checked) => setValue("active_status", checked)}
              />
              <label className="text-sm font-medium">Active Status</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="outline"
          onClick={() => router.push("/product-library/item-variant")}
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

export default ItemVariantForm;

