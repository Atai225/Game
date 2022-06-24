import { configureStore} from '@reduxjs/toolkit';
import gameSlice from './reducers/game.reducer';

export const store = configureStore({
  reducer: {
    game: gameSlice,
  }
})
