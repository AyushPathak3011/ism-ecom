/**
 * Check if string contains only alphabets or integers.
 * @param {*} str
 */
const isEmail = (email) => {
  return /^[A-Za-z0-9]+$/.test(email);
};

export default isEmail;
