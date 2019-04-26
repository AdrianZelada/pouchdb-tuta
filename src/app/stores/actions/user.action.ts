
import { Action} from '@ngrx/store';

export const USERS_LOAD             = '[USER] Load';
export const USER_ADD               = '[USER] Add';
export const USER_EDIT              = '[USER] Edit';
export const USER_REMOVE            = '[USER] Remove';
export const USER_SYNC              = '[USER] Sync';

export class UsersLoad implements Action {
    readonly type = USERS_LOAD;
    constructor(public payload: any) {}
}

export class UserAdd implements Action {
    readonly type = USER_ADD;
    constructor(public payload: any) {}
}

export class UserEdit implements Action {
    readonly type = USER_EDIT;
    constructor(public payload: any, public key: string) {}
}

export class UserRemove implements Action {
    readonly type = USER_REMOVE;
    constructor(public id: any, public key: string) {}
}

export class UserSync implements Action {
    readonly type = USER_SYNC;
    constructor(public lastSync: any) {}
}



export type userActions = UsersLoad | UserAdd | UserEdit | UserRemove | UserSync;