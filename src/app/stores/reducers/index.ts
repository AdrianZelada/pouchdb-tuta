import { ActionReducerMap} from '@ngrx/store';
import * as fromUser from './user.reducer';

export interface State
{
    users: fromUser.UserState;
}

export const getUserState = (state: State) => state.users;

export const reducers: ActionReducerMap<State> = {
    users: fromUser.UserReducer
};