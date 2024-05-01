import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModifyModal from "./ModifyModal";

const Table = (props) => {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const itemsPerPage = 5;
  const data = props.formdata || [];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const modifyItem = (modifiedItem) => {
    // Find the index of the item to be modified
    const index = props.formdata.findIndex(
      (item) => item.name === modifiedItem.name
    );

    if (index === -1) {
      console.error("Item not found in form data.");
      return;
    }

    // Create a new array with the updated item at the found index
    const updatedFormData = [
      ...props.formdata.slice(0, index), // Items before the modified item
      modifiedItem, // Updated item
      ...props.formdata.slice(index + 1), // Items after the modified item
    ];

    // Update the state with the new array of form data
    props.setFormdata(updatedFormData);

    // Close the modal
    setShowModal(false);
  };

  const handleModify = (item) => {
    console.log("Modify item:", item);
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updatedData = data.filter((item) => item.name !== name);

      props.setFormdata(updatedData);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const keys = Object.keys(data[0] || {});
  const renderData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex).map((item, index) => (
      <tr key={startIndex + index}>
        {keys.map((key) => (
          <td key={key}>
            {key === "ProfilePic" ? (
              <img
                src={item[key]}
                alt="Profile"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            ) : (
              item[key]
            )}
          </td>
        ))}
        <td>
          <button onClick={() => handleModify(item)}>Modify</button>
          <button onClick={() => handleDelete(item.name)}>Delete</button>
        </td>
      </tr>
    ));
  };

  const showModifyColumn = keys.length > 0;

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}

            {showModifyColumn && <th>Modify</th>}
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      {data.length > itemsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 0}>
            Previous
          </button>
          <span>
            {currentPage + 1} / {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
            Next
          </button>
        </div>
      )}
      <Link to="/profile">
        <button>Profile</button>
      </Link>
      {showModal && (
        <ModifyModal
          item={selectedItem}
          closeModal={() => setShowModal(false)}
          modifyItem={modifyItem}
        />
      )}
    </div>
  );
};

export default Table;
