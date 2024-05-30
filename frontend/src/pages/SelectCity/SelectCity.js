import { Button } from "react-bootstrap";
import Card from "../../components/Card/Card";
import "./SelectCity.css";

const SelectCity = () => {
  return (
    <div className="selectcity">
      <div className="text-center my-4">
        <h1 className="softshares">
          <span>Soft</span>
          <span className="text-primary">Shares</span>
        </h1>
        <h2 className="my-4">Select the city you live in:</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <a href="#">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here@2x.png"
              content="Viseu"
            /></a>
          </div>
          <div className="col-md-4 mb-4">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-1@2x.png"
              content="Fundão"
            />
          </div>
          <div className="col-md-4 mb-4">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-2@2x.png"
              content="Vila Real"
            />
          </div>
          <div className="col-md-4 mb-4">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-3@2x.png"
              content="Portalegre"
            />
          </div>
          <div className="col-md-4 mb-4">
            <Card
              imagePlaceholderChangeIma="/imageplaceholder--change-image-here-4@2x.png"
              content="Tomar"
            />
          </div>
          
        </div>
      </div>
      <div className="text-center my-4">
        <Button variant="primary">Avançar</Button>
      </div>
    </div>
  );
};

export default SelectCity;
