import Modal from './Modal';
import { useState } from 'react';
import socketService from '../../services/socketService';

const NewUserModal = ({ handleClose }) => {
	const [name, setName] = useState('');

	const onNameChange = e => setName(e.target.value);

	const onNameSubmit = e => {
		e.preventDefault();

		socketService.connectClient(name);
		handleClose();
	};

	return (
		<Modal handleClose={handleClose}>
			<form
				onSubmit={onNameSubmit}
				className='w-full h-full flex flex-col items-center justify-center'>
				<h3 className='text-xl text-gray-900 font-semibold mb-6 tracking-widest'>
					Hey! Who are you?
				</h3>
				<div className=' w-full flex justify-center'>
					<input
						type='text'
						placeholder='Your name, please!'
						className='outline-none outline-slate-400 rounded-l-sm py-2 pl-8 text-md w-1/2 m-1'
						onChange={onNameChange}
						value={name}
					/>
					<button
						type='submit'
						className='ml-0 px-2 text-xs outline-slate-400 rounded-r bg-green-300 hover:bg-green-400 duration-150'>
						Let me in
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default NewUserModal;
