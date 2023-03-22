
const ItemCard = (props) => {
    
	return (
        <div className="container">
            <h1>{props.author}</h1>
            <p>{props.category}</p>
        </div>
    )
};

export default ItemCard;