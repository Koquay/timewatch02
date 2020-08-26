import { CheckoutActionTypes } from "./checkout.actions";

export const CheckoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case CheckoutActionTypes.STORE_CHECKOUT_DATA:
      addCheckoutDataToLocalStorage(action.checkoutData);
      return {
        ...state,
        checkoutData: { ...action.checkoutData },
      };
    default:
      return state;
  }
};

const addCheckoutDataToLocalStorage = (checkoutData) => {
  let localStorageData = JSON.parse(localStorage.getItem("timewatch02"));
  //   if (!localStorageData) {
  //     localStorageData = JSON.parse(JSON.stringify(localStorageDataTmp));
  //   }

  localStorageData.checkoutData = checkoutData;
  localStorage.setItem("timewatch02", JSON.stringify(localStorageData));
};

const initialState = {
  checkoutData: {
    cart: {},

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    shippingAddress: "",
    zipCode: "",
    cityState: "",
    deliveryDate: "",
    specialInstructions: "",
    paymentType: "Credit Card",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cw: "",

    // firstName: "john",
    // lastName: "john",
    // email: "john@john.com",
    // phone: "john",
    // shippingAddress: "john john",
    // zipCode: "88888",
    // cityState: "Boston, MA",
    // deliveryDate: "1/1/21",
    // specialInstructions: "",
    // paymentType: "Credit Card",
    // cardNumber: "12234444",
    // expMonth: "01-January",
    // expYear: "2021",
    // cw: "111",
  },

  citiesStates: [
    { text: "Boston, MA", value: "Boston, MA" },
    { text: "Canton, MA", value: "Canton, MA" },
    { text: "Quincy, MA", value: "Quincy, MA" },
    { text: "Stoughton, MA", value: "Stoughton, MA" },
    { text: "Roslindale, MA", value: "Roslindale, MA" },
  ],

  expMonths: [
    { text: "01-January", value: "01-January" },
    { text: "02-February", value: "02-February" },
    { text: "04-March", value: "04-March" },
    { text: "05-April", value: "05-April" },
    { text: "06-May", value: "06-May" },
    { text: "06-Jun", value: "06-Jun" },
    { text: "08-July", value: "08-July" },
    { text: "09-August", value: "09-August" },
    { text: "00-September", value: "00-September" },
    { text: "11-November", value: "11-November" },
    { text: "12-December", value: "12-December" },
  ],

  expYears: [
    { text: "2020", value: "2020" },
    { text: "2021", value: "2021" },
    { text: "2022", value: "2022" },
    { text: "2023", value: "2023" },
    { text: "2024", value: "2024" },
    { text: "2025", value: "2025" },
    { text: "2026", value: "2026" },
    { text: "2027", value: "2027" },
    { text: "2028", value: "2028" },
    { text: "2029", value: "2029" },
  ],
};
