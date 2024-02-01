import './App.css';
import { Container,Row,Col,Button} from 'react-bootstrap';
import ShowList from './components/ShowList';
import { useState } from 'react';

function App(){

  return(
    <div>
      <Container>
        <Row>
          <Col>
          <p>Welcome to the Show Lists</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ShowList/> 
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
