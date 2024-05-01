import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModifyModal from "./ModifyModal";

const Table = (props) => {
  const data = props.formdata || [];
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const keys = Object.keys(data[0] || {});

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
    // Confirm deletion with the user
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      // Filter out the item with the provided name
      const updatedData = data.filter((item) => item.name !== name);

      // Update the state with the modified data
      props.setFormdata(updatedData);
    }
  };

  const showModifyColumn = keys.length > 0;

  return (
    <div className="table">
      <Link to="/">
        <button>Home</button>
      </Link>

      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}

            {showModifyColumn && <th>Modify</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {keys.map((key) => (
                <td key={key}>
                  {key === "ProfilePic" ? (
                    <img
                      src={item[key]}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
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
          ))}
        </tbody>
      </table>
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
