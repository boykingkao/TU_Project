import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {} from "../firebase"

function Upload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Upload progress
        },
        (error) => {
          // Error
          console.error(error);
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUrl(downloadUrl);
            console.log('Image uploaded successfully');
            console.log(file)
          });
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label>
          Select an image to uploadss:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded image" />
        </div>
      )}
    </div>
  );
}

export default Upload;
