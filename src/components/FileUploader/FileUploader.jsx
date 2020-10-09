import React, {useRef} from 'react'

const FileUploader = ({onFileSelect,onFileSelectError, onFileSelectSuccess, file }) => {
    const fileInput = useRef(null)
    
    const handleFileInput = (evt) => {
        //handle validations
        onFileSelect(evt.target.files[0])
        if (fileInput.size > 1024){
            onFileSelectError({ error: "File size cannot exceed more than 1MB" })
        } else {
            onFileSelectSuccess(file)
        }
    }
    
    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput}/>
            <button onClick={evt => fileInput.current && fileInput.current.click()} className="button"/>
        </div>
    )
  }

  export default FileUploader