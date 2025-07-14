import './ResentItem.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResentItemCard from './ItemCard.jsx';


function ResentItems() {
    const [recentItems, setRecentItems] = useState([]); // State to store recent items
    const [state,setState] = useState("loading")


    useEffect(() => {
        // Fetch recent items from the server
        axios.get(import.meta.env.VITE_API_URL + '/api/lost/')
            .then(response => {
                setRecentItems(response.data); 
                setState("success")
                // Update state with fetched items
            })
            .catch(error => {
                console.error('Error fetching recent items:', error);
            });
    }, []);


    return (
        <>
            <div className="resentItemsContainer"> 
                <h1 className='text-center resent-header'>Recent Items</h1>

                    <Container>
                        <Row>
                            {state === "success" && recentItems.data
                            .slice(-3) // Get the last 3 items
                            .reverse() // Show newest first
                            .map((item, index) => (
                                <Col xs={12} md={6} lg={4} key={index}>
                                    <ResentItemCard pro={item} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
            </div>
        </>
    );
}

export default ResentItems;