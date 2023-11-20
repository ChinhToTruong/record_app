import React, { useState } from 'react'

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
    const [base64Data, setBase64Data] = useState('');
    const handleFileChange = (event) => {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result.split(',')[1];
          setBase64Data(base64);
        };
        reader.readAsDataURL(file);
        setSelectedFile(event.target.files[0]);
      }
    }    

    // const sendFile = () => {
    //   if (selectedFile) {
    //     console.log(selectedFile)
    //     const base64Data = encodeFileToBase64(selectedFile)
    //     const formData = new FormData();
    //     formData.append('string', base64Data);
    //     // Gửi formData lên server
    //     const url = 'http://localhost:3000/up-load'
    //     fetch(url, {
    //       method: 'POST',
    //       body: base64Data,
    //     })
    //       .then(response => {
    //         return response.text();
    //       })
    //       .catch(error => {
    //         console.error('Error sending recording:', error);
    //       });
    //   }
    // };


    const handleUpload =  () => {
      // sendFile()
    }

  return (
    <div className="container">
        <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">Upload file</label>
        <input type="file" className="form-control" id="fileInput" accept=".mp3" onChange={handleFileChange} />
        </div>
        <button className="btn btn-primary" onClick={handleUpload}>Send</button>
        <div className="mt-3">
        <p className="fw-bold">Result:</p>
        <div className="border p-2">
          <pre>${selectedFile}</pre>
        </div>
      </div>
    </div>
  )

}
export default UploadFile