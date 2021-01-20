import axios from "axios";
import { ElNotification } from 'element-plus';
const http = axios.create({
	baseURL: `${process.env.VUE_APP_URL}`,

})
console.log(`${process.env.VUE_APP_URL}` )

console.log(`${process.env.NODE_ENV}`)

http.interceptors.response.use(
	(res) => {

		res.data.flag
			? ElNotification.success({
				title: "ok",
				message: res.data.message,
			})
			: ElNotification.error({
				title: "error",
				message: res.data.message,
			});

		return res
	},
	(err) => {
		console.log('err: ', err);
		return Promise.reject(err)
	}
);



// export const postPhoneNumber = (phoneNumber) => http.post("/sendSms", { phone: phoneNumber });

export function postPhoneNumber(phoneNumber) {
	return http.post("/sendSms", { phone: phoneNumber });
}

export function postVerifyCode(phoneNumber, verifyCode) {
	return http.post("/verifySms", {
		phone: phoneNumber,
		code: verifyCode,
	});
}

export function postEmail(email) {
	return http.post("/sendEmail", {
		email: email,
	});
}

