import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState()
  const [user_id, setUserId] = useState()
  const [file_id, setFileID] = useState() 
  var [raw_list, setRawList] = useState()
  const [raw_get, setGet] = useState()

  function on_change_file(e) {
    setFile(e.target.files[0])
  }

  function on_change_misc(e) {
    setUserId(e.target.value)
  }

  function post_button(e) {
    e.preventDefault()
    fetch(process.env.REACT_APP_API_URL + '/files', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        user_id : user_id,
        name : file.name,
        type : file.type,
        size : file.size
      })
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {console.log('Error:', error)})
  }

  function list_button(e) {
    fetch(process.env.REACT_APP_API_URL + '/files')
    .then((response) => response.text())
    .then(setRawList)
    var temp = JSON.parse(raw_list)
    setGet(temp)
  }

  function get_button(e) {
    e.preventDefault(e)
    fetch(process.env.REACT_APP_API_URL + '/files/' + file_id)
    .then((response) => response.text())
    .then(setGet)
    console.log(JSON.parse(raw_get))
  }

  return (
    <div className="App">
      <table border={1}>
        <tr>
          <th>
            File Upload
          </th>
          <td>
          <form>
            <span class='form_label'>Username:</span>
            <input name='user_id' type='text' onChange={on_change_misc}/>
            <span class='form_label'>File:</span>
            <input name='file_input' onChange={on_change_file} type='file'/>
            <button onClick={post_button}>Upload</button>
          </form>
          </td>
        </tr>
        <tr>
          <th>
            List Files
          </th>
          <td>
            <button onClick={list_button}>List</button>
          </td>
        </tr>
        <tr>
          <th>Get File</th>
          <td>
          <form>
            <input name='file_name' onChange={(e) => setFileID(e.target.value)} type='text'></input>
            <button onClick={get_button}>Get Item</button>
          </form>
        </td>
        </tr>
      </table>
        
    </div>
  );
}

export default App;