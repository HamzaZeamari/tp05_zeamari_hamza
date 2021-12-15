import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from "../../shared/models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }
  urlLog: string = "/login";
  urlAuth: string = "/auth/";

  public postLogin(login: string, password: string) : Observable<User>{
    let data: string = "login=" + login + "&password=" + password;
    let httpOptions = {
      headers: new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    };
    return this.http.post<User>(this.urlLog, data, httpOptions);
  }

  public getLogin(login: string) : Observable<User> {
    let data: string = "login=" + login;
    return this.http.get<User>(this.urlAuth + login);
  }

}
