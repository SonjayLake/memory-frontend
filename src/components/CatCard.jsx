/* eslint-disable react/prop-types */
import Image from "react-bootstrap/Image";

function CatCard({ image, shuffle, id }) {
  return (
    <>
      <Image
        src={image}
        className="catCardImage"
        rounded
        onClick={() => shuffle(id)}
      />
    </>
  );
}

export default CatCard;
