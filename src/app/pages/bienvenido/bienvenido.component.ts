import { Component, OnInit, inject } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [
    RouterLink, FormsModule, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.scss'
})
export class BienvenidoComponent implements OnInit{
  private githubService: GithubService = inject(GithubService);
  infoGithub!:any;
  
  
  
  ngOnInit(): void {
    this.githubService.getGithub().subscribe( (res: any) => {
      this.infoGithub = res;
    });
  }

}
