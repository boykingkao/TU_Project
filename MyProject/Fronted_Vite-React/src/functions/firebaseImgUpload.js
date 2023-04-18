// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// function firebaseImgUpload() {
//     const storage = getStorage();


//     const timestamp = new Date().getTime();
//     const sliceName = file.name.slice(file.name.lastIndexOf("."))
//     const newfileName = timestamp + sliceName
//     setnewFilename(newfileName)
//     const storageRef = ref(storage, 'products/' + newfileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on('state_changed',
//         (snapshot) => {
//             // Upload progress
//         },
//         (error) => {
//             // Error
//             console.error(error);
//         },
//         () => {
//             // Upload complete
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
//                 setImageUrl(downloadUrl);
//                 console.log('Image uploaded successfully');
//                 console.log(file)

//             });
//         }
//     );
//     console.log(imageUrl)
//     return newfileName
// }