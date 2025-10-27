import './App.css'
import Homepage from './Components/Homepage';
import {Routes, Route} from 'react-router-dom';
import ShowNotes from './Components/ShowNotes';
import CreateNote from './Components/CreateNote';
import DeleteNote from './Components/DeleteNote';

function App() {

  return (
    <div>
      <Homepage/>
      <Routes>
        <Route path='/showNotes' element={<ShowNotes/>}></Route>
        <Route path='/createNotes' element={<CreateNote/>}></Route>
        <Route path='/deleteNote' element={<DeleteNote/>}></Route>
      </Routes>
    </div>
  )
}

export default App
