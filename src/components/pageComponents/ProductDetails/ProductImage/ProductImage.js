import { SWInput } from "@/components/reuseComponents/SWInput";
import SWLink from "@/components/reuseComponents/SWLink";
import SWProductCart from "@/components/reuseComponents/SWProductCart";
import { H2, H4, H6, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageSlider from "../ImageSlider/ImageSlider";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartDetail, decrementQuantity, incrementQuantity } from "@/redux/cart.slice";
import SWProductCartList from "@/components/reuseComponents/SWProductCartList";
import { useRouter } from "next/router";
import { toBengaliNumber } from "bengali-number";
import { useTranslation } from 'next-i18next'
import {
	FacebookShareButton,
	TwitterShareButton,
	// InstapaperShareButton,
	PinterestShareButton,
	FacebookIcon, TwitterIcon, PinterestIcon
} from "react-share";
import { useUrl } from 'nextjs-current-url';
import { addToWishlist } from "@/redux/wishlist.slice";


const ProductImage = ({ productData }) => {
	const [count, setCount] = useState(0);
	const [userData, setUserData] = useState({})
	const [wishList, setWishlist] = useState({});
	const [recommendedProduct, setRecommendedProduct] = useState([])
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const router = useRouter();
	const { href: currentUrl, pathname } = useUrl() ?? {};
	const language = router.locale;

	const { t } = useTranslation('blog')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const userlocal = localStorage.getItem('user');
			const user = JSON.parse(userlocal);
			setUserData(user);
		}
	}, []);
	useEffect(() => {
		getRecommendedProduct()
		if (userData !== undefined && userData !== null && Object.keys(userData).length > 0) {
			getWishlist()
		}
	}, [productData, userData]);

	const getTotalQty = () => {
		const cartData = cart.find(res => res.id === productData.id);
		return cartData?.quantity ?? 1
	}

	const getWishlist = async () => {
		try {
			const response = await axios.get(`${baseUrl}/wishListsByUser/${userData.id}/${productData.id}`, { headers: headers });
			setWishlist(response.data.data[0]);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	};

	const getRecommendedProduct = async () => {
		try {
			const response = await axios.get(`${baseUrl}/getCategoryWiseProduct/${productData.category_id}/${productData.id}`);
			setRecommendedProduct(response.data);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	}

	console.log('productData.product_images', productData, wishList)



	const buyNow = async (e, data) => {
		e.preventDefault();
		if (userData) {
			const cartData = cart.findIndex(res => res.id === data.id);
			if (cartData !== -1) {
				router.push('/check-out')
			} else {
				cartAdd(data);
				router.push('/check-out')
			}
		} else {
			toast.error('Please Login')
		}
	}
	const increment = async (data) => {
		const cartData = cart.findIndex(res => res.id === data.id);
		if (cartData !== -1) {
			const formData = new FormData();
			formData.append('product_id', data.id ?? '');
			formData.append('user_id', userData.id ?? '');
			formData.append('qty', 1 ?? '');
			formData.append('price', data.sale_price ?? '');
			formData.append('discount', data.discount ?? '');
			formData.append('vat', data.vat ?? '');
			formData.append('type', 'increment');
			await axios.post(`${baseUrl}/updateCart`, formData, { headers: headers });
			dispatch(incrementQuantity(data.id))
		} else {
			setCount(function (prevCount) {
				return (prevCount += 1);
			});
		}
	}
	const decrement = async (data) => {
		const cartData = cart.findIndex(res => res.id === data.id);
		if (cartData !== -1) {
			const formData = new FormData();
			formData.append('product_id', data.id ?? '');
			formData.append('user_id', userData.id ?? '');
			formData.append('qty', 1 ?? '');
			formData.append('price', data.sale_price ?? '');
			formData.append('discount', data.discount ?? '');
			formData.append('vat', data.vat ?? '');
			formData.append('type', 'decrement');
			await axios.post(`${baseUrl}/updateCart`, formData, { headers: headers });
			dispatch(decrementQuantity(data.id))
		} else {
			setCount(function (prevCount) {
				if (prevCount > 0) {
					return (prevCount -= 1);
				} else {
					return (prevCount = 0);
				}
			})
		}
	}

	const cartAdd = async (data) => {
		if (userData) {
			if (productData.stock_in > productData.stock_out) {
				const discount = data.sale_price - ((data.sale_price * data.discount) / 100);
				const formData = new FormData();
				formData.append('product_id', data.id ?? '');
				formData.append('user_id', userData.id ?? '');
				formData.append('qty', count + 1 ?? '');
				formData.append('price', discount?discount:data.sale_price ?? '');
				formData.append('discount', data.discount ?? '');
				formData.append('vat', data.vat ?? '');
				data.quantity = count + 1;
				const addData = await axios.post(`${baseUrl}/carts`, formData, { headers: headers });
				dispatch(addToCartDetail(data));
				toast.success('List added successfully')
			} else {
				toast.error('Not enough data to add')
			}
		} else {
			toast.error('Please Login')
		}
	}

	const addWishList = async (data) => {
		if (userData) {
			const formData = new FormData();
			formData.append('product_id', data.id ?? '');
			formData.append('user_id', userData.id ?? '');
			formData.append('qty', 1 ?? '');
			formData.append('price', data.sale_price ?? '');
			formData.append('discount', data.discount ?? '');
			formData.append('vat', data.vat ?? '');
			const addData = await axios.post(`${baseUrl}/wishLists`, formData, { headers: headers });
			setWishlist(addData.data.data)
			dispatch(addToWishlist(data));
			toast.success('List added successfully')
		} else {
			toast.error('Please Login')
		}
	}

	const discount = productData.sale_price - ((productData.sale_price * productData.discount) / 100);
	return (
		<>
			<section className="sw__image__slider">
				<Container>
					<Row>
						<Col lg={12}>
							<P p={`Home > ${productData.product_name}`} />
						</Col>
						<Col lg={9}>
							<Row>
								<Col lg={6}>
									{productData.product_images && <ImageSlider images={productData.product_images} altText={productData.alt_text} />}
								</Col>
								<Col lg={6}>
									<div className="sw__image__slider__description">
										<H6 h6={eval(productData.stock_in) > eval(productData.stock_out) ? "IN STOCK" : "STOCK OUT"} />
										<H2 h2={productData.product_name} />
										{/* sw_ratting */}
										<div className="sw_ratting">
											{Array.from(Array(eval(productData.rating)), (e, i) => <i key={i} className="flaticon-star"></i>)}
											<span>({productData.rating ?? 0})</span>
										</div>

										{/* sw__weight */}
										<div className="sw__weight">
											<h5>
												<span>{productData.unit} </span> {language === 'bn' ? productData.unit_name_bn : productData.unit_name}
											</h5>
											<h5>
												<span>Brand: </span> {language === 'bn' ? productData.brand_name_bn : productData.brand_name}
											</h5>
											<h5>
												<span>SKU: </span> {productData.product_sku}
											</h5>
										</div>

										{/* sw__price */}
										<div className="sw__price">
											<h3>
												<i className="flaticon-taka"></i> {discount ? language === 'bn' ? toBengaliNumber(discount) : discount : language === 'bn' ? toBengaliNumber(productData.sale_price) : productData.sale_price}
											</h3>
											<del>
												<i className="flaticon-taka"></i> {language === 'bn' ? toBengaliNumber(productData.sale_price) : productData.sale_price}
											</del>
										</div>

										{/* app__price */}
										{productData.app_price && <div className="sw__app__price">
											<h5>
												App Price :<i className="flaticon-taka"></i> {language === 'bn' ? toBengaliNumber(productData.app_price) : productData.app_price}
											</h5>
										</div>}

										{/* sw__quintity */}
										<div className="sw__quintity">
											<button onClick={() => decrement(productData)} className="sw__decrement">
												-
											</button>
											<SWInput
												name={count}
												// placeholder={count + 1}
												value={language === 'bn' ? toBengaliNumber(getTotalQty() !== 1 ? getTotalQty() : count + 1) : getTotalQty() !== 1 ? getTotalQty() : count + 1}
												type="number"
											/>
											<button onClick={() => increment(productData)} className="sw__increment">
												+
											</button>
										</div>

										{/* sw__button */}
										<div className="sw__button">
											{eval(productData.stock_in) > eval(productData.stock_out) ? (
												<>
													<button className="bg" onClick={() => cartAdd(productData)}>
														<i className="flaticon-online-shopping"></i> {t("Add to Cart")}
													</button>
													<div className="sw__link">
														<Link href={'#'} onClick={(e) => buyNow(e, productData)} >{t("Buy Now")}</Link>
													</div>
												</>) : (
												<div className="sw__product__button sw__duel__button">
													<button className="bg" disabled>
														<i className="flaticon-out-of-stock"></i> Stock out
													</button>
													<button className="bg">Request</button>
												</div>
											)}
											{eval(wishList?.product_id) === productData.id ? <div className="sw__wishlist" onClick={() => addWishList(productData)}>
												<i className="flaticon-heart-1"></i>
											</div> : <div className="sw__wishlist" onClick={() => addWishList(productData)}>
												<i className="flaticon-heart"></i>
											</div>}
											{/* {wishlist ? (
                        <div onClick={handleWishList} className="sw__wishlist">
                          <i className="flaticon-heart"></i>
                        </div>
                      ) : (
                        <div onClick={handleWishList} className="sw__wishlist">
                          <i className="flaticon-heart-1"></i>
                        </div>
                      )} */}
										</div>
									</div>

									{/* <P p={productData.short_desc} /> */}
									<div contentEditable='true'
										dangerouslySetInnerHTML={{ __html: productData.short_desc }}
									/>

									<div className="sw__category">
										<H4 h4={language === 'bn' ? productData.category_name_bn : productData.category_name} />
										<SWLink url="#" name="Makeup" />
										<SWLink url="#" name="Face" />
									</div>

									<div className="sw__category">
										<H4 h4={productData.tags} />
										<SWLink url="#" name="Makeup" />
										<SWLink url="#" name="Face" />
									</div>

									<div className="sw__category sw__social">
										<H4 h4="Share" />
										<FacebookShareButton url={currentUrl}>
											<FacebookIcon width={40} />
										</FacebookShareButton>
										<TwitterShareButton url={currentUrl}>
											<TwitterIcon width={40} />
										</TwitterShareButton>
										{/* <InstapaperShareButton url={currentUrl}>
                      <i className="flaticon-instagram"></i>
                    </InstapaperShareButton> */}
										<PinterestShareButton url={currentUrl} media={currentUrl}>
											<PinterestIcon width={40} />
										</PinterestShareButton>
									</div>
								</Col>
							</Row>
						</Col>
						{/* product */}

						<Col xs={6} lg={3} className="sw__remove__modal">
							<div className="sw__recommend__product">
								<H4 h4="Recommend for you" />
								<div className="sw__recommend__product__item">
									{recommendedProduct?.map((data, i) => (
										<div className="sw__home__product__item" key={i}>
											<SWProductCartList
												image={data.thumbnail_image}
												imgUrl={data.product_slug}
												title={data.product_name}
												title_bn={data.product_name_bn}
												titleUrl={data.product_slug}
												price={data.sale_price}
												discountPrice={discount}
												discount={data.discount}
												discountType={data.discount ? `Save ${data.discount}%` : ``}
												appPrice={data.app_price}
												stockIn={data.stock_in}
												stockOut={data.stock_out}
												rating={data.rating}
												productType={'data.productType'}
												isButton={false}
												data={data}
											/>
										</div>
									))}
								</div>
							</div>
						</Col>
					</Row>

					{/* sw__gaps */}
					<div className="sw__gaps"></div>
				</Container>
			</section>
		</>
	);
};

export default ProductImage;
