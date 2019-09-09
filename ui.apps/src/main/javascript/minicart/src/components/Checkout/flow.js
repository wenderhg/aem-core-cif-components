/*******************************************************************************
 *
 *    Copyright 2019 Adobe. All rights reserved.
 *    This file is licensed to you under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License. You may obtain a copy
 *    of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software distributed under
 *    the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 *    OF ANY KIND, either express or implied. See the License for the specific language
 *    governing permissions and limitations under the License.
 *
 ******************************************************************************/
import React, { useState } from 'react';

import Cart from './cart';
import Form from './form';
import classes from './flow.css';
import Receipt from './receipt';

const isCartReady = cart => {
    return cart && cart.items.length > 0;
};

const Flow = props => {
    const { cart, cartId, handleCloseCart, handleResetCart } = props;
    console.log(`This is our cart `, cart);

    const [flowState, setFlowState] = useState('cart');
    const [order, setOrder] = useState({});

    const beginCheckout = () => {
        console.log(`Beginning checkout`);
        setFlowState('form');
    };

    const cancelCheckout = () => {
        console.log('Cancelling checkout');
        setFlowState('cart');
    };

    const orderCreated = order => {
        console.log('Order created');
        setOrder(order);
        setFlowState('receipt');
    };

    let child;

    switch (flowState) {
        case 'cart': {
            child = <Cart beginCheckout={beginCheckout} ready={isCartReady(cart)} submitting={false} />;
            break;
        }
        case 'form': {
            child = (
                <Form
                    cancelCheckout={cancelCheckout}
                    cart={{ ...cart, cartId }}
                    receiveOrder={orderCreated}
                    resetCart={handleResetCart}
                />
            );
            break;
        }
        case 'receipt': {
            child = <Receipt order={order} handleCloseCart={handleCloseCart} handleResetCart={handleResetCart} />;
            break;
        }
        default: {
            child = null;
        }
    }

    return <div className={classes.root}>{child}</div>;
};

export default Flow;