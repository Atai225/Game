import {createSlice} from "@reduxjs/toolkit";


const gameSlice = createSlice({
	name: 'game',
	initialState: {
		status: false,
		history: [],
		currentGame: {
			correct: 0,
			incorrect: 0,
			attemps: 0,
			points: 0,
			clock: [],
		},
		questions: [],
	},
	reducers: {
		incCorrects: (state, action) => {
			state.currentGame.correct = state.currentGame.correct+1;
			state.currentGame.attemps = state.attemps+1;
			state.currentGame.points += action.payload;
		},
		incIncorrects: (state, action) => {
			state.currentGame.incorrect = state.currentGame.incorrect+1;
			state.currentGame.attemps = state.currentGame.attemps+1;
			state.currentGame.points -= action.payload;
		},
		setClock: (state, action) => {
			state.currentGame.clock.push(action.payload)
		},
		changeGameStatus: (state, action) => {
			state.status = action.payload;
		}, 
		setHistory: (state) => {
			state.history.push(state.currentGame)
		},
		clearHistory: (state) => {
			state.history = [];
		},
		clearCurrent: (state) => {
			state.currentGame = {
				correct: 0,
				incorrect: 0,
				attemps: 0,
				points: 0,
				clock: []
			}
		}
	}

})
export const { incCorrects, incIncorrects, setClock, changeGameStatus, setHistory, clearHistory, clearCurrent} = gameSlice.actions
export default gameSlice.reducer;