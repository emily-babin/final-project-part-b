import React, { useEffect, useState } from 'react';
import './EditItemForm.scss';
import TextButton from '../../Buttons/TextButton/TextButton';

const EditItemForm = (props) => {
    const [formData, setFormData] = useState({
        ITEM_ID: "",
        TITLE: "",
        CATEGORY_ID: "",
        DESCRIPTION: "",
        PRICE: "",
        SKU: "",
        IMAGE_URL: "",
        IMAGE_FILE: null
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
                SKU: props.itemSelected.SKU || "",
                IMAGE_URL: props.itemSelected.IMAGE_URL || "",
                IMAGE_FILE: null
            });
        }
    }, [props.itemSelected]);

    // Update item in database
    const _update = async () => {
        let imageUrl = formData.IMAGE_URL;

        if (formData.IMAGE_FILE) {
            const formDataUpload = new FormData();
            formDataUpload.append("image", formData.IMAGE_FILE);

            try {
                const response = await fetch("http://localhost:3001/upload", {
                    method: "POST",
                    body: formDataUpload
                });

                const result = await response.json();
                if (result.success) {
                    imageUrl = result.imageUrl;
                } else {
                    console.error("Upload failed:", result.message);
                }
            } catch (err) {
                console.error("Image upload error:", err);
            }
        }

        const updatedItem = {
            ...formData,
            IMAGE_URL: imageUrl
        };

        props.onUpdateItem(updatedItem);
    };

    // Cancel editing
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
                        className="form-control mb-3"
                        value={formData.CATEGORY_ID}
                        onChange={(e) => setFormData({ ...formData, CATEGORY_ID: e.target.value })}
                    >
                        <option value="" disabled>Select Category</option>
                        {props.categories.map(category => (
                            <option key={category.CATEGORY_ID} value={category.CATEGORY_ID}>
                                {category.CATEGORY}
                            </option>
                        ))}
                    </select>

                    {/* Description Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item Description"
                        value={formData.DESCRIPTION}
                        onChange={(e) => setFormData({ ...formData, DESCRIPTION: e.target.value })}
                    />

                    {/* Price Input */}
                    <input
                        type="number"
                        className="form-control mb-3"
                        placeholder="Item Price"
                        value={formData.PRICE}
                        onChange={(e) => setFormData({ ...formData, PRICE: e.target.value })}
                    />

                    {/* SKU Input */}
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Item SKU"
                        value={formData.SKU}
                        onChange={(e) => setFormData({ ...formData, SKU: e.target.value })}
                    />

                    {/* Image Upload */}
                    <div className="mb-3">
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    IMAGE_FILE: e.target.files[0]
                                });
                            }}
                        />
                    </div>

                    {/* Image Preview */}
                    {/* {formData.IMAGE_FILE ? (
                        <div className="mb-3">
                            <img
                                src={URL.createObjectURL(formData.IMAGE_FILE)}
                                alt="New Preview"
                                className="img-fluid rounded"
                                style={{ maxHeight: '200px' }}
                            />
                        </div>
                    ) : formData.IMAGE_URL ? (
                        <div className="mb-3">
                            <img
                                src={formData.IMAGE_URL}
                                alt="Current Item"
                                className="img-fluid rounded"
                                style={{ maxHeight: '200px' }}
                            />
                        </div>
                    ) : null} */}

                    {/* Action Buttons */}
                    <div className="d-flex justify-content-end gap-2">
                        <TextButton
                            className="btn btn-secondary"
                            title="Cancel"
                            onclick={_cancel}
                        />
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