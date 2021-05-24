import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({count, dispatch}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://hot-onion.herokuapp.com/api/v1/foods')
            .then(res => res.json())
            .then(data => {
                setProducts(data.data.foods);
            })
    }, [])

    return (
        <div>

            <div className="row justify-content-center" >
                {
                    products.length == 0 && <h2 className="text-center text-info">Loading...</h2>
                }
                {
                    products && products.map(product =>
                        <div className="col-md-5 m-4">
                            <div className="row">
                                <div className="col-md-5">
                                    <img src={product.img} className="img-fluid" alt="" />
                                </div>
                                <div className="col-md-7 p-3 bg-light">
                                    <h3 className="font-weight-bold">{product.title}</h3>
                                    <span className="text-muted">{product.subtitle}</span>
                                    <p className="mt-3">Category: {product.catagories}</p>
                                    <div className="d-flex">
                                        <div>
                                        <h5 className="text-warning">Price: ${product.price}</h5>
                                        </div>
                                        <div className="ml-auto ">
                                            <div className="d-flex mr-4">
                                                <div className="bg-danger px-3 rounded text-light cursor" onClick={() => dispatch({type: 'DECREASE'})}>-</div>
                                                <div className="bg-white px-3 rounded">{count}</div>
                                                <div className="bg-success px-3 rounded text-light cursor" onClick={() => dispatch({type: 'INCREASE'})}>+</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex">
                                        <div className="mr-4">
                                            <button className="btn btn-warning">Add to cart</button>
                                        </div>
                                        <div className="ml-4">
                                            <Link to={`/details/${product._id}`}>
                                                <button className="btn btn-info">View details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

export default connect(mapStateToProps)(Products);