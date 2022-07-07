import React, {useState} from "react";
  
function Upload() {
    const [file, setFile] = useState(0)
    const [user_id, setUserId] = useState(0)

    return (
        <div className='file_send'>
                <form>
                    <h1>Upload your file here!</h1>
                    <label>
                        <span class='form_label'>Username:</span>
                        <input name='user_id' type='text' onChange={(e) => {setFile(e.target.files[0])}}/>
                    </label>
                    <label>
                        <span class='form_label'>File:</span>
                        <input name='file_input' onChange={(e) => {setUserId(e.target.value)}} type='file'/>
                        <button onClick={(e) => {
                            e.preventDefault();
                            fetch(process.env.REACT_APP_API_URL + '/files', {
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
                            .catch(error => {console.log('Error:', error)});
                    }}>
                    Upload</button>
                    </label>
                    </form>
                </div>
            );
}

export default Upload