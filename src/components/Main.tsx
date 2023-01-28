import { useEffect, useState } from 'react';
import localstorageService from '../services/localstorageService';
import socketService from '../services/socketService';
import NewUserModal from './modals/NewUserModal';
import Menu from './UI/Menu';
import UI from './UI/UI';

const Main = () => {
	const [isNewUser, setNewUser] = useState(false);
	const [isHostFormOpen, setHostFormOpen] = useState(false);

	useEffect(() => {
		const username = localstorageService.getUserData();

		if (!username) return setNewUser(true);

		socketService.connectClient(username);
	}, []);

	return (
		<div className='fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center'>
			<UI />
			<Menu />
			{isNewUser && <NewUserModal handleClose={() => setNewUser(false)} />}
		</div>
	);
};

export default Main;
