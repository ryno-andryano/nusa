import axios from "axios";
import useSWR from "swr";
import SortHeader from "./SortHeader";
import RowMenu from "./RowMenu";
import FormModal from "./FormModal.jsx";
import { useState } from "react";
import DeleteModal from "./DeleteModal.jsx";

function Menu() {
  const getMenuList = (url) => axios.get(url).then((res) => res.data);
  const { data, mutate } = useSWR("http://localhost:3000/menus", getMenuList);

  const [sortMenu, setSortMenu] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortDate, setSortDate] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCloseFormModal = () => setIsFormModalOpen(false);

  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleAddButtonClick = () => {
    setSelectedMenu({});
    setIsFormModalOpen(true);
  };

  const handleUpdateButtonClick = (menu) => {
    setSelectedMenu(menu);
    setIsFormModalOpen(true);
  };

  const handleDeleteButtonClick = (menu) => {
    setSelectedMenu(menu);
    setIsDeleteModalOpen(true);
  };

  const handleSortClick = (sortType) => () => {
    sortTransactions(sortType);

    if (sortType === "menu") {
      setSortMenu(!sortMenu);
      setSortCategory("");
      setSortPrice("");
      setSortDate("");
    } else if (sortType === "category") {
      setSortCategory(!sortCategory);
      setSortMenu("");
      setSortPrice("");
      setSortDate("");
    } else if (sortType === "price") {
      setSortPrice(!sortPrice);
      setSortMenu("");
      setSortCategory("");
      setSortDate("");
    } else if (sortType === "date") {
      setSortDate(!sortDate);
      setSortMenu("");
      setSortCategory("");
      setSortPrice("");
    }
  };

  const sortTransactions = (sortType) => {
    data.sort((a, b) => {
      if (sortType === "menu") {
        const menuAsc = a.name < b.name ? -1 : 1;
        const menuDesc = a.name > b.name ? -1 : 1;

        return sortMenu ? menuAsc : menuDesc;
      } else if (sortType === "category") {
        const categoryAsc = a.category < b.category ? -1 : 1;
        const categoryDesc = a.category > b.category ? -1 : 1;

        return sortCategory ? categoryAsc : categoryDesc;
      } else if (sortType === "date") {
        const dateA = new Date(a.lastModified);
        const dateB = new Date(b.lastModified);
        const latestDate = dateA - dateB;
        const oldestDate = dateB - dateA;

        return sortDate ? latestDate : oldestDate;
      } else if (sortType === "price") {
        const lowPrice = parseFloat(a.price) - parseFloat(b.price);
        const highPrice = parseFloat(b.price) - parseFloat(a.price);

        return sortPrice ? lowPrice : highPrice;
      }
    });
  };

  return (
    <>
      <section className="p-10 xl:px-20">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold uppercase">Menu List</h1>
          {/* Add Button */}
          <button
            className="mx-1 flex items-center rounded-md bg-[#FF2351] px-4 py-2 text-white hover:bg-[#e81e48]"
            onClick={handleAddButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mr-1 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            ADD
          </button>
        </div>

        <div className="mt-10 rounded-xl bg-white px-6 shadow">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <SortHeader
                  label="Menu"
                  sortType="menu"
                  sortDirection={sortMenu.toString()}
                  onClick={handleSortClick}
                />

                <SortHeader
                  label="Category"
                  sortType="category"
                  sortDirection={sortCategory.toString()}
                  onClick={handleSortClick}
                />

                <SortHeader
                  label="Price"
                  sortType="price"
                  sortDirection={sortPrice.toString()}
                  onClick={handleSortClick}
                />

                <SortHeader
                  label="LastModified"
                  sortType="date"
                  sortDirection={sortDate.toString()}
                  onClick={handleSortClick}
                />

                <td className="py-4 text-sm font-medium">Actions</td>
              </tr>
            </thead>

            <tbody className="bg-white lg:border-gray-300">
              {data?.map((menu) => (
                <RowMenu
                  key={menu.id}
                  menu={menu}
                  onUpdate={handleUpdateButtonClick}
                  onDelete={handleDeleteButtonClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FormModal
        onClose={handleCloseFormModal}
        isOpen={isFormModalOpen}
        menu={selectedMenu}
        mutate={mutate}
      />

      <DeleteModal
        onClose={handleCloseDeleteModal}
        isOpen={isDeleteModalOpen}
        menu={selectedMenu}
        mutate={mutate}
      />
    </>
  );
}

export default Menu;
