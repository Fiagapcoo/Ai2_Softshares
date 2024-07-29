import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CategoryCard.css';

const CategoryCard = ({ token }) => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    if(!token) return;

    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/categories/get-areas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAreas(response.data.data);
      } catch (error) {
        console.error('Error fetching areas', error);
      }
    };

    fetchAreas();
  }, [token]);

  if (!token) {
    return null;
  }

  const categories = areas.map((area) => ({
    name: area.title,
    icon: area.icon_name ? area.icon_name : '/assets/noIcon.png',
    link: `?area=${area.area_id}`
  }));

  return (
    <div className="card" style={{ width: '22rem', borderColor: '#00BFFF', borderWidth: '1px' }}>
      <ul className="list-group list-group-flush">
        {categories.map((category, index) => (
          <a key={index} href={category.link} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center area-item">
            <span>{category.name}</span>
            {category.icon.startsWith('/') ? (
              <img src={category.icon} alt={category.name} style={{ width: '20px', height: '20px' }} />
            ) : (
              <i className={category.icon}></i>
            )}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
