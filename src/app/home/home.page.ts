import { Component } from '@angular/core';
import {DbService} from '../service/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listData: Array<any> = [];
  constructor(private BD: DbService) {
  }

  save() {
    const data = Date.now();
    this.BD.create(data).then((res: any) => {
      console.log('res');
      console.log(res);
    }).catch((e) => {
        console.log('errrr');
        console.log(e);
    });
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
    data.name = Date.now();
    this.BD.update(data).then((resp) => {
      console.log('update');
      console.log(resp);
    }).catch((e) => {
        console.log('errrr update');
        console.log(e);
    });
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
