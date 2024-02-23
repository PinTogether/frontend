import styles from "@/styles/containers/collection/_collectionPage.module.scss";
import PinCard from "../../components/PinCard";
import Comment from "../../components/Comment";
import { PinForPlace } from "@/types/Pin";
import Pin from "@/types/Pin";

/*
{
  "centerPin": {
    "id": 1,
    "collectionId": 104,
    "writer": "John Doe",
    "comment": "Central location with a unique vibe.",
    "createdAt": "2024-02-16T12:00:00Z",
    "saveCnt": 20,
    "roadNameAddress": "100 Main St, Central City, Wonderland",
    "placeName": "Central Park",
    "phoneNumber": "+1231231234",
    "image": "/path/to/center_image.jpg",
    "xPos": 38.9072,
    "yPos": -77.0369
  },
  "pins": [
    {
      "id": 2,
      "collectionId": 101,
      "writer": "Alice Johnson",
      "comment": "Lovely place with a great view.",
      "createdAt": "2024-02-13T12:00:00Z",
      "saveCnt": 5,
      "roadNameAddress": "200 Lake Ave, Sunnyville, Wonderland",
      "placeName": "Sunset Lake",
      "phoneNumber": "+1234567890",
      "image": "/path/to/image1.jpg",
      "xPos": 37.5665,
      "yPos": 126.9780
    },
    {
      "id": 3,
      "collectionId": 102,
      "writer": "Bob Smith",
      "comment": "A must-visit for foodies.",
      "createdAt": "2024-02-14T12:00:00Z",
      "saveCnt": 10,
      "roadNameAddress": "300 Foodie St, Gourmet Town, Wonderland",
      "placeName": "Gourmet Plaza",
      "phoneNumber": "+0987654321",
      "image": "/path/to/image2.jpg",
      "xPos": 40.7128,
      "yPos": -74.0060
    },
    {
      "id": 4,
      "collectionId": 103,
      "writer": "Charlie Kim",
      "comment": "Historic site with beautiful architecture.",
      "createdAt": "2024-02-15T12:00:00Z",
      "saveCnt": 15,
      "roadNameAddress": "400 History Blvd, Oldtown, Wonderland",
      "placeName": "Historic Oldtown",
      "phoneNumber": "+1122334455",
      "image": "/path/to/image3.jpg",
      "xPos": 34.0522,
      "yPos": -118.2437
    }
  ]
}
*/

export default function CollectionWithPinCommentRenderer({
  data,
  pin,
}: {
  data: PinForPlace[];
  pin: Pin;
}) {
  return (
    <section className={styles.collectionListContainer}>
      {data.map((pinComment, index) => (
        <PinCard key={index} pinData={pin}>
          <Comment commentData={pinComment} />
        </PinCard>
      ))}
    </section>
  );
}
