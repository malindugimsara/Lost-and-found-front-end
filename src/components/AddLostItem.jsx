import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LocationPicker from './LocationPicker'; // Import your location picker component
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddLostItem.css'; // Import your CSS for styling the popup
import axios from 'axios';
import MediaUpload from '/utils/mediaUplaod';
import toast from 'react-hot-toast';


function AddLostItem() {
    const [opnedPopup, setOpened] = useState(false); // State to control the popup visibility
    const [location, setLocation] = useState(null); // State to store the selected location
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [phone, setPhone] = useState("") // State to store the phone number
    const [picture,setPicture] = useState([])
    const [loading, setLoading] = useState(false);

    async function submit(e){
        e.preventDefault();

        setLoading(true);

        if (loading) return; // Prevent the default form submission behavior


         // Set loading state to true

        if(name.length <= 0){
            toast.error("Please enter Item Name")
            setLoading(false); // Reset loading state after submission
            return;
        }
        if(description.length <= 0){
            toast.error("Please enter Item Description")
            setLoading(false); // Reset loading state after submission
            return;
        }
        if(phone.length < 10 || phone.charAt(0) != '0' || phone.length > 10){
            toast.error("Please enter a valid Phone Number")
            setLoading(false); // Reset loading state after submission
            return;
        }
        if(location === null){
            toast.error("Please select Item Location")
            setLoading(false); // Reset loading state after submission
            return;
        }

        if(picture.length <= 0){
            toast.error("Please select at least one Image")
            setLoading(false); // Reset loading state after submission
            return;
        }

        const promisesArray = [];

        for(let i = 0; i < picture.length; i++){
            promisesArray[i] = MediaUpload(picture[i])
        }

        try{
            const imageUrls = await Promise.all(promisesArray)
            // console.log(imageUrls)


            const lostItem = {
                name: name,
                description: description,
                location: location,
                image: imageUrls,
                phoneNumber: phone.toString()
            };

            axios.post(import.meta.env.VITE_API_URL + '/api/lost/', lostItem)
            .then(() => {
                setOpened(false);
                console.log('Lost item submitted successfully');
                toast.success("Lost item submitted successfully")
                 // Close the popup after submission
            })
            .catch((error) => {
                console.log('Error submitting lost item:', error);
                toast.error("Error submitting lost item")
            });

        }catch(error) {
            console.log('Error submitting lost item:', error);
            toast.error("Error submitting lost item")
        }
        finally {
            setLoading(false); // Always reset loading
        }
    }


    return(
        <>
            <Button className='lost-button' onClick={()=>setOpened(true)} >LOST</Button>

            {opnedPopup && ( // If setOpened is true, show the popup
            <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Lost Item</h2>
                        <form onSubmit={submit}>
                            <label>
                                Item Name:
                                <input type="text" name="itemName"  onChange={(e) => {
                                    setName(e.target.value)
                                    }}/>
                            </label>
                            <br />
                            <label>
                                Description:
                                <textarea name="description" onChange={(e) => {
                                    setDescription(e.target.value)
                                    }}/>
                            </label>
                            <br />
                            <label>
                                Phone Number:
                                <input
                                    type="number"
                                    name="phone"
                                    pattern="[0-9]{10,15}"
                                    placeholder="Enter your phone number"
                                    onChange={(e) => {
                                        // You may want to add a phone state: 
                                        setPhone(e.target.value)
                                    }}
                                />
                            </label>
                            <br />
                            {/* Google map picker */}
                            <label>
                                Location:
                                <input type="text" name="location" value={location ? `${location.lat}, ${location.lng}` : ''} readOnly />
                                <LocationPicker onLocationSelect={setLocation} />
                            </label>
                            {/* {location && (
                                <div>
                                Selected: {location.lat}, {location.lng}
                                </div>
                            )} */}
                            <br />

                            {/* Add images */}
                             <label>
                                Picture:
                                <input type="file" name="picture" accept="image/*" multiple onChange={(e)=>{
                                    setPicture(Array.from(e.target.files))
                                }}/>
                            </label>

                            <button type="submit" className='submit-button' disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
                            <button type="button" onClick={()=>setOpened(false)} className='cancle-button' >Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
            )}
        
        </>
    )
}
export default AddLostItem;
// AddLostItem.jsx