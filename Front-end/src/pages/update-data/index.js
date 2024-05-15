import { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateData = () => {
    const [image, setImage] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [supplierURL, setSupplierURL] = useState();
    const [videoURLs, setVideoURLs] = useState(["http://www.abc.com/1", "http://www.abc.com/2"]);




    useEffect(() => {
        // Fetch image data from the backend when the component mounts
        fetchImageData();
      }, []);
    
      const fetchImageData = () => {
        // Make a GET request to fetch image data from the backend
        axios.get('http://localhost:5000/get-image', { responseType: 'arraybuffer' })
          .then(response => {
            // Convert the received ArrayBuffer to a base64-encoded string
            const base64Image = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            // Set the retrieved base64-encoded image data in the state
            console.log(`Image data received:`, base64Image);
            setImage(`data:image/jpeg;base64,${base64Image}`);
          })
          .catch(error => {
            console.error('Error fetching image:', error);
          });
      };
            

    // useEffect(() => {
    //     axios.get('http://localhost:3001/getimage')
    //       .then((res) => {
    //         const blob = new Blob([new Uint8Array(res?.data[0]?.image_data?.data)], { type: 'image/png' });
    //         const imageBlob = URL.createObjectURL(blob);
    //         setImage(imageBlob);
    //         console.log(imageBlob, ' = Image Blob')
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         // Handle any errors here
    //       });
    //   }, []);


    const handleVideoURLChange = (e, index) => {
        const newVideoURLs = [...videoURLs];
        newVideoURLs[index] = e.target.value;
        setVideoURLs(newVideoURLs);
    };

    const addVideoURLField = () => {
        setVideoURLs([...videoURLs, '']);
    };

    const fileToBlob = async (image) => {
        try {
            // Check if 'image' is a File object
            if (!(image instanceof File)) {
                throw new Error('Image is not a File object');
            }

            // If 'image' is a File object, read it as ArrayBuffer
            const arrayBuffer = await image.arrayBuffer();

            // Create a Blob from the ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: image.type });

            return blob;
        } catch (error) {
            console.error('Error converting image to Blob:', error);
            return null;
        }
    };


    // Example usage
    // const handleSubmit = async () => {
    //     try {
    //         const imageBlob = await fileToBlob(image);
    //         if (imageBlob) {
    //             // Now you can include 'imageBlob' in your POST request
    //             axios.post(`http://127.0.0.1:3001/upload`, {
    //                 name: name,
    //                 image: imageBlob,
    //                 description: description,
    //                 supplierURL: supplierURL,
    //                 videoURLs: videoURLs
    //             })
    //                 .then((res) => {
    //                     console.log(res, ' = Response');
    //                 })
    //                 .catch((err) => {
    //                     console.log(err, ' = Error');
    //                 });
    //         }
    //     } catch (error) {
    //         console.error('Error handling submit:', error);
    //     }
    // };

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        if (!image) {
          alert('Please select a file to upload.');
          return;
        }
    
        const formData = new FormData();
        formData.append('user_file', image);
    
        axios.post('http://localhost:5000/upload-image', formData)
          .then(response => {
            console.log('Image uploaded successfully:', response.data);
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
      };

    return (
        <div className='flex flex-col items-center w-fit bg-[#eef2f8] shadow-lg rounded-[15px] border-[1px] border-[#e5e5e5] px-[38px] py-4'>

            <p className="text-[22px] text-center mb-2 underline text-black font-sans font-bold">
                Content Management System
            </p>
            {image ? (
        <img src={image} alt="Uploaded" />
      ) : (
        <p>No image available</p>
      )}

            <div className='flex flex-col w-fit'>
                <p className="text-[13px] mb-1 text-black font-sans font-semibold">
                    Product Image
                </p>
                <input type="file" onChange={handleImageChange} />


                {/* <input type='file' className="bg-[#fefefe] px-2 border-[1px] border-[#d0d0d0] rounded-[5px] h-fit py-1 w-[300px]" onChange={handleImageChange} /> */}

                <p className="text-[13px] mb-1 mt-4 text-black font-sans font-semibold">
                    Product Name
                </p>
                <input placeholder='Enter name...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-[300px] outline-none font-normal" onChange={(e) => setName(e.target.value)} />

                <p className="text-[13px] mb-1 mt-4 text-black font-sans font-semibold">
                    Product Description
                </p>
                <input placeholder='Enter description...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-[300px] outline-none font-normal" onChange={(e) => setDescription(e.target.value)} />

                <p className="text-[13px] mb-1 mt-4 text-black font-sans font-semibold">
                    Supplier Link
                </p>
                <input placeholder='Enter supplier URL...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-[300px] outline-none font-normal" onChange={(e) => setSupplierURL(e.target.value)} />

                <p className="text-[13px] mb-1 mt-4 text-black font-sans font-semibold">
                    Video Link
                </p>
                {/* <input placeholder='Enter video URL...' className="bg-[#fefefe] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-[300px] outline-none font-normal" onChange={(e) => handleVideoURLChange(e, index)} /> */}

                <button className='bg-[#515964] text-white font-sans py-2 rounded-[8px] font-semibold text-[16px] mt-4 hover:bg-[#3d434b]'
                    onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    )
}
export default UpdateData;