import React from 'react';
import './Product.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Navbar from '../Navbar/Navbar';

const ProductDetails = ({increase, decrease, count}) => {
    const { id } = useParams();
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetch('https://hot-onion.herokuapp.com/api/v1/foods')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data.data.foods);
            })
    }, [])

    const specificProduct = allProducts.find(data => data._id == id);
    console.log(count);
    return (
        <div>
            <Navbar />
            <h3 className="font-weight-bold text-center my-4">Product details</h3>
            <div className="row justify-content-center">
                {
                    specificProduct &&
                    <div className="col-md-8 m-4">
                        <div className="row">
                            <div className="col-md-5">
                                <img src={specificProduct.img} className="img-fluid" alt="" />
                            </div>
                            <div className="col-md-7 p-3 bg-light">
                                <h3 className="font-weight-bold">{specificProduct.title}</h3>
                                <span className="text-muted">{specificProduct.subtitle}</span>
                                <p className="mt-3">Category: {specificProduct.catagories}</p>

                                <p className="my-4 text-muted">{specificProduct.description}</p>

                                <h5 className="text-warning">Price: ${specificProduct.price}</h5>
                                <div className="d-flex mr-4 my-3">
                                    <div className="bg-danger px-3 rounded text-light cursor" onClick={() => decrease()}>-</div>
                                    <div className="bg-white px-3 rounded">0</div>
                                    <div className="bg-success px-3 rounded text-light cursor" onClick={() => increase()}>+</div>
                                </div>
                                <div className="d-flex">
                                    <div className="mr-4">
                                        <button className="btn btn-warning">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const {count} = ownProps;
    return {
        increase: () => dispatch({type: 'INCREASE'}),
        decrease: () => dispatch({type: 'DECREASE'})
    }
}

export default connect(null, mapDispatchToProps)(ProductDetails);