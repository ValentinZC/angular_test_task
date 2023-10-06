import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { IProfileResponse } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { IAuthor } from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {
  }

  follow(username: string): Observable<IAuthor> {
    return this.http
      .post<IProfileResponse>(`/profiles/${username}/follow`, {})
      .pipe(map((data: { profile: IAuthor }) => data.profile));
  }

  unfollow(username: string): Observable<IAuthor> {
    return this.http
      .delete<IProfileResponse>(`/profiles/${username}/follow`)
      .pipe(map((data: { profile: IAuthor }) => data.profile));
  }
}
