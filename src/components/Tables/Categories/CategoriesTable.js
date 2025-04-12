import React from 'react';
import CategoriesRow from './CategoriesRow';
import './CategoriesTable.scss'

const CategoriesTable = props => {

    const _editCategory = category => {
        props.onEditCategory(category);
    }

    const _deleteCategory = category => {
        props.onDeleteCategory(category);
    }

    return (
        <div className='CategoriesTable'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.entries.map((entry, i) => (
                                            <CategoriesRow
                                                key={i}
                                                index={i}
                                                entry={entry}
                                                onEditCategory={_editCategory}
                                                onDeleteCategory={_deleteCategory}
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

export default CategoriesTable;
