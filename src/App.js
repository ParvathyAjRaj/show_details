import './App.css';
import { Container,Row,Col,Button} from 'react-bootstrap';
import ShowList from './components/ShowList';

function App(){

  return(
    <div>
      <Container className='container'>
        <Row className='mt-2 heading'>
          <h1>Welcome to ShowTime.com</h1>
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
