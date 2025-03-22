import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TableDTO } from '../../Dtos/TableDTO';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-tentativa',
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
  styleUrl: './tentativa.component.css'
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
