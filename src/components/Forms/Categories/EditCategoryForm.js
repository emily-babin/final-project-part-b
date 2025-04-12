// Form to Edit an existing category in the database

import React, { useEffect, useState } from 'react';
import './EditCategoryForm.scss';
import TextButton from '../../Buttons/TextButton/TextButton';

const EditCategoryForm = (props) => {
  const [id, setID] = useState("");
  const [categoryName, setCategoryName] = useState("");

  // This is what populates the field with the right
  // category name when you hit edit on an item.
  useEffect(() => {
    setID(props.categorySelected.CATEGORY_ID);
    setCategoryName(props.categorySelected.CATEGORY);
  }, [props.categorySelected]);

  // Updates the database with the new data from the
  // edit field.
  const _update = () => {
    const updatedCategory = {
      CATEGORY_ID: id,
      CATEGORY: categoryName
    };
    props.onUpdateCategory(updatedCategory);
  };

  // Cancels editing so nothing is saved to the
  // database and the form returns back to 
  // the addform, instead of the edit
  const _cancel = () => {
    props.setEditing(false);
    props.setSelectedCategory({});
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-start">
        <div className="card p-4">

          {/* Category Name Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <div className="d-flex justify-content-end gap-2">

            {/* Cancel Button */}
            <TextButton 
                className="btn btn-secondary" 
                title="Cancel" 
                onclick={_cancel}/>

            {/* Submit Button */}
            <TextButton 
                className="btn btn-dark" 
                title="Edit" 
                onclick={_update} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryForm;