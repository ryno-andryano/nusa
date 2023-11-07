import { useState } from "react";
import Modal from "react-modal";

function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Product Page</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Delete Confirmation</button>

      {/* Modal menggunakan ReactModal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation Modal"
      >
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete this product?</p>
        <button onClick={closeModal}>No</button>
        <button onClick={closeModal}>Yes</button>
      </Modal>
    </div>
  );
}

export default ProductPage;
