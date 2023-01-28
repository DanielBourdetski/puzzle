import { UserData } from '../../commonTypes';

export const saveUserData = (name: string) => {
	localStorage.setItem('user', JSON.stringify(name));
};

export const getUserData = () => JSON.parse(localStorage.getItem('user'));

export default {
	saveUserData,
	getUserData,
};
