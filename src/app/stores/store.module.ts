import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MetaReducer, StoreModule, ActionReducer } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { reducers } from './index';



let environment:any = {
    production: false
}
//
// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//     return localStorageSync({
//         keys: ['user'],
//         rehydrate:true
//     })(reducer);
//   }
//   const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

// export const metaReducers: MetaReducer<any>[] = !environment.production
//     ? [storeFreeze]
//     : [];

@NgModule({
    imports  : [
        StoreModule.forRoot(reducers, {}),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ]
})

export class AppStoreModule {}
