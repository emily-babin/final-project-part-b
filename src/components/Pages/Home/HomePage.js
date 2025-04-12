// Home page to display banner and a card for each item

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss'; 

const HomePage = () => {
  const [items, setItems] = useState([]);

  // Fetching items on load
  useEffect(() => {
    const url = "http://127.0.0.1:3001/items";
    axios.get(url)
      .then(res => setItems(res.data.items))
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className="container ">
      
      {/* Banner */}
      <div className="banner mb-4">
        <img
          src="/images/pokemonbanner.png" 
          alt="Storefront Banner"
          className="img-fluid w-100 rounded shadow"
        />
      </div>

      {/* Items Grid */}
      <div className="row">
        {items.map(item => (
          <div key={item.ITEM_ID} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-end">
                <h5 className="card-title">{item.TITLE}</h5>
                <h6 className="card-subtitle text-muted mb-2">{item.CATEGORY_NAME}</h6>
                <p className="card-text">{item.DESCRIPTION}</p>
                <p className="card-text fw-bold">${item.PRICE}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
