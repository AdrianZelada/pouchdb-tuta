import * as fromUser from '../actions/user.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
    users: Array<any>;
    lastSync: number;
}
//
// export const getUserAppState = createFeatureSelector<UserState>(
//     'user'
// );
//
// export const getAppState = createSelector(
//     getUserAppState,
//     (state: UserState) => state
// );


const initState: UserState = {
    users: [],
    lastSync: 0
}

export function UserReducer(state = initState , action: fromUser.userActions) {
    switch (action.type) {
        case fromUser.USERS_LOAD:
            return{
                ...state,
                users: [...action['payload']]
            };
        case fromUser.USER_ADD:
            const users = Array.isArray(action['payload']['users']) ? action['payload']['users'] : [action['payload']['users']];
            return{
                users: [...state.users, ...users ],
                lastSync: action['payload']['lastSync']
            };

        case fromUser.USER_EDIT:
            // const usersEdit = Array.isArray(action['payload']['users']) ? action['payload']['users'] : [action['payload']['users']];
            return{
                users: state.users.map((user: any) => {
                    return user[action['key']] === action['payload']['user'][action['key']] ? {...action['payload']['user']} : user;
                }),
                lastSync: action['payload']['lastSync']
            };

        case fromUser.USER_REMOVE:
            // const usersEdit = Array.isArray(action['payload']['users']) ? action['payload']['users'] : [action['payload']['users']];
            return{
                users: state.users.filter((user: any) => {
                    return user[action['key']] !== action['payload']['user'][action['key']];
                }),
                lastSync: action['payload']['lastSync']
            };

        default:
            return state;
    }
}