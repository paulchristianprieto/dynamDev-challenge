import axios from 'axios';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: ''
  })

  const deleteBook = (id) => {
    axios.delete(`http://localhost:3001/books/${id}`)
  }

  const addBook = (data) => {
    console.log({ data })
    axios.post('http://localhost:3001/books', data)
  }

  useEffect(() => {
    axios.get('http://localhost:3001/books')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, [deleteBook, addBook]);

  return (
    <div>
      <Header>
        My Reading List
      </Header>
      {data.map(book => (
        <Book key={book?.id}>
          <div
            className='closeButton'
            onClick={() => deleteBook(book?.id)}
          >
            X
          </div>
          <h2>
            {book?.title}
          </h2>
          <p>
            {book?.author}
          </p>
        </Book>
      ))}

      <Form>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder='Book Title'
        />
        <Input
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder='Author'
        />

        <Button
          onClick={() => addBook(formData)}
        >
          Create
        </Button>
      </Form>
    </div>
  );
}

const Header = styled.div`
  background-color: #219ebc;
  color: white;
  padding: 10px;
  font-size: 24px;
`

const Form = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;

  *:not(:last-child) {
    display: block;
    margin-bottom: 24px; 
  } 
`

const Book = styled.div`
  background-color: #fb85001A;
  border-radius: 4px;
  margin: 16px;
  padding: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: start;
  position: relative;

  h2 {
    font-size: 24px;
    margin: 0 0 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
    color: #fb8500;
  }

  .closeButton {
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }
`

const Input = styled.input`
  padding: 8px;
`

const Button = styled.button`
  padding: 12px;
  border-radius: 40px;
  width: 100px;
  background: #fb8500;
  border: none;
  font-weight: bold;
  color: white;
`

export default App;
