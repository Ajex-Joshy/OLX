import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

const Sell = () => {
  const location = useLocation();
  const { isEdit = false, data = {} } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: isEdit
      ? {
          productName: data.productName,
          description: data.description,
          price: data.price,
        }
      : {},
  });
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userInfo);

  const onSubmit = async (formData) => {
    try {
      let imageUrl = formData.image[0];

      // If a new image is uploaded
      if (imageUrl) {
        const uploadData = new FormData();
        uploadData.append("file", imageUrl);
        uploadData.append("upload_preset", "olx app");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwgdzluej/image/upload",
          { method: "POST", body: uploadData }
        );
        const cloudData = await res.json();
        imageUrl = cloudData.secure_url;
      } else {
        // Keep existing image if editing
        imageUrl = isEdit ? data.imageUrl : null;
        if (!imageUrl) throw new Error("Image is required");
      }

      if (isEdit) {
        const productRef = doc(db, "products", data.id);
        await updateDoc(productRef, {
          productName: formData.productName,
          description: formData.description,
          price: Number(formData.price),
          imageUrl,
        });
        toast.success("Product updated successfully!", { duration: 2000 });
        setTimeout(() => navigate("/"), 2000);
      } else {
        await addDoc(collection(db, "products"), {
          productName: formData.productName,
          description: formData.description,
          price: Number(formData.price),
          imageUrl,
          createdAt: serverTimestamp(),
          uid: user.uid,
          isSold: false,
        });
        toast.success("Product uploaded successfully!", { duration: 2000 });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to save product. Please try again.");
    }
  };
  return (
    <div>
      <div id="toast-container">
        <Toaster />
      </div>
      <div>
        <h1 className="m-4 p-4 text-2xl text-white font-bold text-center">
          {isEdit
            ? "Update your product details"
            : "List Your Product for free!"}
        </h1>
      </div>
      <form
        action=""
        className="flex flex-col w-6/12 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mb-4">
          <label
            htmlFor="productName"
            className="mb-2 font-semibold text-gray-200"
          >
            Product Name
          </label>
          <input
            type="text"
            {...register("productName", {
              required: "Product name cannot be empty",
              minLength: {
                value: 3,
                message: "Product name must have 3 characters",
              },
              maxLength: {
                value: 25,
                message: "Product name must be less than 25 characters",
              },
            })}
            id="productName"
            className={`px-4 py-2 rounded-lg border  focus:outline-none  text-white placeholder-gray-400 ${
              errors.productName?.message ? "border-red-400" : "border-white"
            }`}
            placeholder="Enter product name"
            defaultValue={isEdit ? data.productName : ""}
          />
          {errors.productName && (
            <p className="m-2 text-red-400">{errors.productName?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="productName"
            className="mb-2 font-semibold text-gray-200"
          >
            Description
          </label>
          <textarea
            className={`px-4 py-2 rounded-lg border  focus:outline-none  text-white placeholder-gray-400 ${
              errors.description?.message ? "border-red-400" : "border-white"
            }`}
            {...register("description", {
              required: "Description cannot be empty",
              minLength: {
                value: 10,
                message: "Description must have 10 characters",
              },
              maxLength: {
                value: 150,
                message: "Description must be less than 150 characters",
              },
            })}
            id="description"
            placeholder="Enter product price"
            defaultValue={isEdit ? data.description : ""}
          ></textarea>
          {errors.description && (
            <p className="m-2 text-red-400">{errors.description?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="price" className="mb-2 font-semibold text-gray-200">
            Price
          </label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 1",
              },
            })}
            id="price"
            className={`px-4 py-2 rounded-lg border  focus:outline-none  text-white placeholder-gray-400 ${
              errors.price?.message ? "border-red-400" : "border-white"
            }`}
            placeholder="Enter product name"
            defaultValue={isEdit ? data.price : ""}
          />
          {errors.price && (
            <p className="m-2 text-red-400">{errors.price?.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="image" className="mb-2 font-semibold text-gray-200">
            Upload product image
          </label>
          <input
            className={`file-input file-input-info w-full rounded-lg border  focus:outline-none  text-white placeholder-gray-400 ${
              errors.image?.message ? "border-red-400" : "border-white"
            }`}
            type="file"
            accept="image/*"
            {...register("image", {
              required: isEdit ? false : "Image is required",
            })}
            id="image"
          />

          {errors.image && (
            <p className="m-2 text-red-400">{errors.image?.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <input
            className="bg-blue-600 px-6 py-2 rounded-md m-4 cursor-pointer"
            type="submit"
            value={isEdit ? "Update Product" : "Upload Product"}
          />
        </div>
      </form>
    </div>
  );
};

export default Sell;
