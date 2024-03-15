import { SWInput } from "@/components/reuseComponents/SWInput";
import SWLink from "@/components/reuseComponents/SWLink";
import { H2, H4, H6, P } from "@/components/reuseComponents/Tags";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ImageSlider from "./ImageSlider/ImageSlider";
import { useRouter } from "next/router";
import { toBengaliNumber } from "bengali-number";
import { useTranslation } from "next-i18next";
import {
	FacebookIcon,
	FacebookShareButton,
	PinterestIcon,
	PinterestShareButton,
	TwitterIcon,
	TwitterShareButton,
} from "react-share";
import { useUrl } from "nextjs-current-url";
import MetaHead from "@/utilities/MetaHead";
import { addToCart, decrementQuantity, incrementQuantity } from "@/redux/cart.slice";
import axios from "axios";
import { baseUrl } from "@/api/apiConfig";
import { headers } from "@/api/auth";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ModalProductDetails = ({
	data, addWishList, removeWishList, wishList
}) => {
	const [count, setCount] = useState(0);
	const [userData, setUserData] = useState({});
	const router = useRouter();
	const language = router.locale;
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { href: currentUrl, pathname } = useUrl() ?? {};
	const productData = data;

	const { t } = useTranslation("blog");

	useEffect(() => {
		if (typeof window !== "undefined") {
			const userlocal = localStorage.getItem("user");
			const user = JSON.parse(userlocal);
			setUserData(user);
		}
	}, []);

	const getTotalQty = () => {
		const cartData = cart.find(res => res.id === data.id);
		return cartData?.quantity ?? 1
	}

	const cartAdd = async (data) => {
		if (userData) {
			if (productData.stock_in > productData.stock_out) {
				const discount = data.sale_price - ((data.sale_price * data.discount) / 100);
				const formData = new FormData();
				formData.append('product_id', data.id ?? '');
				formData.append('user_id', userData.id ?? '');
				formData.append('qty', 1 ?? '');
				formData.append('price', discount?discount:data.sale_price ?? '');
				formData.append('discount', data.discount ?? '');
				formData.append('vat', data.vat ?? '');
				const addData = await axios.post(`${baseUrl}/carts`, formData, { headers: headers });
				dispatch(addToCart(data));
				toast.success('List added successfully')
			} else {
				toast.error('Not enough data to add')
			}
		} else {
			toast.error('Please Login')
		}
	}
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
	const discount = data.sale_price - ((data.sale_price * data.discount) / 100);
	return (
		<>
			<section className="sw__image__slider">
				{data.product_name !== undefined && (
					<MetaHead
						metaTitle={data.product_name}
						metaDesc={data.short_desc}
						metaImage={data?.thumbnail_image}
					/>
				)}
				<Container>
					<Row>
						<Col lg={12}>
							<P
								p={`Home > ${language === "bn" ? data.product_name_bn : data.product_name
									}`}
							/>
						</Col>
						<Col lg={6}>
							<ImageSlider
								images={data.product_images}
								altText={data.alt_text}
							/>
						</Col>
						<Col lg={6}>
							<div className="sw__image__slider__description">
								<H6
									h6={
										eval(data.stock_in) > eval(data.stock_out)
											? "IN STOCK"
											: "STOCK OUT"
									}
								/>
								<H2
									h2={
										language === "bn" ? data.product_name_bn : data.product_name
									}
								/>
								{/* sw_ratting */}
								<div className="sw_ratting">
									{Array.from(Array(eval(data.rating)), (e, i) => (
										<i key={i} className="flaticon-star"></i>
									))}
									{/* <i className="flaticon-star"></i>
                  <i className="flaticon-star"></i>
                  <i className="flaticon-star"></i>
                  <i className="flaticon-star"></i>
                  <i className="flaticon-star"></i> */}
									<span>({data.rating ?? 0})</span>
								</div>

								{/* sw__weight */}
								<div className="sw__weight">
									<h5>
										<span>{data.unit} </span>{" "}
										{language === "bn" ? data.unit_name_bn : data.unit_name}
									</h5>
									<h5>
										<span>Brand: </span>{" "}
										{language === "bn" ? data.brand_name_bn : data.brand_name}
									</h5>
									<h5>
										<span>SKU: </span> {data.product_sku}
									</h5>
								</div>

								{/* sw__price */}
								<div className="sw__price">
									<h3>
										<i className="flaticon-taka"></i>{" "}
										{discount
											? language === "bn"
												? toBengaliNumber(discount)
												: discount
											: language === "bn"
												? toBengaliNumber(data.sale_price)
												: data.sale_price}
									</h3>
									{discount !== 0 && (
										<del>
											<i className="flaticon-taka"></i>{" "}
											{language === "bn"
												? toBengaliNumber(data.sale_price)
												: data.sale_price}
										</del>
									)}
								</div>

								{/* app__price */}
								<div className="sw__app__price">
									<h5>
										App Price :<i className="flaticon-taka"></i>{" "}
										{language === "bn"
											? toBengaliNumber(data.app_price)
											: data.app_price}
									</h5>
								</div>

								{/* sw__quintity */}
								<div className="sw__quintity">
									<button onClick={() => decrement(data)} className="sw__decrement">
										-
									</button>
									<SWInput
										name={count}
										// placeholder={language === 'bn' ? toBengaliNumber(count + 1) : count + 1}
										value={language === 'bn' ? toBengaliNumber(getTotalQty() !== 1 ? getTotalQty() : count + 1) : getTotalQty() !== 1 ? getTotalQty() : count + 1}
										type="number"
									/>
									<button onClick={() => increment(data)} className="sw__increment">
										+
									</button>
								</div>

								{/* sw__button */}

								<div className="sw__button">
									{eval(data.stock_in) > eval(data.stock_out) ? (
										<>
											<button className="bg" onClick={() => cartAdd(data)}>
												<i className="flaticon-online-shopping"></i> {t("Add to Cart")}
											</button>
											{/* <SWLink url="#" name={t("Buy Now")} /> */}
											<div className="sw__link">
												<Link href={'#'} onClick={(e) => buyNow(e, data)} >{t("Buy Now")}</Link>
											</div>
										</>) : (
										<div className="sw__product__button sw__duel__button">
											<button className="bg" disabled>
												<i className="flaticon-out-of-stock"></i> Stock out
											</button>
											<button className="bg">Request</button>
										</div>
									)}
									{/* {wishlist ? (
                    <div onClick={handleWishList} className="sw__wishlist">
                      <i className="flaticon-heart"></i>
                    </div>
                  ) : (
                    <div onClick={handleWishList} className="sw__wishlist">
                      <i className="flaticon-heart-1"></i>
                    </div>
                  )} */}
									{eval(wishList?.product_id) === data.id ? (
										<div
											className="sw__wishlist"
											onClick={() => removeWishList(data)}
										>
											<i className="flaticon-heart-1"></i>
										</div>
									) : (
										<div
											className="sw__wishlist"
											onClick={() => addWishList(data)}
										>
											<i className="flaticon-heart"></i>
										</div>
									)}
								</div>
							</div>

							<P p={data.short_desc} />

							<div className="sw__category">
								<H4 h4={data.category_name} />
								<SWLink url="#" name="Makeup" />
								<SWLink url="#" name="Face" />
							</div>

							<div className="sw__category">
								<H4 h4={data.tags} />
								<SWLink url="#" name="Makeup" />
								<SWLink url="#" name="Face" />
							</div>

							<div className="sw__category sw__social">
								<H4 h4="Share" />
								<FacebookShareButton
									url={currentUrl}
									quote={data.product_name} // Product name as quote
									hashtag="#YourHashtagHere" // Optional: Add a hashtag
								>
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

					{/* sw__gaps */}
					<div className="sw__gaps"></div>
				</Container>
			</section>
		</>
	);
};

export default ModalProductDetails;
