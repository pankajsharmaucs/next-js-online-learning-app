import React from 'react'

const page = () => {
  return (
    <main>
      {/* page title area start */}
      <section
        className="page__title-area page__title-height page__title-overlay d-flex align-items-center"
        data-background="/img/page-title/page-title-2.jpg"
      >
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="page__title-wrapper mt-110">
                <h3 className="page__title">My Cart</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Cart
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* page title area end */}
      {/* Cart Area Strat*/}
      <section className="cart-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="course-details.html">
                          <img src="/img/course/sm/cart-1.jpg" alt="" />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="course-details.html">
                          Strategy law and organization Foundation{" "}
                        </a>
                      </td>
                      <td className="product-price">
                        <span className="amount">$130.00</span>
                      </td>
                      <td className="product-quantity text-center">
                        <div className="product-quantity mt-10 mb-10">
                          <div className="product-quantity-form">
                            <form action="#">
                              <button className="cart-minus">
                                <i className="far fa-minus" />
                              </button>
                              <input
                                className="cart-input"
                                type="text"
                                defaultValue={1}
                              />
                              <button className="cart-plus">
                                <i className="far fa-plus" />
                              </button>
                            </form>
                          </div>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span className="amount">$130.00</span>
                      </td>
                      <td className="product-remove">
                        <a href="#">
                          <i className="fa fa-times" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="product-thumbnail">
                        <a href="course-details.html">
                          <img src="/img/course/sm/cart-2.jpg" alt="" />
                        </a>
                      </td>
                      <td className="product-name">
                        <a href="course-details.html">
                          Fundamentals of music theory Learn new
                        </a>
                      </td>
                      <td className="product-price">
                        <span className="amount">$120.50</span>
                      </td>
                      <td className="product-quantity text-center">
                        <div className="product-quantity mt-10 mb-10">
                          <div className="product-quantity-form">
                            <form action="#">
                              <button className="cart-minus">
                                <i className="far fa-minus" />
                              </button>
                              <input
                                className="cart-input"
                                type="text"
                                defaultValue={1}
                              />
                              <button className="cart-plus">
                                <i className="far fa-plus" />
                              </button>
                            </form>
                          </div>
                        </div>
                      </td>
                      <td className="product-subtotal">
                        <span className="amount">$120.50</span>
                      </td>
                      <td className="product-remove">
                        <a href="#">
                          <i className="fa fa-times" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="coupon-all">
                    <div className="coupon d-sm-flex align-items-center">
                      <input
                        id="coupon_code"
                        className="input-text"
                        name="coupon_code"
                        defaultValue=""
                        placeholder="Coupon code"
                        type="text"
                      />
                      <button className="e-btn" name="apply_coupon" type="submit">
                        Apply coupon
                      </button>
                    </div>
                    <div className="coupon2">
                      <button className="e-btn" name="update_cart" type="submit">
                        Update cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 ml-auto">
                  <div className="cart-page-total">
                    <h2>Cart totals</h2>
                    <ul className="mb-20">
                      <li>
                        Subtotal <span>$250.00</span>
                      </li>
                      <li>
                        Total <span>$250.00</span>
                      </li>
                    </ul>
                    <a className="e-btn e-btn-border" href="checkout.html">
                      Proceed to checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cart Area End*/}
    </main>

  )
}

export default page