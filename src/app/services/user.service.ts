import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TableDTO} from '../Dtos/TableDTO';

@Injectable({
  providedIn: 'root' // Disponibiliza o serviço em toda a aplicação
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados da API
  getUsers(): Observable<TableDTO[]> {
    return this.http.get<TableDTO[]>(this.apiUrl);
  }
}
