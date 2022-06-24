import {
	createSlice
} from "@reduxjs/toolkit";





const gameSlice = createSlice({
	name: 'game',
	initialState: {
		
		categories: [],
		questions: null,
		loading: "",
		status: false,
		history: [],
		currentGame: {
			userData: null,
			correct: 0,
			incorrect: 0,
			attemps: 0,
			points: 0,
			clock: [],
		},
		currentClue: null,

	},
	reducers: {
		loginUser: (state, action) => {
			state.currentGame.userData = action.payload;
		},
		setCurrentClue: (state, action) => {
			state.currentClue = action.payload
		},
		incCorrects: (state, action) => {
			state.currentGame.correct = state.currentGame.correct + 1;
			state.currentGame.attemps = state.currentGame.attemps + 1;
			state.currentGame.points += action.payload;
		},
		getClues: (state, action) => {
			const item = action.payload.map(res => {
				return res.clues.map(res => {
					return {
						...res,
						right: null,
					}
				})
			});
			state.categories = action.payload.map(res => {
				return res.title;
			})
			state.questions = item;
		},
		incIncorrects: (state, action) => {
			state.currentGame.incorrect = state.currentGame.incorrect + 1;
			state.currentGame.attemps = state.currentGame.attemps + 1;
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
		},
		colorChanger: (state, action) => {

			state.questions.forEach((item) => {
				item.forEach((i) => {
					if(i.id === state.currentClue){
						i.right = action.payload;
					}
				})
			})
		},
		clearCluesStatus: (state) => {
			state.questions.forEach((item) => {
				item.forEach((i) => {
						i.right = null;
				})
			})
		}
	}

})
export const {
	incCorrects,
	incIncorrects,
	setClock,
	changeGameStatus,
	setHistory,
	clearHistory,
	clearCurrent,
	getClues,
	colorChanger,
	setCurrentClue,
	clearCluesStatus,
	loginUser
} = gameSlice.actions
export default gameSlice.reducer;