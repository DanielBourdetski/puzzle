export const saveUserData = (name: string) => {
	console.log(name);

	localStorage.setItem('user', JSON.stringify(name));
};

export const getUserData = () => JSON.parse(localStorage.getItem('user'));

export default {
	saveUserData,
	getUserData,
};
