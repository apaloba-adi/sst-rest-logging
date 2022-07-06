import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState()
  const [user_id, setUserId] = useState()

  function on_change_file(e) {
    setFile(e.target.files[0])
  }

  function on_change_misc(e) {
    setUserId(e.target.value)
  }

  function button_submit(e) {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id : user_id,
        name : file.name,
        type : file.type,
        size : file.size
      })
    })
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch(error => {console.log('Error:', error)})
  }

  return (
    <div className="App">
      <form>
        <h1>Upload your file here!</h1>
        <label>
        <span class='form_label'>Username:</span>
        <input name='user_id' type='text' onChange={on_change_misc}/>
        </label>
        <label>
          <span class='form_label'>File:</span>
          <input name='file_input' onChange={on_change_file} type='file'/>
          <button onClick={button_submit}>Upload</button>
        </label>
      </form>
    </div>
  );
}

export default App;
