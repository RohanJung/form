import React, { useState, useEffect } from "react";

const ModifyModal = ({ item, closeModal, modifyItem }) => {
  const [modifiedItem, setModifiedItem] = useState(item);

  useEffect(() => {
    setModifiedItem(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "ProfilePic" && !value.endsWith(".png")) {
      console.log("Put a picture");
      return;
    }
    setModifiedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    modifyItem(modifiedItem);
    console.log("Modfy", modifyItem);

    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Modify Item</h2>
        <form onSubmit={handleSubmit}>
          {/* Render input fields for modifying the item */}
          {Object.keys(modifiedItem).map((key) => {
            if (key === "profilePic") {
              return (
                <div key={key}>
                  <label>{key}:</label>
                  <input
                    type="file"
                    name={key}
                    accept=".png"
                    onChange={handleChange}
                  />
                </div>
              );
            }
            return (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={modifiedItem[key]}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModifyModal;
