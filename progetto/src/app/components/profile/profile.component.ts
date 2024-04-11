import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/service/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
user!:User
selectedUser!:User;
urlProfileId: string | null = null;
constructor(private route: ActivatedRoute, private userSrv: UsersService) {}

ngOnInit(): void {
  this.getLoggedUser();
  this.route.paramMap.subscribe(params => {
    // Ottieni il valore del parametro 'id' dall'URL
    this.urlProfileId = params.get('id');
    if (this.urlProfileId) {
      // Carica il film in base all'ID dall'URL
     /*  this.loadMovieById(parseInt(this.urlProfileId, 10)); */
    }
  });
}

/* loadMovieById(id: number): void {
  this.moviesService.getMovieById(id).subscribe(
    (movie: Movie | null) => { // Modifica qui
      if (movie) { // Assicurati che il film non sia null prima di assegnarlo
        console.log('Film caricato con successo:', movie);
        this.movie = movie; // Salva il film nell'oggetto locale del componente
      } else {
        console.error('Film non trovato');
        // Gestisci il caso in cui il film non viene trovato
      }
    },
    (error) => {
      console.error('Errore durante il recupero del film:', error);
      // Gestisci eventuali errori durante il recupero del film
    }
  );
} */

getUser(id: number) {
  /* this.userSrv.getUser(id).subscribe((user) => this.selectedUser = user); */
}

getLoggedUser(){
  const activeUser: any = localStorage.getItem('user')
  this.user = JSON.parse(activeUser).user;
  console.log(this.user)
}
}