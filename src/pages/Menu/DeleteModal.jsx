import Modal from "react-modal";
import PropTypes from "prop-types";
import axios from "axios";

function DeleteModal({ isOpen, onClose, menu, mutate }) {
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3000/menus/${menu.id}`)
      .then(() => {
        onClose();
        mutate();
      })
      .catch((error) => {
        console.error("Cannot save changes:", error);
      });
  };

  return (
    <Modal
      overlayClassName="fixed inset-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      className="mx-4 w-full max-w-2xl p-0"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Delete Confirmation Modal"
    >
      <div className="relative w-full rounded-lg bg-white px-6 py-10 shadow md:px-16">
        <div className="mt-16">
          <p className="mb-6 text-2xl">
            Are you sure you want to delete
            <span className="font-semibold"> {menu.name} </span>from the menu
            list?
          </p>

          <div className="mt-12 flex justify-end gap-3">
            <button
              className="w-24 rounded-lg border border-black bg-white py-2 text-center uppercase transition-colors hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              No
            </button>

            <button
              className="w-24 rounded-lg border border-[#FF2351] bg-[#FF2351] py-2 text-center uppercase text-white transition-colors hover:bg-[#e81e48]"
              type="submit"
              onClick={handleConfirmDelete}
            >
              Yes
            </button>
          </div>
        </div>

        <div className="absolute left-0 right-0 top-0 flex items-center justify-between rounded-t-lg bg-[#FF2351] px-6 py-4 text-white md:px-16">
          <h1 className="text-2xl font-semibold">Delete Menu</h1>
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
    </Modal>
  );
}

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default DeleteModal;
