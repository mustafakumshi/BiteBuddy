import Description from "./Description";
import { FOOD_ITEM_URL } from "../utils/constants";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";
import { showSnackbar } from "../store/snackbarSlice";
import Snackbar from "./Snackbar";

const RestaurantMenuItem = ({
  open,
  title,
  numberOfItems,
  showItemCard,
  foodItems,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleCartItem = (item) => {

    const isItemInCart = cartItems.some(cartItem => cartItem.card.info.id === item.card.info.id);
  
    if (isItemInCart) {
      dispatch(
        showSnackbar({
          message: "Item already present in Cart",
          type: "error",
          time: 1500,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Item added to Cart",
          type: "success",
          time: 1500,
        })
      );
      dispatch(addItem({ ...item, amount: 1 }));
    }
  };

  return (
    <div className="flex flex-col w-full my-2">
      <div
        data-testid="foodCategory"
        className="flex justify-between cursor-pointer"
        onClick={showItemCard}
      >
        <h3 className="text-2xl font-bold text-gray-500">
          {title} ({numberOfItems})
        </h3>
        <button className="no-underline border-0 w-16 h-8" type="button">
          {!open ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      </div>
      {open &&
        foodItems?.map((foodItem) => {
          return (
            <div key={foodItem?.card?.info?.id}>
              <div className="mt-8 flex flex-col-reverse md:flex-row w-full justify-between">
                <div className="md:w-9/12 flex flex-col">
                  <div>
                    {foodItem?.card?.info?.isVeg ? (
                      <img
                        className="w-6"
                        src="https://img.icons8.com/?size=100&id=61083&format=png&color=000000"
                        alt="veg-nonveg"
                      />
                    ) : (
                      <img
                        className="w-6"
                        src="https://img.icons8.com/?size=100&id=61082&format=png&color=000000"
                        alt="veg-nonveg"
                      />
                    )}
                  </div>
                  <h2
                    data-testid="foodItemName"
                    className="font-sans text-2xl mb-1 text-gray-600"
                  >
                    {foodItem?.card?.info?.name}
                  </h2>
                  <div className="font-bold mb-1 text-lg text-gray-600">
                    ₹
                    {(foodItem?.card?.info?.defaultPrice ||
                      foodItem?.card?.info?.price) / 100}
                  </div>
                  <div className="flex w-fit gap-1 bg-orange-400 rounded-md p-1 text-white items-center text-sm mb-1">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    {foodItem?.card?.info?.ratings?.aggregatedRating?.rating ||
                      "4.0"}
                  </div>
                  <Description foodItem={foodItem?.card?.info?.description} />
                </div>
                <div className="md:w-2/12 flex flex-col justify-center items-center">
                  <img
                    className="w-64 h-64 md:w-32 md:h-32 rounded-2xl"
                    src={FOOD_ITEM_URL + foodItem?.card?.info?.imageId}
                    alt="menu-item"
                  />
                  <button
                    onClick={() => handleCartItem(foodItem)}
                    className="bg-white border-2 w-28 h-10 rounded-lg relative overflow-hidden flex items-center justify-center shadow-md cursor-pointer bottom-5 font-medium mx-auto active:transform active:scale-95"
                  >
                    Add
                  </button>
                </div>
              </div>
              <hr className="mt-2 text-gray-900 opacity-75" />
            </div>
          );
        })}
      <Snackbar />
    </div>
  );
};

export default RestaurantMenuItem;
