import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb-browser';

// import * as PouchDB from 'pouchdb/dist/pouchdb';
// import * as PouchDBFind from 'pouchdb-find';
// PouchDB.plugin(PouchDBFind);

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
import {UserAdd, UsersLoad} from '../stores/actions';
import {Store} from '@ngrx/store';
import {State} from '../stores/reducers';
PouchDB.plugin(PouchFind);



@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = new PouchDB('users');
  constructor(private store: Store<State>) {

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

      // this.db.compact({interval: }).then(function (result) {
      //     // handle result
      // }).catch(function (err) {
      //     console.log(err);
      // });
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
      });
  }

    createData(data) {
        this.db.post({
            name: data
        },{
            include_docs: true
        }).then((response) => {
            const action = new UserAdd({users: {
                _id : response.id,
                name: data
            },
                lastSync: 1
            });

            this.store.dispatch(action);
        });
    }

  create(data) {
    return this.db.post({
        name: data
    }, {
        include_docs: true
    });
  }

  find() {
    return this.db.allDocs({
        include_docs: true
    });
  }



  update(data) {
      return this.db.put(data);
  }

  delete(data) {
      return this.db.remove(data);
  }
}
