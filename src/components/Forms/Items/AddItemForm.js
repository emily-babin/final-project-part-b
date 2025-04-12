// Form to add an item into the database

import React, { useState } from 'react';
import './AddItemForm.scss';
import TextButton from '../../Buttons/TextButton/TextButton';

const AddItemForm = (props) => {
    const [itemName, setItemName] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [itemSKU, setItemSKU] = useState("");

    // Detects when a value has changed in one of the fields,
    // allows ability to type into the text fields
    const _detectValueChanged = (key, value) => {
        switch (key) {
            case 'name':
                return setItemName(value);
            case 'categoryID':
                return setCategoryID(value);
            case 'description':
                return setItemDescription(value);
            case 'price':
                return setItemPrice(value);
            case 'sku':
                return setItemSKU(value);
            default:
                return console.log("Error: Field not found");
        }
    }

    // Triggers the onAddItem prop, passing in all of the fields of the
    // item through the newItem constant. Clears fields afterwards
    const _add = () => {
        const newItem = {
            TITLE: itemName,
            CATEGORY_ID: categoryID,
            DESCRIPTION: itemDescription,
            PRICE: itemPrice,
            SKU: itemSKU
        };

        props.onAddItem(newItem);
        _clear();
    
    }

    // Clearing the input fields
    const _clear = () => {
        setItemName('');
        setCategoryID('');
        setItemDescription('');
        setItemPrice('');
        setItemSKU('');
    }

    return (
        <div className="container mt-3">
            <div className="row justify-content-start">
                <div className="card p-4">

                    {/* Item Name Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => _detectValueChanged('name', e.target.value)}
                    />

                    {/* Category Select Input */}
                    <select
                        className='form-control mb-3'
                        value={categoryID}
                        onChange={(e) => _detectValueChanged('categoryID', e.target.value)}
                    >
                        <option value="" disabled>Select Category</option>

                        {/* This is what populates the categories dropdown with
                        the ones from the database */}
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
                        value={itemDescription}
                        onChange={(e) => _detectValueChanged('description', e.target.value)}
                    />

                    {/* Item Price Input */}
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Item Price"
                        value={itemPrice}
                        onChange={(e) => _detectValueChanged('price', e.target.value)}
                    />

                    {/* Item SKU Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item SKU"
                        value={itemSKU}
                        onChange={(e) => _detectValueChanged('sku', e.target.value)}
                    />

                    <div className="d-flex justify-content-end">

                        {/* Submit button */}
                        <TextButton 
                            className={"btn btn-danger"} 
                            title={"Create"} 
                            onclick={_add}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItemForm;