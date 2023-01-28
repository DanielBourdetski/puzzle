import socketService from '../../services/socketService';

const Menu = () => {
	const onJoinRoom = () => {
		socketService.joinRoom('');
	};

	const onHostRoom = () => {};

	const onAbout = () => {};

	return (
		<ul className='max-w-[30%] max-h-[50%] bg-sky-200 bg-opacity-60 backdrop-blur rounded flex flex-col items-center justify-center gap-y-4 p-10'>
			<li className='border border-slate-700 rounded hover:bg-black hover:bg-opacity-10 duration-150 p-2'>
				<button onClick={onJoinRoom}>Join room</button>
			</li>
			<li className='border border-slate-700 rounded hover:bg-black hover:bg-opacity-10 duration-150 p-2'>
				<button onClick={onHostRoom}>Host room</button>
			</li>
			<li className='border border-slate-700 rounded hover:bg-black hover:bg-opacity-10 duration-150 p-2'>
				<button onClick={onAbout}>About</button>
			</li>
		</ul>
	);
};

export default Menu;
