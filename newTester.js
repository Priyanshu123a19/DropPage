// file: utils.js

// Calculate total price with discount and tax
function calculateTotal(cart, discount = 0, taxRate = 0.1) {
    if (!Array.isArray(cart)) {
        throw new Error("Cart must be an array");
    }

    let subtotal = 0;

    for (let item of cart) {
        if (!item.price || !item.quantity) {
            continue; // skip invalid items
        }

        subtotal += item.price * item.quantity;
    }

    // Apply discount
    if (discount > 0) {
        subtotal = subtotal - (subtotal * discount);
    }

    // Apply tax
    const total = subtotal + (subtotal * taxRate);

    return parseFloat(total.toFixed(2));
}


// Find user by ID
function findUserById(users, id) {
    if (!Array.isArray(users)) return null;

    return users.find(user => user.id === id) || null;
}


// Check if password is strong
function isStrongPassword(password) {
    if (typeof password !== "string") return false;

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);

    return hasMinLength && hasNumber && hasUpper;
}


// Get average of numbers
function getAverage(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }

    const sum = numbers.reduce((acc, val) => acc + val, 0);

    return sum / numbers.length;
}


// Sort products by price
function sortProducts(products, order = "asc") {
    if (!Array.isArray(products)) return [];

    return products.sort((a, b) => {
        if (order === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}


// Filter active users
function filterActiveUsers(users) {
    if (!Array.isArray(users)) return [];

    return users.filter(user => user.isActive === true);
}


module.exports = {
    calculateTotal,
    findUserById,
    isStrongPassword,
    getAverage,
    sortProducts,
    filterActiveUsers
};