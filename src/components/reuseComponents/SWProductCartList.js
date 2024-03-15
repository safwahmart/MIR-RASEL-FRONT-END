import Link from "next/link";
import { useEffect, useState } from "react";
import SWImages from "./SWImages";
import { H3, H4, H6 } from "./Tags";

// Skeleton for loading
import { Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ModalProductDetails from "../pageComponents/ProductDetails/ModalProductDetails";
import { baseUrl, imageUrl } from "@/api/apiConfig";
import { useDispatch } from "react-redux";
import { addToCart } from '@/redux/cart.slice';
import axios from "axios";
import { headers } from "@/api/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { toBengaliNumber } from 'bengali-number'
import { FaHeart } from 'react-icons/fa'
import { addToWishlist, removeFromWishlist } from "@/redux/wishlist.slice";
import useConfirmationDialog from "../hook/useConfirmationDialog";

const SWProductCartList = ({
	imgUrl,
	titleUrl,
	image,
	price,
	discountPrice,
	discountType,
	productType,
	discount,
	appPrice,
	title,
	title_bn,
	stockIn,
	stockOut,
	rating,
	isButton,
	data
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const language = router.locale;
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState({})

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [settings, setSettings] = useState({});
	const [wishList, setWishlist] = useState({});
	const handleConfirmationDialog = useConfirmationDialog(
		language === 'en' ? 'Request for the Product?' : 'ট্যাগ মুছবেন?',
		language === 'en' ? 'Would you want to send request?' : 'আপনি মুছে ফেলতে চান?',
		language === 'en' ? 'Yes' : 'হ্যাঁ, মুছে দিন'
	);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			setLoading(false);
		}, 300);
		if (typeof window !== 'undefined') {
			const userlocal = localStorage.getItem('user');
			const user = JSON.parse(userlocal);
			setUserData(user);
			if (user) {
				getWishlist(user)
			}
		}
		getSettings();
		return () => clearTimeout(timer);
	}, []);

	const getSettings = async () => {
		try {
			const response = await axios.get(`${baseUrl}/getSettings`);
			setSettings(response.data);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	};
	const getWishlist = async (user) => {
		try {
			const response = await axios.get(`${baseUrl}/wishListsByUser/${user.id}/${data.id}`, { headers: headers });
			setWishlist(response.data.data[0]);
		} catch (error) {
			console.error("Error fetching settings:", error);
		}
	};
	console.log('wishlist', wishList)

	const cartAdd = async (data) => {
		if (userData) {
			if (stockIn > stockOut) {
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
			}else{
				toast.error('Not enough data to add')
			}
		} else {
			toast.error('Please Login')
		}
	}
	const requestAdd = async (data) => {
		if (userData) {
			const confirmed = await handleConfirmationDialog();
			if (confirmed) {
				const formData = new FormData();
				formData.append('product_id', data.id ?? '');
				formData.append('user_id', userData.id ?? '');
				const addData = await axios.post(`${baseUrl}/requestLists`, formData, { headers: headers });
				toast.success('Request added successfully')
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
	const removeWishList = async (data) => {
		if (userData) {
			const addData = await axios.delete(`${baseUrl}/wishLists/${data.id}`, { headers: headers });
			setWishlist({})
			dispatch(removeFromWishlist(data.id))
			toast.success('Remove from WishList successfully')
		} else {
			toast.error('Please Login')
		}
	}
	return (
		<>
			{loading ? (
				<Skeleton height={400} />
			) : (
				<div className="sw__product__cart">
					{/* image */}
					<div className="sw__product__img">
						<Link href={`/product-details/${imgUrl}`}>
							<SWImages
								image={`${imageUrl}/uploads/${image}`}
								alt="product-img"
								width="350"
								height="300"
							/>
						</Link>
						{/* eye */}
						<div className="eye" onClick={handleShow}>
							<i className="flaticon-eye"></i>
						</div>
						{/* heart */}
						{eval(wishList?.product_id) === data.id ? <div className="sw__product__heart" onClick={() => removeWishList(data)}>
							<i className="flaticon-heart-1"></i>
						</div> : <div className="sw__product__heart" onClick={() => addWishList(data)}>
							<i className="flaticon-heart"></i>
						</div>}
					</div>
					<div className="sw__product__content">
						{/* price */}
						<div className="sw__product__price">
							<i className="flaticon-taka"></i>
							{settings?.discount === "1" && <H3 h3={discountPrice ? language === 'bn' ? toBengaliNumber(discountPrice) : discountPrice : language === 'bn' ? toBengaliNumber(price) : price} />}
							{settings?.offer_price === "1" && discount && <del>
								<i className="flaticon-taka"></i> {language === 'bn' ? toBengaliNumber(price) : price}
							</del>}
							{discountType == "" ? (
								<span className="d-none">{discountType}</span>
							) : (
								<span>{discountType}</span>
							)}
						</div>
						{settings?.app_price === "1" && appPrice && <h5>
							App Price :<i className="flaticon-taka"></i> {language === 'bn' ? toBengaliNumber(appPrice) : appPrice}
						</h5>}
						<Link href={`/product-details/${titleUrl}`}>
							<H4 h4={language === 'en' ? title : title_bn} />
						</Link>
						<div className="sw__product__type">
							<H6 h6={`${data.unit} ${data.unit_name}`} />
							<div className="sw__product__star">
								{Array.from(Array(eval(data.rating)), (e, i) => <i key={i} className="flaticon-star"></i>)}
							</div>
						</div>

						{eval(stockIn) > eval(stockOut) ? (
							<div className="sw__product__button">
								<button className="bg" onClick={() => cartAdd(data)}>
									{/* <Link href="/check-out"> */}
									<i className="flaticon-online-shopping"></i> Add to Cart
									{/* </Link> */}
								</button>
							</div>
						) : (
							<div className="sw__product__button sw__duel__button">
								<button className="bg" disabled>
									<i className="flaticon-out-of-stock"></i> Stock out
								</button>
								<button className="bg" onClick={() => requestAdd(data)}>Request</button>
							</div>
						)}
					</div>
				</div>
			)}

			<Modal
				show={show}
				size="xl"
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
				className="product__cart__modal"
			>
				<Modal.Header closeButton>
					<Modal.Title></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ModalProductDetails data={data} addWishList={addWishList} removeWishList={removeWishList} wishList={wishList} />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default SWProductCartList;
