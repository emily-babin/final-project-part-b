// Page to hold the category manipulation.
// Has an add category form that changes to an edit category
// when the edit button in the table is clicked.

import { useEffect, useState } from 'react';
import axios from 'axios';
import './CategoriesPage.scss';
import CategoriesTable from '../../Tables/Categories/CategoriesTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditCategoryForm from '../../Forms/Categories/EditCategoryForm';
import AddCategoryForm from '../../Forms/Categories/AddCategoryForm';

const CategoriesPage = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({});

    // A flag used to control which form is being shown
    const [editing, setEditing] = useState(false);

    // Create Category
    const _createCategory = categoryName => {
        const url = "http://127.0.0.1:3001/categories";
        axios.post(url, { 
            category: categoryName
        }).then(res => {
            setCategories(res.data.categories);
        }).catch(err => {
            console.log(err);
        });
    };

    // Edit Category
    const _editCategory = category => {
        console.log("Editing category:", category); 
        setSelectedCategory(category);
        setCategoryName(category.CATEGORY); 
        setEditing(true);
      };

    // Update Category
    const _updateCategory = (category) => {
        const url = `http://127.0.0.1:3001/categories/${category.CATEGORY_ID}`;
        axios.patch(url, {
            category: category.CATEGORY 
            }).then(res => {
                setCategories(res.data.categories);
                setSelectedCategory({});
                setEditing(false);
            }).catch(err => {
                console.log(err);
            });
    };

    // Delete Category
    const _deleteCategory = (category) => {
        const url = `http://127.0.0.1:3001/categories/${category.CATEGORY_ID}`;
        axios.delete(url)
            .then(res => {
                setCategories(res.data.categories);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    // Fetch categories on load
    useEffect(() => {
        const url = "http://127.0.0.1:3001/categories";
        axios.get(url).then(res => {
            setCategories(res.data.categories);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 offset-1">
                        <h1 className='text-start font-weight-700'>Categories</h1>
                    </div>
                    <div className="col-4">
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <CategoriesTable 
                            entries={categories} 
                            onEditCategory={_editCategory} 
                            onDeleteCategory={_deleteCategory} 
                            onUpdateCategory={_updateCategory}
                        />
                    </div>
                    <div className="col-6 text-start">
                        <div className="mb-2">
                            <h4>{editing ? "Edit Category" : "Create New Category"}</h4>

                                {editing ? (
                                    <EditCategoryForm
                                        onUpdateCategory={_updateCategory}
                                        categorySelected={selectedCategory}
                                        categoryName={categoryName}
                                        setCategoryName={setCategoryName}
                                        setSelectedCategory={setSelectedCategory}
                                        setEditing={setEditing}
                                    />

                                ) : (
                                <AddCategoryForm onAddCategory={_createCategory} />
                                )}
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;
