import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-people-detail',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  isEditable: boolean = false;
  userForm!: FormGroup;
  userInfo!: User;
  subscriptionParam!: Subscription;
  errorGetUser!: HttpErrorResponse;
  errorAddUser!: HttpErrorResponse;
  errorUpdateUser!: HttpErrorResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscriptionParam = this.route.params.subscribe((params) => {
      if (params['id'] !== undefined) {
        this.isEditable = true;
        this.userService.getUserById(params['id']).subscribe({
          next: (data: User) => {
            this.userInfo = data;
            this.userForm = this.fb.group({
              id: this.userInfo.id,
              user_name: this.userInfo.user_name,
              first_name: this.userInfo.first_name,
              last_name: this.userInfo.last_name,
              age: this.userInfo.age,
              email: [this.userInfo.email, Validators.email],
            });
          },
          error: (error: HttpErrorResponse) => (this.errorGetUser = error),
        });
      } else {
        this.userForm = this.fb.group({
          user_name: '',
          first_name: '',
          last_name: '',
          age: '',
          email: ['', Validators.email],
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionParam !== undefined) {
      this.subscriptionParam.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.isEditable) {
      this.userService
        .addNewUser({
          ...this.userForm.value,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl('/');
          },
          error: (error: HttpErrorResponse) => {
            this.errorAddUser = error;
          },
          complete: () => console.info('Post complete'),
        });
    } else {
      this.userService
        .updateUserInfo({
          ...this.userForm.value,
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigateByUrl('/');
          },
          error: (error: HttpErrorResponse) => {
            this.errorUpdateUser = error;
          },
          complete: () => console.info('Update complete'),
        });
    }
  }
}
