import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';

function HomeScreen (props) {
    //const [products, setProduct] = useState([]); 
    const productList = useSelector(state => state.productList);
	const category = props.match.params.id ? props.match.params.id : '';
    const{products, loading, error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
     /*const fetchData = async () =>{
         const {data} = await axios.get("/api/products");
         setProduct(data);
     } 
     fetchData();*/
    dispatch(listProducts(category));
    return () => {
    }         
    },[category])

    return <div>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
     {loading && <div>Loading...</div>}
     {error && <div>{error}</div>}
    <h2 style={{marginLeft:"20px"}}>Our Products</h2>
	{category &&
      <h2 style={{marginLeft:"10px"}}>{category}</h2>}
     <ul className="products">
           {
           products.map(product =>
           <li key={product._id}>
                <div className="product">
                <Link to={'/product/' + product._id}>
                   <img className="product-image" src={product.image} alt="product"/>
                    <div className="product-name">{product.name}</div>
                    </Link>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating fa fa-star">{product.rating} Stars ({product.numReviews} Reviews)</div>
                </div>
            </li>
           )
         }
        </ul>

        </div>
}

export default HomeScreen;