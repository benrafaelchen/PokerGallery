"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Input elements for credit card details
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryDateInput = document.getElementById("expiryDate");
  const cvvInput = document.getElementById("cvv");

  // Validation function for the expiry date
  const isValidExpiryDate = (expiryDate) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const [inputMonth, inputYear] = expiryDate
      .split("/")
      .map((part) => parseInt(part, 10));

    return (
      inputYear > currentYear ||
      (inputYear === currentYear && inputMonth >= currentMonth)
    );
  };

  // Add input event listener for card number formatting
  cardNumberInput.addEventListener("input", (event) => {
    const isBackspace = event.inputType === "deleteContentBackward";

    let cardNumber = cardNumberInput.value.replace(/-/g, "");

    if (isBackspace) {
      cardNumber = cardNumber.substring(0, cardNumber.length - 1);
    }

    const formattedCardNumber = cardNumber.replace(/(\d{4})/g, "$1-").trim();
    cardNumberInput.value = formattedCardNumber.substring(0, 19);
  });

  // Add input event listener for expiry date formatting and validation
  expiryDateInput.addEventListener("input", (event) => {
    const isBackspace = event.inputType === "deleteContentBackward";

    let expiryDate = expiryDateInput.value.replace(/\//g, "");

    if (isBackspace) {
      expiryDate = expiryDate.substring(0, expiryDate.length - 1);
    }

    const formattedExpiryDate = expiryDate.replace(/^(\d{2})/, "$1/").trim();
    expiryDateInput.value = formattedExpiryDate.substring(0, 7);

    if (!isValidExpiryDate(formattedExpiryDate)) {
      expiryDateInput.setCustomValidity("Invalid expiry date");
    } else {
      expiryDateInput.setCustomValidity("");
    }
  });

  // Add input event listener for CVV formatting
  cvvInput.addEventListener("input", () => {
    const cvv = cvvInput.value.replace(/\D/g, "");
    cvvInput.value = cvv.substring(0, 3);
  });

  // Form submission handling
  const purchaseForm = document.querySelector("form");
  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showSuccessMessage();
  });

  // Function to calculate total price
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    const selectedOptions = document.querySelectorAll(
      "#productName option:checked"
    );
    selectedOptions.forEach((option) => {
      const quantity = document.getElementById("quantity").value;
      const QuantityNum = Number(quantity);
      const price = parseFloat(option.getAttribute("data-price"));
      console.log(QuantityNum);
      totalPrice += price * QuantityNum;
    });
    return totalPrice;
  };

  // Function to update total price display
  const updateTotalPriceDisplay = () => {
    const totalPriceInput = document.getElementById("totalPrice");
    const totalPrice = calculateTotalPrice();
    totalPriceInput.value = `$${totalPrice}`;
  };

  // Add input event listener to quantity inputs to update total price display
  document.querySelectorAll("#quantity").forEach((input) => {
    input.addEventListener("input", updateTotalPriceDisplay);
  });

  // Function to show success message
  const showSuccessMessage = () => {
    purchaseForm.style.display = "none";
    const successMessage = document.createElement("div");
    successMessage.className = "success-message";
    successMessage.textContent =
      "Congratulations! The payment was completed successfully ☻";
    document.querySelector("main").appendChild(successMessage);
  };
});
