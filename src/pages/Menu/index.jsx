import { useState } from "react";
import FormModal from "./FormModal.jsx";

function Index() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(true);

  const handleCloseFormModal = () => setIsFormModalOpen(false);

  return (
    <>
      <FormModal onClose={handleCloseFormModal} isOpen={isFormModalOpen} />
    </>
  );
}

export default Index;
