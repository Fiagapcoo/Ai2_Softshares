import { Button } from "react-bootstrap";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import "./SelectCity.css";

const SelectCity = () => {
  useEffect(() => {
    document.title = "SoftShares - Select City";
  }, []);

  return (
    <div className="selectcity">
      <div className="text-center my-4">
        <h1 className="softshares">
          <span>Soft</span>
          <span className="text-primary">Shares</span>
        </h1>
        <h2 className="my-4 select-city-header">Select the city you live in:</h2>
      </div>
      <div className="container">
        <div className="grid-container">
          <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here@2x.png"
              content="Viseu"
            />
          </a>
          <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-1@2x.png"
              content="Fundão"
            />
          </a>
          <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-2@2x.png"
              content="Vila Real"
            />
          </a>
          <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-3@2x.png"
              content="Portalegre"
            />
          </a>
          <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-4@2x.png"
              content="Tomar"
            />
          </a>
        </div>
      </div>
      <div className="text-center my-4">
        <Button variant="primary" className="advance-button">Advance</Button>
      </div>
    </div>
  );
};

export default SelectCity;
