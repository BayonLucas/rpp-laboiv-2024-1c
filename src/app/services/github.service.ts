import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private http:HttpClient = inject(HttpClient);

  getGithub(){
    return this.http.get('https://api.github.com/users/BayonLucas');
  }
}