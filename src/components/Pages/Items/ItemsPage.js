import { useEffect, useState } from 'react';
import axios from 'axios';
import './ItemsPage.scss';
import ItemsTable from '../../Tables/Items/ItemsTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddItemForm from '../../Forms/Items/AddItemForm';
import EditItemForm from '../../Forms/Items/EditItemForm';

const ItemsPage = (props) => {    
    const [selectedItem, setSelectedItem] = useState({});

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    // A flag to control whether the add or edit form is showing
    const [editing, setEditing] = useState(false);

    // Create Item
    const _createItem = (newItem) => {
        const url = "http://127.0.0.1:3001/items";
    
        axios.post(url, newItem)
            .then(res => {
                setItems(res.data.items);
                setCategories(res.data.categories);
            })
            .catch(err => {
                console.log("Error creating item:", err.response?.data || err.message);
            });
    };
    
    // EditItem
    const _editItem = item => {
        setSelectedItem(item);
        setEditing(true);
    };


    // Update Item
    const _updateItem = (item) => {
        const url = `http://127.0.0.1:3001/items/${item.ITEM_ID}`;
        axios.patch(url, item)
            .then(res => {
                setItems(res.data.items);
                setSelectedItem({});
                setEditing(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    // Delete Item
    const _deleteItem = (item) => {
        const url = `http://127.0.0.1:3001/items/${item.ITEM_ID}`;
        axios.delete(url)
            .then(res => {
                setItems(res.data.items);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    // Fetch items on load, need to fetch categories too because
    // the categories dropdown uses the names, which comes from the
    // categories table
    useEffect(() => {
        const fetchItemsAndCategories = async () => {
            try {
                const [itemsRes, categoriesRes] = await Promise.all([
                    axios.get("http://127.0.0.1:3001/items"),
                    axios.get("http://127.0.0.1:3001/categories")
                ]);
                setItems(itemsRes.data.items);
                setCategories(categoriesRes.data.categories);
            } catch (err) {
                console.log(err);
            }
        };
        fetchItemsAndCategories();
    }, []);

    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-6 offset-1">
                        <h1 className='text-start font-weight-700'>Items</h1>
                    </div>
                    <div className="col-4">
                    </div>
                </div>
                <div className='row justify-content-center'>
                <div className="col-6">
                        <div className="mb-2">
                            <h4>{editing ? "Edit Item" : "Create New Item"}</h4>

                                {editing ? (
                                   <EditItemForm
                                   onUpdateItem={_updateItem}
                                   itemSelected={selectedItem}
                                   setSelectedItem={setSelectedItem}
                                   setEditing={setEditing}
                                   categories={categories}
                               />
                               

                                ) : (
                                    <AddItemForm 
                                    onAddItem={_createItem}
                                    categories={categories}
                                  />
                                  
                                )}
                        </div>
                    </div>  
                </div>

                <br/>

                <div className="row">
                    <div className="col-12">
                        <ItemsTable 
                            entries={items} 
                            onEditItem={_editItem} 
                            onDeleteItem={_deleteItem} 
                            onUpdateItem={_updateItem}
                        />
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default ItemsPage;   