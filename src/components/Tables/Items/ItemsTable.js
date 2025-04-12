import React from 'react';
import ItemsRow from './ItemsRow';
import './ItemsTable.scss'

const ItemsTable = props => {

    const _editItem = item => {
        props.onEditItem(item);
    }

    const _deleteItem = item => {
        props.onDeleteItem(item);
    }

    return (
        <div className='ItemsTable'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>SKU</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.entries.map((entry, i) => (
                                            <ItemsRow
                                                key={i}
                                                index={i}
                                                entry={entry}
                                                onEditItem={_editItem}
                                                onDeleteItem={_deleteItem}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsTable;
