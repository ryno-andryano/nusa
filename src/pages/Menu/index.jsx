import { useState } from "react";
import FormModal from "./FormModal.jsx";

function Index() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState({});

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedMenu({});
  };

  return (
    <>
      <FormModal
        onClose={handleCloseFormModal}
        isOpen={isFormModalOpen}
        menu={selectedMenu}
      />
    </>
  );
}

export default Index;
