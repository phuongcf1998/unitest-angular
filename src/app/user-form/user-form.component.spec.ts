import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of, Observable, throwError } from 'rxjs';

import { UserFormComponent } from './user-form.component';
import { UserService } from '../service/user.service';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PeopleDetailComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userServiceMock: {
    getUserById: jest.Mock;
    addNewUser: jest.Mock;
    updateUserInfo: jest.Mock;
  };
  let activatedRouteMock: { params: Observable<Object> };
  const user = {
    createdAt: '2022-08-05T19:49:27.828Z',
    name: 'Brett Grant',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/739.jpg',
    id: '1',
    user_name: 'weqwe',
    first_name: 'elainestewart',
    last_name: 'Reeves',
    age: 12,
    email: 'phuongcf1998@gmail.come',
  };
  const errorStatus = 404;

  beforeEach(async () => {
    userServiceMock = {
      getUserById: jest.fn(() => of()),
      addNewUser: jest.fn(() => of()),
      updateUserInfo: jest.fn(() => of()),
    };

    activatedRouteMock = {
      params: of({
        id: '1',
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  test('should create', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should get user detail success', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;

    userServiceMock.getUserById.mockReturnValue(of(user));
    fixture.detectChanges();

    // expect(component.isEditable).toEqual(true);
    expect(component.userInfo).toEqual(user);
  });

  test('should define error case when get user fail', () => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userServiceMock.getUserById.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
          })
      )
    );

    fixture.detectChanges();
    expect(component.errorGetUser.status).toEqual(errorStatus);
  });

  test('should define a new form if no params', () => {
    activatedRouteMock = {
      params: of({}),
    };

    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRouteMock });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isEditable).toEqual(false);
  });

  test('will add new user onSubmit when edit mode = false', () => {
    activatedRouteMock = {
      params: of({}),
    };
    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRouteMock });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userServiceMock.addNewUser.mockImplementation(() => of(user));
    jest.spyOn(console, 'log');

    fixture.detectChanges();
    component.onSubmit();

    expect(console.log).toHaveBeenCalled();
  });

  test('should define error case when add new user ', () => {
    activatedRouteMock = {
      params: of({}),
    }; //Arrange

    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRouteMock }); //Arrange
    TestBed.compileComponents(); //Arrange
    fixture = TestBed.createComponent(UserFormComponent); //Arrange
    component = fixture.componentInstance; //Arrange
    userServiceMock.addNewUser.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
          })
      )
    ); //Arrange

    fixture.detectChanges(); //Act
    component.onSubmit(); //Act

    expect(component.errorAddUser.status).toEqual(errorStatus); // Assert
  });

  test('will update user onSubmit when edit mode = true', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRouteMock });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    jest.spyOn(console, 'log');
    userServiceMock.getUserById.mockImplementation(() => of(user));
    userServiceMock.updateUserInfo.mockImplementation(() => of(user));

    fixture.detectChanges();
    component.onSubmit();

    expect(console.log).toHaveBeenCalled();
  });

  test('should define error case when update user ', () => {
    TestBed.overrideProvider(ActivatedRoute, { useValue: activatedRouteMock });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userServiceMock.getUserById.mockImplementation(() => of(user));
    userServiceMock.updateUserInfo.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
          })
      )
    );

    fixture.detectChanges();
    component.onSubmit();

    expect(component.errorUpdateUser.status).toEqual(errorStatus);
  });

  afterAll(() => {
    jest.clearAllMocks();
    fixture.destroy();
  });
});
