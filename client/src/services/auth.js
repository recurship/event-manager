import { makeRequest } from './helper';

export default {
	login(username, password) {
		let formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		return makeRequest('/api/token', { method: 'POST', body: formData });
	},
	resetPassword(email) {
		let formData = new FormData();
		formData.append('email', email);
		return fakeApi(email);
	},
};

function fakeApi(email) {
	const msg = 'Please check your email';
	return new Promise(resolve => setTimeout(_ => resolve(msg), 2000));
}
