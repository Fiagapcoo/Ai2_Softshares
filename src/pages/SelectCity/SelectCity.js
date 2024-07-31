import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import './SelectCity.css';
import axios from 'axios';

const SelectCity = () => {
  const [user, setUser] = useState({ email: '', firstName: '', lastName: '' });
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    document.title = 'SoftShares - Select City';
    
    const storedUser = localStorage.getItem('user');
    console.log('Stored user:', storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    

    //localStorage.removeItem('user');

    const fetchCities = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/administration/get-all-centers`);
        const filteredCities = response.data.data.filter(city => city.city !== 'ALL');
        setCity(filteredCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);


  
  const { email, firstName, lastName } = user;

  const handleSubmit = async() => {
    console.log('User:', user);
    console.log('Selected city:', selectedCity);
    try{
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
      email: email,
      firstName: firstName,
      lastName: lastName,
      centerId: selectedCity,
    });

    console.log('Response:', res);
  } catch (error) {
    console.error('Error registering user:', error);
  }

  }

  return (
    <div className="selectcity">
      <div className="text-center my-4">
        <h1 className="softshares">
          <span>Soft</span>
          <span className="text-primary">Shares</span>
        </h1>
        <h2 className="my-4 select-city-header">Select the city you live in:</h2>
      </div>
      <Container>
        <Row className="justify-content-center">
          {city.map((city) => (
            <Col key={city.office_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div onClick={() => setSelectedCity(city.office_id)}>
                <Card
                  imagePlaceholderChangeIma={`https://backendpint-w3vz.onrender.com/api/uploads/${city.officeImage}`}
                  content={city.city}
                  selected={selectedCity === city.office_id}
                  className={selectedCity === city.office_id ? 'selected2' : ''}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <div className="text-center my-4">
        <Button variant="primary" className="advance-button" onClick={handleSubmit}>Advance</Button>
      </div>
    </div>
  );
};

export default SelectCity;
