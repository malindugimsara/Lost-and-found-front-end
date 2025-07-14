import SideBar from "../components/SideBar";
import './MyLostItem.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResentItemCard from "../components/ItemCard";
import { useEffect, useState } from "react";
import axios from 'axios';

function MyFoundItem(){
    const [recentItems, setRecentItems] = useState([]); // State to store recent items
        const [state,setState] = useState("loading")
    
        useEffect(() => {
            // Fetch recent items from the server
            axios.get('http://localhost:3000/api/found/')
                .then(response => {
                    setRecentItems(response.data); 
                    setState("success")
                    // Update state with fetched items
                })
                .catch(error => {
                    console.error('Error fetching recent items:', error);
                });
        }, []);

    return(
        <div>
            <SideBar />
            <div className="ItemsContainer"> 
                <h1>My Found Item</h1>
                <Container>
                    <Row>
                        {state === "success" && recentItems.data
                            .map((item, index) => (
                                <Col xs={12} md={6} lg={4} key={index}>
                                    <ResentItemCard pro={item} />
                                </Col>
                            ))}
                    </Row>
                </Container>
            </div>
        
        </div>
    )

}

export default MyFoundItem;