import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LocationPicker from './LocationPicker'; // Import your location picker component
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddFoundItem.css'; // Import your CSS for styling the popup
import toast from 'react-hot-toast';
import axios from 'axios'; // Import axios for making HTTP requests
import MediaUpload from '/utils/mediaUplaod';



function AddFoundItem() {
    const [opnedPopup, setOpened] = useState(false); // State to control the popup visibility
    const [location, setLocation] = useState(null); // State to store the selected location
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [phone, setPhone] = useState("") // State to store the phone number
    const [picture,setPicture] = useState([])
    const [loading, setLoading] = useState(false);

    async function submit(e){
        e.preventDefault(); // Prevent the default form submission behavior

        setLoading(true); // Set loading state to true

        if (loading) return; // Prevent the default form submission behavior

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
                phoneNumber: phone.toString(),
            };

            axios.post(import.meta.env.VITE_API_URL + '/api/found/', lostItem)
            .then(() => {
                setOpened(false);
                console.log('founded item submitted successfully');
                toast.success("founded item submitted successfully")
                 // Close the popup after submission
            })
            .catch((error) => {
                console.log('Error submitting founded item:', error);
                toast.error("Error submitting founded item")
            });

        }catch(error) {
            console.log('Error submitting founded item:', error);
            toast.error("Error submitting founded item")
        }
        finally {
            setLoading(false); // Reset loading state after submission
        }
    }

    return(
        <>
            <Button className='found-button' onClick={()=>setOpened(true)} >Found</Button>

            {opnedPopup && ( // If setOpened is true, show the popup
            <div className="popup-overlay">
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Found Item</h2>
                        <form onSubmit={submit}>
                            <label>
                                Item Name
                                <input type="text" name="itemName" onChange={(e) => {
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
                                        console.log(e.target.value)
                                    }}
                                />
                            </label>
                            <br />


                            <form>
                                
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
                            </form>
                            <br />

                            <label>
                                Picture:
                                 <input type="file" name="picture" accept="image/*" multiple onChange={(e)=>{
                                    setPicture(Array.from(e.target.files))
                                }} />
                            </label>


                            <button type="submit" className='submit-button' disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
                            <button type="button" onClick={()=>setOpened(false)} className='cancel-button'>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
            )}
        
        </>
    )
}
export default AddFoundItem;