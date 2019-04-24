import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb-browser';

// import * as PouchDB from 'pouchdb/dist/pouchdb';
// import * as PouchDBFind from 'pouchdb-find';
// PouchDB.plugin(PouchDBFind);

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);



@Injectable({
  providedIn: 'root'
})
export class DbService {

  db = new PouchDB('users');
  constructor() {

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

  create(data) {
    return this.db.post({
        name: data
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
