import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb-browser';

// import * as PouchDB from 'pouchdb/dist/pouchdb';
// import * as PouchDBFind from 'pouchdb-find';
// PouchDB.plugin(PouchDBFind);

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import PouchUpsert from 'pouchdb-upsert';
import {UserAdd, UserEdit, UsersLoad, UserSync} from '../stores/actions';
import {Store} from '@ngrx/store';
import {State} from '../stores/reducers';
import {UserService} from './user.service';
import {first} from 'rxjs/operators';
PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchUpsert);



@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = new PouchDB('users');
  constructor(
      private store: Store<State>,
      private userService: UserService,
  ) {

      const changes = this.db.changes({
          since: 'now',
          live: true,
          include_docs: true
      }).on('change', function(change) {
          // handle change
          console.log('change');
          console.log(change);
      }).on('complete', function(info) {
          // changes() was canceled
          console.log('complete');
          console.log(info);
      }).on('error', function (err) {
          console.log('error');
          console.log(err);
      });
  }

  getData() {
      this.db.allDocs({
          include_docs: true
      }).then((response: any) => {
          const rows = response.rows.map((data: any) => {
              return data.doc;
          });
          const action = new UsersLoad(rows);
          this.store.dispatch(action);
          // this.store.
          this.store.select("users","lastSync")
              .pipe(
                  first()
              )
              .subscribe((obj) => {
              console.log(obj)
              this.userService.syncData("personnel", obj).then((results: any) => {
                  console.log(results);
                  if (results.created) {
                      results.created.forEach((item: any) => {
                          this.createData(item);
                      });
                  }
                  const lastSyncAction = new UserSync(results.lastSync);
                  this.store.dispatch(lastSyncAction);
              });
          })

          // this.userService.syncData("personnel", this.store.select("users","lastSync").valueOf())
      });
  }

    createData(data) {
        const options: any = {};
        options['include_docs'] = true;
        this.db.post(data, options).then((response) => {
            const action = new UserAdd({users: {
                _id : response.id,
                ...data
            }
            });

            this.store.dispatch(action);
        });
    }

  create(data) {
        const options: any = {};
        options['include_docs'] = true;
        return this.db.post({
            name: data
        }, options);
  }

  find() {
    return this.db.allDocs({
        include_docs: true
    });
  }



  update(data) {
      this.db.get(data['_id']).then((resp: any) => {
          delete data._rev;
          data = {
              ...resp,
              ...data
          };
          this.db.put(data).then( (item: any) => {
              const action = new UserEdit({user: data, lastSync: 1}, '_id');
              this.store.dispatch(action);
          }).catch((e) => {
              console.log(e);
          });
      });
  }

  delete(data) {
      return this.db.remove(data);
  }
}
