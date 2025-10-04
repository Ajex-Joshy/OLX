import { useForm } from "react-hook-form";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sell = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.userInfo);

  const onSubmit = async (data) => {
    try {
      const image = data.image[0];
      if (!image) return;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "olx app");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwgdzluej/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudData = await res.json();
      console.log("Cloudinary URL:", cloudData.secure_url);

      await addDoc(collection(db, "products"), {
        productName: data.productName,
        description: data.description,
        price: Number(data.price),
        imageUrl: cloudData.secure_url,
        createdAt: serverTimestamp(),
        uid: user.uid,
        isSold: false,
      });
      toast.success("Product uploaded successfully!", {
        duration: 2000,
        onClose: () => navigate("/"),
      });
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to upload product. Please try again.");
    }
  };
  return (
    <div>
      <div id="toast-container">
        <Toaster />
      </div>
      <div>
        <h1 className="m-4 p-4 text-2xl text-white font-bold text-center">
          List Your Product for free!
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
            {...register("image", { required: "Image is required" })}
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
            name=""
            id=""
          />
        </div>
      </form>
    </div>
  );
};

export default Sell;
