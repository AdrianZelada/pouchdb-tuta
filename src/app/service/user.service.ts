import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// const URL = 'http://192.168.88.83:3000/api'
const URL = 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  model: string = '/personnels'
  constructor(private http: HttpClient) { }

  post(user){
    return new Promise((res, rej) => {
      this.http.post(`${URL}${this.model}`, user).subscribe((data) => {
        console.log('data')
        console.log(data);
        res(data);
      });
    });
  }

  getAll() {
    return new Promise((res, rej) => {
      this.http.get(`${URL}${this.model}`).subscribe((response) => {
        res(response);
      });
    });
  }

  syncData(model: string, lastSync: number) {
      return new Promise((res, rej) => {
          this.http.get(`${URL}${this.model}/modelSync?model=${model}&lastSync=${lastSync}`).subscribe((response) => {
              res(response);
          });
      });
  }
}
