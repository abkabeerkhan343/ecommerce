export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

export const validateName = (name) => {
  return name && name.length >= 2;
};

export const validatePhone = (phone) => {
  const re = /^\+?[\d\s-]{10,}$/;
  return re.test(phone);
};

export const validatePrice = (price) => {
  return !isNaN(price) && price >= 0;
};

export const validateProductData = (data) => {
  const errors = {};

  if (!data.name || data.name.length < 3) {
    errors.name = 'Product name must be at least 3 characters';
  }

  if (!validatePrice(data.price)) {
    errors.price = 'Invalid price';
  }

  if (!data.description || data.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateOrderData = (data) => {
  const errors = {};

  if (!validateName(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateName(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.address) {
    errors.address = 'Address is required';
  }

  if (!data.city) {
    errors.city = 'City is required';
  }

  if (!data.state) {
    errors.state = 'State is required';
  }

  if (!data.zipCode) {
    errors.zipCode = 'ZIP code is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
