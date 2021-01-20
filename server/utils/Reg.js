let rules = {
	Email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
	Phone: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/


}

function testEmail(code) {
	return rules['Email'].test(code)
}

function testPhone(code) {
	return rules["Phone"].test(code)
}


module.exports = { testEmail ,testPhone}