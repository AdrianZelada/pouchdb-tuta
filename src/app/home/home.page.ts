import { Component } from '@angular/core';
import {DbService} from '../service/db.service';
import {Store} from '@ngrx/store';
import {State} from '../stores/reducers';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listData: Array<any> = [];
  constructor(
      private BD: DbService,
      private userService: UserService,
      private store: Store<State>) {
    this.store.select('users','users').subscribe((users) => {
      console.log('users')
      console.log(users);
      this.listData = users;
    });

    this.userService.getAll().then((response) => {
      console.log('response')
      console.log(response)
    });

    this.BD.getData();
  }

  save() {
    const data = Date.now();
    // this.BD.create(data).then((res: any) => {
    //   console.log('res');
    //   console.log(res);
    // }).catch((e) => {
    //     console.log('errrr');
    //     console.log(e);
    // });

    this.BD.createData(data);
  }

  list() {
    this.BD.find().then( (resp: any) => {
      console.log(resp);
      this.listData = resp.rows;
    }).catch((e) => {
      console.log(e);
    });
  }

  edit(data) {
    console.log(data);
    data.name = Date.now();
    this.BD.update(data);
    // this.BD.update(data).then((resp) => {
    //   console.log('update');
    //   console.log(resp);
    // }).catch((e) => {
    //     console.log('errrr update');
    //     console.log(e);
    // });
  }

  delete(data) {
    this.BD.delete(data).then((resp) => {
        console.log('delete');
        console.log(resp);
    }).catch((e) => {
        console.log('errrr delete');
        console.log(e);
    });
  }
}
