import React from 'react';
import IconButton from '../../Buttons/IconButton/IconButton';
import './CategoriesRow.scss';

const CategoriesRow = (props) => {

    const _editRowItem = () => {
        props.onEditCategory(props.entry);
    };

    const _deleteRowItem = () => {
        if (window.confirm('Are you sure you want to delete this item?')) props.onDeleteCategory(props.entry);
    };

    return (
        <tr>
            <td>{props.entry.CATEGORY_ID}</td>
            <td>{props.entry.CATEGORY}</td>
            <td className="text-end">
                <IconButton 
                    onClick={_editRowItem} 
                    btnSrc={"/images/edit.png"} 
                    btnTitle={"Edit"} 
                    btnClass={"btn btn-dark"}/>
            </td>
            <td className="text-start">
                <IconButton 
                onClick={_deleteRowItem}
                btnSrc={"/images/delete.png"}
                btnTitle={"Delete"}
                btnClass={"btn btn-danger"} />
            </td>
        </tr>
    );
};

export default CategoriesRow;
