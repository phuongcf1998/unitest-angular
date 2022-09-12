import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-odata',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  listUser: User[] = [];
  errorGetListUser!: HttpErrorResponse;
  errorDeleteUser!: HttpErrorResponse;
  msgs: Message[] = [];
  position!: string;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getListUser().subscribe({
      next: (data: User[]) => {
        this.listUser = data;
      },
      error: (err: HttpErrorResponse) => (this.errorGetListUser = err),
      complete: () => console.info('Get all user complete'),
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUserById(userId).subscribe({
      next: (data: User) => {
        this.getAllUser();
      },
      error: (err: HttpErrorResponse) => (this.errorDeleteUser = err),
      complete: () => console.info('Delete complete'),
    });
  }

  confirmDelete(userId: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUser(userId);
        console.log("Delete user");
        
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      },
    });
  }
}
