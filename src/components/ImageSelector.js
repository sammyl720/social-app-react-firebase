import React, { useRef, useEffect } from 'react'

const ImageSelector = ({ openFileSystem, onFileChange }) => {

  const inputRef = useRef();
  useEffect(() => {
    if(openFileSystem){
      inputRef.current.click();
    }
  }, [openFileSystem])
  return (
    <div style={{ display: 'none'}}>
      <input type="file"
        ref={inputRef}
        id="avatar" name="avatar"
        onChange={onFileChange}
        accept="image/png, image/jpeg" />
    </div>
  )
}

export default ImageSelector
