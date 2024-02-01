import './App.css';
import { Container,Row,Col,Button} from 'react-bootstrap';
import ShowList from './components/ShowList';

function App(){
  const base_url = 'https://api.tvmaze.com/search/shows?q=all';
  return(
    <div>
      <Container>
        <Row>
          <h1>Welcome to the Show Lists</h1>
        </Row>
        <Row>
          <ShowList/>
        </Row>
      </Container>
    </div>
  )
}
  ;



export default App
