import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

function FormModal({ isOpen, onClose, menu }) {
  const schema = yup.object().shape({
    name: yup.string().required("Required"),
    image: yup
      .string()
      .required("Required")
      .url("Url not valid")
      .matches("\\.(jpeg|jpg|png|webp)$", "Must be url of an image"),
    category: yup.string().required("Required"),
    price: yup
      .number()
      .typeError("Must be a number")
      .moreThan(0, "Must be more than 0"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const name = data.name
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
    const lastModified = new Date().toString();

    const payload = {
      ...data,
      name,
      lastModified,
    };

    axios
      .post("http://localhost:3000/menus", payload)
      .then(() => onClose())
      .catch((error) => {
        console.error("Cannot save changes:", error);
      });
  };

  return (
    <ReactModal
      overlayClassName="fixed inset-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      className="mx-4 w-full max-w-2xl p-0"
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldFocusAfterRender={false}
    >
      <div className="relative w-full rounded-lg bg-white px-6 py-10 shadow md:px-16">
        <form
          className="mt-16"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          spellCheck={false}
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <input
                {...register("name")}
                autoFocus={!menu}
                type="text"
                id="name"
                className="w-full rounded-md focus:border-[#FF2351] focus:ring-[#FF2351]"
              />
            </div>

            <div className="col-span-2">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="image" className="font-medium">
                  Image URL
                </label>
                {errors.image && (
                  <span className="text-sm text-red-500">
                    {errors.image.message}
                  </span>
                )}
              </div>
              <input
                {...register("image")}
                type="text"
                id="image"
                className="w-full rounded-md focus:border-[#FF2351] focus:ring-[#FF2351]"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                {errors.category && (
                  <span className="text-sm text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <input
                {...register("category")}
                type="text"
                id="category"
                className="w-full rounded-md focus:border-[#FF2351] focus:ring-[#FF2351]"
                list="categories"
              />
              <datalist id="categories">
                <option value="Appetizer" />
                <option value="Seafood" />
                <option value="Rice & Noodle" />
                <option value="Meat" />
                <option value="Vegetables" />
                <option value="Dessert" />
              </datalist>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                {errors.price && (
                  <span className="text-sm text-red-500">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <input
                {...register("price")}
                type="number"
                id="price"
                className="w-full rounded-md focus:border-[#FF2351] focus:ring-[#FF2351]"
              />
            </div>
          </div>

          <div className="mt-12 flex justify-end gap-3">
            <button
              className="rounded-lg border border-black bg-white px-5 py-2 text-center uppercase transition-colors hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>

            <button
              className="rounded-lg border border-[#FF2351] bg-[#FF2351] px-5 py-2 text-center uppercase text-white transition-colors hover:bg-[#e81e48]"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>

        <div className="absolute left-0 right-0 top-0 flex items-center justify-between rounded-t-lg bg-[#FF2351] px-6 py-4 text-white md:px-16">
          <h1 className="text-2xl font-semibold">
            {menu ? "Update" : "Add New"} Menu
          </h1>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle-fill h-5 w-5"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

FormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menu: PropTypes.object,
};

export default FormModal;
