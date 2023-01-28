import './App.css';
import GameCanvas from './components/GameCanvas';
import Main from './components/Main';

const App = () => {
	return (
		<div className='w-full h-full'>
			<GameCanvas />
			{/* all content is in <Main />, canvas element may not update as it will disturb the game rendering */}
			<Main />
		</div>
	);
};

export default App;
