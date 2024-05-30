import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CategoryCard.css';

const CategoryCard = () => {
  const categories = [
    { name: 'Sports', icon: 'fas fa-futbol', link: '#sports' },
    { name: 'Gastronomy', icon: 'fas fa-utensils', link: '#gastronomy' },
    { name: 'Leisure', icon: 'fas fa-landmark', link: '#leisure' },
    { name: 'Housing', icon: 'fas fa-home', link: '#housing' },
    { name: 'Transportation', icon: 'fas fa-bus', link: '#transportation' },
    { name: 'Education', icon: 'fas fa-graduation-cap', link: '#education' },
    { name: 'Health', icon: 'fas fa-hospital', link: '#health' },
  ];

  return (
    <div className="card" style={{ width: '18rem', borderColor: '#00BFFF', borderWidth: '1px' }}>
      <ul className="list-group list-group-flush">
        {categories.map((category, index) => (
          <a key={index} href={category.link} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center area-item">
            <span>{category.name}</span>
            <i className={category.icon}></i>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
