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
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');


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
    const _add = async () => {
        let uploadedImageUrl = imageUrl;
    
        // Step 1: Upload the image if present
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);
    
            try {
                const uploadRes = await fetch('http://localhost:3001/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                const uploadData = await uploadRes.json();
    
                if (uploadData.success) {
                    uploadedImageUrl = uploadData.imageUrl;
                    setImageUrl(uploadData.imageUrl);
                } else {
                    alert("Image upload failed.");
                    return;
                }
            } catch (err) {
                console.error("Image upload error:", err);
                alert("Image upload error.");
                return;
            }
        }
    
        // Step 2: Send item data including image URL
        const newItem = {
            TITLE: itemName,
            CATEGORY_ID: categoryID,
            DESCRIPTION: itemDescription,
            PRICE: itemPrice,
            SKU: itemSKU,
            IMAGE_URL: uploadedImageUrl,
        };
    
        props.onAddItem(newItem);
        _clear();
    };
    

    // Clearing the input fields
    const _clear = () => {
        setItemName('');
        setCategoryID('');
        setItemDescription('');
        setItemPrice('');
        setItemSKU('');
        setImageFile(null);
        setImageUrl('');
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

                    {/* Item Image Upload */}
                    <div className="mb-3 text-start">
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    </div>

                    {imageFile && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Preview"
                                style={{ maxWidth: '200px', borderRadius: '10px' }}
                            />
                        </div>
                    )}



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