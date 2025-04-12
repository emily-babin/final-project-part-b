import React from 'react';
import IconButton from '../../Buttons/IconButton/IconButton';
import './ItemsRow.scss';

const ItemsRow = (props) => {

    const _editRowItem = () => {
        props.onEditItem(props.entry);
    };

    const _deleteRowItem = () => {
        if (window.confirm('Are you sure you want to delete this item?')) props.onDeleteItem(props.entry);
    };

    return (
        <tr>
            <td>{props.entry.ITEM_ID}</td>
            <td>{props.entry.TITLE}</td>
            <td>{props.entry.CATEGORY_NAME}</td>
            <td>{props.entry.DESCRIPTION}</td>
            <td>{props.entry.PRICE}</td>
            <td>{props.entry.SKU}</td>
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

export default ItemsRow;
