import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationService } from 'primeng/api';

import { of, throwError } from 'rxjs';

import { UserService } from '../service/user.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let userServiceMock: { getListUser: jest.Mock; deleteUserById: jest.Mock };
  let confirmServiceMock: { confirm: jest.Mock };
  let fixture: ComponentFixture<HomeComponent>;
  const listUser = [
    {
      id: '3',
      user_name: 'thuy',
      first_name: 'elainestewartwqwqqqqq',
      last_name: '12qw',
      age: 121,
      email: 'phuongcf1998@gmail.com',
    },
    {
      id: '4',
      user_name: 'weqwe',
      first_name: 'qwq',
      last_name: '1231',
      age: 12,
      email: 'phuongcf1998@gmail.com',
    },
  ];
  const user = {
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
      getListUser: jest.fn(() => of({})),
      deleteUserById: jest.fn(() => of({})),
    };
    confirmServiceMock = {
      confirm: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        {
          provide: ConfirmationService,
          useValue: confirmServiceMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  test('should return list user when onInit', () => {
    userServiceMock.getListUser.mockImplementation(() => of(listUser));

    component.ngOnInit();

    expect(component.listUser).toEqual(listUser);
  });

  test('should define error case when get list user ', () => {
    userServiceMock.getListUser.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
          })
      )
    );

    component.ngOnInit();

    expect(component.errorGetListUser.status).toEqual(errorStatus);
  });

  test('should delete user when confirm ', () => {
    confirmServiceMock.confirm.mockImplementation(
      (objConfirm: { accept: () => {}; reject: () => {} }) => {
        objConfirm.accept();
      }
    );

    jest.spyOn(component, 'deleteUser');

    component.confirmDelete('1');

    expect(component.deleteUser).toHaveBeenCalled();
  });

  test('should push reject message to show when reject delete user ', () => {
    confirmServiceMock.confirm.mockImplementation(
      (objConfirm: { accept: () => {}; reject: () => {} }) => {
        objConfirm.reject();
      }
    );

    component.confirmDelete('1');

    expect(component.msgs.length).toBeGreaterThan(0);
  });

  test('reload list user when delete success ', () => {
    userServiceMock.deleteUserById.mockImplementation(() => of(user));
    confirmServiceMock.confirm.mockImplementation(() => {
      component.deleteUser('1');
    });
    jest.spyOn(component, 'getAllUser');

    component.confirmDelete('1');

    expect(component.getAllUser).toHaveBeenCalled();
  });

  test('should define error case when delete user fail', () => {
    confirmServiceMock.confirm.mockImplementation(() => {
      component.deleteUser('1');
    });
    userServiceMock.deleteUserById.mockImplementation(() =>
      throwError(
        () =>
          new HttpErrorResponse({
            status: 404,
          })
      )
    );

    component.confirmDelete('1');

    expect(component.errorDeleteUser.status).toEqual(errorStatus);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
