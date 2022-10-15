import React , { useState } from 'react';
import { Icon } from 'react-icons-kit';
import {plus} from 'react-icons-kit/feather/plus';
import {trash} from 'react-icons-kit/feather/trash';
import 'bootstrap/dist/css/bootstrap.css';
import './NotesApp.css';
import { v4 as uuidv4 } from 'uuid';
import swal from 'sweetalert';

export default function NotesApp() {

  const [ input , setInput ] = useState('');
  const [ notes , setNotes ] = useState([]);

  const date = new Date();
  const showdate =date.getFullYear()+' - '+date.getMonth()+' - '+date.getDay()+' ( '+date.getHours()+' : '+date.getMinutes()+' : '+date.getSeconds()+' ) ';
  
  const note = {
    id : uuidv4(),
    value : input ,
    condition : 'undone' ,
    date : showdate

  }

  const onChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    if(input === ''){
      swal({
        text :('You must write something !'),
        icon: "error",
        button:'OK',
      })
    }else{
      setNotes([...notes , note])
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      if(input === ''){
        console.log('You must write something !');
      }else{
        setNotes([...notes , note])
        setInput('')
      }
    }
  }

  const clearall = () => {
    setNotes([])
  }

  const deleteItem = (id) => {
    const newArray = notes.filter((note) => note.id !== id);
    setNotes(newArray);
  }

  return (
    <div className='notes-app'>
      <header className='header'>
        <h1 className='name-app'>
          NotesApp
        </h1>
        <div className='input-btn'>
          <input
          className='field'
          type='text'
          onKeyPress={handleKeyPress}
          placeholder='Add New Note'
          value={input}
          onChange={onChangeInput}
          />
          <button
          className='add-btn'
          onClick={handleSubmit}
          >
          <Icon className='icon-plus' size={25} icon={plus} />
          </button>
        </div>
      </header>
      <main className='main'>
        <div className='tasks'>
          {
            notes.map((index) => {
              return(
            <div className='task'>
              <div className='text'>
                <p>{index.value}</p>
              </div>
              <div className='footer-note'>
              <p className='date'>{index.date}</p>
              <button
              className='delete-btn'
              onClick={() => deleteItem(index.id)}>
              <Icon className='icon-trash' size={16} icon={trash} />
              </button>
              </div>
          </div>
              );
            })
          }
        </div>
      </main>
      <footer className='footer'>
        <p className='number-notes'>YOUR Notes : {notes.length}</p>
        <button
        className='clearall-btn'
        onClick={clearall}>
        Clear All
        </button>
      </footer>
    </div>
  );
}
