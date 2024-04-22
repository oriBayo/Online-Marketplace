import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import MessageComp from '../components/MessageComp';
import LoaderComp from '../components/LoaderComp';
import { Link } from 'react-router-dom';
import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from '../features/orderApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const OrderPage = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful');
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('Payment successful');
  };
  const onError = (error) => {
    toast.error(error.message);
  };
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
      toast.success('Order delivered');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Container>
      <Row>
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            <h1 className='my-4'>Order {order._id}</h1>
            <Col className='me-5' md={7}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong className='fw-bold'>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong className='fw-bold'>Email: </strong>
                    {order.user.email}
                  </p>
                  <p>
                    <strong className='fw-bold'>Address: </strong>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageComp variant='success'>
                      Delivered on {order.deliveredAt}
                    </MessageComp>
                  ) : (
                    <MessageComp variant='danger'>Not delivered</MessageComp>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong className='fw-bold'>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageComp variant='success'>
                      Paid on {order.paidAt}
                    </MessageComp>
                  ) : (
                    <MessageComp variant='danger'>Not paid</MessageComp>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => {
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <LoaderComp />}

                      {isPending ? (
                        <LoaderComp />
                      ) : (
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver ? (
                    <LoaderComp />
                  ) : (
                    userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <div className='d-grid gap-1 m-2'>
                          <Button className='btn' onClick={deliverOrderHandler}>
                            Mark as delivered
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )
                  )}
                  {error && (
                    <ListGroup.Item>
                      <MessageComp variant='danger'>{error}</MessageComp>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default OrderPage;
