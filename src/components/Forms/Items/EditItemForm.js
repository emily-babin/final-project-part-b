// Form for editing existing data in the database

import React, { useEffect, useState } from 'react';
import './EditItemForm.scss';
import TextButton from '../../Buttons/TextButton/TextButton';

const EditItemForm = (props) => {
    // Initializing data collected from forms
    const [formData, setFormData] = useState({
        ITEM_ID: "",
        TITLE: "",
        CATEGORY_ID: "",
        DESCRIPTION: "",
        PRICE: "",
        SKU: ""
    });

    // Populate fields when itemSelected changes
    useEffect(() => {
        if (props.itemSelected) {
            setFormData({
                ITEM_ID: props.itemSelected.ITEM_ID || "",
                TITLE: props.itemSelected.TITLE || "",
                CATEGORY_ID: props.itemSelected.CATEGORY_ID || "",
                DESCRIPTION: props.itemSelected.DESCRIPTION || "",
                PRICE: props.itemSelected.PRICE || "",
                SKU: props.itemSelected.SKU || ""
            });
        }
    }, [props.itemSelected]);

    // Update item in database
    const _update = () => {
        props.onUpdateItem(formData);
    };

    // Cancel editing so nothing saves in the database
    const _cancel = () => {
        props.setEditing(false);
        props.setSelectedItem({});
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-start">
                <div className="card p-4">

                    {/* Item Name Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item Name"
                        value={formData.TITLE}
                        onChange={(e) => setFormData({ ...formData, TITLE: e.target.value })}
                    />

                    {/* Category Select Dropdown */}
                    <select
                        className='form-control mb-3'
                        value={formData.CATEGORY_ID}
                        onChange={(e) => setFormData({ ...formData, CATEGORY_ID: e.target.value })}
                    >
                        <option value="" disabled>Select Category</option>

                        {/* This is what populates the category dropdown with the
                        data from the database */}
                        {props.categories.map(category => (
                            <option key={category.CATEGORY_ID} value={category.CATEGORY_ID}>
                                {category.CATEGORY}
                            </option>
                        ))}
                    </select>

                    {/* Item Description Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item Description"
                        value={formData.DESCRIPTION}
                        onChange={(e) => setFormData({ ...formData, DESCRIPTION: e.target.value })}
                    />

                    {/* Item Price Input */}
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Item Price"
                        value={formData.PRICE}
                        onChange={(e) => setFormData({ ...formData, PRICE: e.target.value })}
                    />

                    {/* Item SKU Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item SKU"
                        value={formData.SKU}
                        onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
                    />

                    <div className="d-flex justify-content-end gap-2">
                        {/* Cancel Button */}
                        <TextButton 
                            className="btn btn-secondary" 
                            title="Cancel" 
                            onclick={_cancel}
                        />

                        {/* Submit Button */}
                        <TextButton 
                            className="btn btn-dark" 
                            title="Save" 
                            onclick={_update}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditItemForm;