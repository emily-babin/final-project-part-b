// Form to Add a Category to the database

import React, {useState } from 'react';
import './AddCategoryForm.scss';
import TextButton from '../../Buttons/TextButton/TextButton';

const AddCategoryForm = (props) => {
    const [categoryName, setCategoryName] = useState("");

    // Detects when a value has changed in the field, allows
    // ability to type into text field
    const _detectValueChanged = (key, value) => {

      // The switch case may not make a whole lot of sense
      // for just one field, but if more fields are added later
      // (see items forms for example), switch case
      // makes for easy modifications
      switch (key) {
        case 'category':
          return setCategoryName(value);
        default:
          return console.log("Error: Field not found")
      }
    };

    // Trigger onAddCategory prop, passing in the categoryName
    // and clearing the fields
    const _add = () => {
        props.onAddCategory(categoryName);
        _clear();
    };

    // Clearing the fields
    const _clear = () => {
        setCategoryName('');
    };

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
                onChange={(e) => _detectValueChanged('category', e.target.value)}
              />

              {/* Submit Button */}
              <div className="d-flex justify-content-end">
                <TextButton 
                  className={"btn btn-danger"} 
                  title={"Create"} 
                  onclick={_add} />
              </div>
            </div>
        </div>
      </div>
  );
};

export default AddCategoryForm;