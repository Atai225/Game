import { configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth.reducer';
import gameSlice from './reducers/game.reducer';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    game: gameSlice,
  }
})
