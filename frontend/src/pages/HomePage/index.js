import React from 'react';

import Header from '../../components/Header';
import ShortenerService from '../../services/shortenerService.js';

import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import { ContentContainer, Form } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: '',
      shortenedURL: '',
      errorMenssage: '',      
    }
  }

  handleSubmit = async(event) => {
    
    event.preventDefault();
    

    const { url } = this.state;

    this.setState({ isLoading: true, errorMenssage: '' });

    if(!url) {
      this.setState({ isLoading: false, errorMenssage: 'Informe uma url para encurtar!' });
    } else {
      try {
        const service = new ShortenerService();
        const result = await service.generate({ url }); 

        this.setState({ isLoading: false, code: result.code });
      } catch (error) {        
        this.setState({ isLoading: false, errorMenssage: 'Ocorreu um erro ao tentar encurtar a url!' });
      }
    }
  }

  copyToClipboard = () => {
    const element = this.inputURL;
    element.select();
    document.execCommand('copy');
  }

  render() {
    const { isLoading, errorMenssage, code } = this.state;
    return (
      <>
        <Container>
          <Header>Seu novo encurtador de url :)</Header>

          <ContentContainer>
          <Form onSubmit={this.handleSubmit}>            
              <InputGroup className='mb-3'>
                <FormControl 
                  placeholder='Digite uma url para encurtar'
                  defaultValue=''
                  onChange={e => this.setState({ url: e.target.value })}
                />

                <InputGroup.Append>
                  <Button variant='primary' type='summit' >Encurtar</Button>
                </InputGroup.Append>
              </InputGroup>

              {isLoading ? (
                <Spinner animation='border' />
              ) : (
                code && (
                  <>
                    <InputGroup className='mb-3'>
                      <FormControl 
                        autoFocus={true}
                        defaultValue={`https://pitu.tk/${code}`}
                        ref={ (input) => this.inputURL = input }
                      />

                      <InputGroup.Append>
                        <Button variant='outline-secondary' onClick={() => this.copyToClipboard() }>Copiar</Button>
                      </InputGroup.Append>
                    </InputGroup>

                    <p>Para acompanhar as estátisticas acesse: https://pitu.tk/{code}</p>
                    
                  </>
                )
              )}
              
              { errorMenssage &&  <Alert variant='danger'>{errorMenssage}</Alert>}
          </Form>
          </ContentContainer>
        </Container>
      </>
    )
  }
}

export default HomePage;