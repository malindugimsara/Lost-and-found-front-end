import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ItemCard.css';
import React from 'react';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';


function ResentItemCard(item) {

  // console.log(item.pro);
  const lostItem = item.pro; // Assuming 'item' is the prop passed to this component

  const itemName = lostItem.name; // Example item name
  const itemDescription = lostItem.description; // Example description
  const ItemPhone = lostItem.phoneNumber; // Example phone number
  const itemLocation = lostItem.location; // Example location
  const itemDate = lostItem.date ? new Date(lostItem.date).toLocaleDateString() : "";
  const itemTime = lostItem.date ? new Date(lostItem.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""; // Example date
  const itemImage = lostItem.image; // Example image URL

  const [showMap, setShowMap] = React.useState(false);


  return (
    <>
    <Card className='card-item'>
      <div className='card-image'>
        <Card.Img variant="" src={itemImage[0]}/>
      </div>
        <Card.Body className='card-body'>
          <Card.Title className='card-title'>{itemName}</Card.Title>
          <Card.Text className='card-text'>
            {itemDescription}
          </Card.Text>
          
          <Card.Text className='card-text'>
            Contact Me:{ItemPhone}
          </Card.Text>

          <Card.Text className='card-text'>
            <small className="text-muted">Date: {itemDate}</small> <br />
            <small className="text-muted">Time: {itemTime}</small>
          </Card.Text>
          
          <Button
            variant="primary"
            onClick={() => {
              if (itemLocation && itemLocation.lat && itemLocation.lng) {
                setShowMap(true);
              } else {
                toast.error("Location not available");
              }
            }}
          >
            Location
          </Button>
        </Card.Body>
    </Card>
    {showMap && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowMap(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: 0,
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              position: "relative",
              width: "90vw",
              maxWidth: 600,
              height: "60vh",
              overflow: "hidden",
            }}
            onClick={e => e.stopPropagation()}>
              <IoMdClose size={40} onClick={() => setShowMap(false)} style={{ position: "absolute", top: 10, right: 10, zIndex: 2,cursor: "pointer" }} />
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps?q=${itemLocation.lat},${itemLocation.lng}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default ResentItemCard;