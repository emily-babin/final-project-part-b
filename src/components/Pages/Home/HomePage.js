import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.scss';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // Add other banner images here
  const bannerImages = [
    "/images/pokemonbanner.png",
    "/images/pikabanner.png",  
    "/images/adorablebanner.jpg"
  ];

  useEffect(() => {
    const url = "http://127.0.0.1:3001/items";
    axios.get(url)
      .then(res => setItems(res.data.items))
      .catch(err => console.error("Error fetching items:", err));

    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, [bannerImages.length]);

  return (
    <div className="container">
      {/* Banner */}
      <div className="banner mb-4">
        <img
          src={bannerImages[bannerIndex]}
          alt="Storefront Banner"
          className="img-fluid w-100 rounded shadow"
        />
      </div>

      {/* Items Grid */}
      <div className="row">
        {items.map(item => (
          <div key={item.ITEM_ID} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="d-flex" style={{ height: "200px" }}>
                {/* Image Section */}
                <div
                  style={{
                    width: "40%",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff"
                  }}
                >
                  <img
                    src={item.IMAGE_URL || "/images/pokeball.png"}
                    alt={item.TITLE}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* Text Section */}
                <div className="p-3 d-flex flex-column justify-content-between" style={{ width: "60%" }}>
                  <div className='text-start'>
                    <h5 className="card-title mb-1">{item.TITLE}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.CATEGORY_NAME}</h6>
                    <p className="card-text small">{item.DESCRIPTION}</p>
                  </div>
                  <p className="card-text fw-bold text-end m-0">${item.PRICE}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
