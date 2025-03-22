# Tabela com Angular Material

Este projeto implementa uma tabela interativa em Angular, utilizando Angular Material para exibir dados de uma API externa com funcionalidades de paginação, filtragem e ordenação. A lógica de acesso a dados foi separada em um serviço (`UserService`) para melhor organização e reutilização.

## 🛠️ Ferramentas Utilizadas
- **Angular Material**: Para a tabela, paginador, ordenação e entrada de texto.
- **HttpClient**: Para buscar dados da API.
- **TypeScript**: Para estruturar o código.

## 🚀 Passo a Passo para Criar o Projeto
1. Criar um novo projeto Angular (opcional, caso não tenha um):
    ```bash
    ng new meu-projeto
    cd meu-projeto
    ```

2. Instalar o Angular Material:
    ```bash
    ng add @angular/material
    ```

3. Criar o componente da tabela e o serviço:
    ```bash
    ng g c tentativa
    ng g s services/user
    ```

## 📝 Configuração do TypeScript
1. Definir o Tipo dos Dados (table-dto.ts):  
    Crie o arquivo `src/app/Dtos/TableDTO.ts`:
    ```typescript
    export interface TableDTO {
      id: number;
      name: string;
      username: string;
    }
    ```

2. Configurar o Serviço (user.service.ts):  
    Crie o serviço em `src/app/services/user.service.ts`:
    ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { TableDTO } from '../Dtos/TableDTO';

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
    ```

3. Configurar o Componente (tentativa.component.ts):  
    Atualize o arquivo `src/app/tentativa/tentativa.component.ts`:
    ```typescript
    import { Component, OnInit, ViewChild } from '@angular/core';
    import { MatCardModule } from '@angular/material/card';
    import { MatSort, MatSortModule } from '@angular/material/sort';
    import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
    import { MatTableDataSource, MatTableModule } from '@angular/material/table';
    import { MatInputModule } from '@angular/material/input';
    import { TableDTO } from '../../Dtos/TableDTO';
    import { UserService } from '../../services/user.service';

    @Component({
      selector: 'app-tentativa',
      standalone: true,
      imports: [
        MatPaginator,
        MatSort,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
      ],
      templateUrl: './tentativa.component.html',
      styleUrls: ['./tentativa.component.css']
    })
    export class TentativaComponent implements OnInit {
      displayedColumns: string[] = ['id', 'name', 'username'];
      dataSource = new MatTableDataSource<TableDTO>();
      totalElements = 0;
      pageSize = 5;
      pageIndex = 0;

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      constructor(private userService: UserService) { }

      ngOnInit(): void {
        this.loadData();
      }

      loadData(event?: any): void {
        if (event) {
          this.pageSize = event.pageSize;
          this.pageIndex = event.pageIndex;
        }

        this.userService.getUsers().subscribe(data => {
          this.totalElements = data.length;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }

      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    }
    ```

4. Criar o Template (tentativa.component.html):  
    Atualize o arquivo `src/app/tentativa/tentativa.component.html`:
    ```html
    <mat-card>
      <div class="table-container">
        <!-- Campo de filtro -->
        <mat-form-field>
          <mat-label>Filtrar</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Digite para filtrar">
        </mat-form-field>

        <!-- Tabela -->
        <mat-table [dataSource]="dataSource" matSort>
          <!-- Coluna ID -->
          <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef mat-sort-header>ID</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.id }}</mat-cell>
          </ng-container>

          <!-- Coluna Nome -->
          <ng-container matColumnDef="name">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Nome</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.name }}</mat-cell>
          </ng-container>

          <!-- Coluna Username -->
          <ng-container matColumnDef="username">
            <mat-header-cell *matHeaderCellDef mat-sort-header>Username</mat-header-cell>
            <mat-cell *matCellDef="let element">{{ element.username }}</mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>

        <!-- Paginação -->
        <mat-paginator [length]="totalElements"
                       [pageSize]="pageSize"
                       [pageIndex]="pageIndex"
                       [pageSizeOptions]="[5, 10, 20]"
                       (page)="loadData($event)">
        </mat-paginator>
      </div>
    </mat-card>
    ```

5. Estilização (tentativa.component.css):  
    Crie o arquivo `src/app/tentativa/tentativa.component.css`:
    ```css
    .table-container {
      padding: 16px;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    mat-table {
      width: 100%;
    }
    ```

6. Configurar o Bootstrap (main.ts):  
    Como o projeto usa standalone components, configure o HttpClient no arquivo `src/main.ts`:
    ```typescript
    import { bootstrapApplication } from '@angular/platform-browser';
    import { provideHttpClient } from '@angular/common/http';
    import { AppComponent } from './app/app.component';

    bootstrapApplication(AppComponent, {
      providers: [
        provideHttpClient() // Necessário para o HttpClient funcionar
      ]
    }).catch(err => console.error(err));
    ```

## ▶️ Executando o Projeto
Para rodar o projeto, utilize o seguinte comando:

```bash
ng serve
