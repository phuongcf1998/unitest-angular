import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { OrderListModule } from 'primeng/orderlist';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        OrderListModule,
        InputTextModule,
        MenubarModule,
        ButtonModule,
        RippleModule,
        TableModule
      ],
      declarations: [AppComponent, HomeComponent, UserFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have list item on the menu bar', () => {
    component.ngOnInit()
    expect(component.items).toBeDefined();
  });

  //   it(`should have as title 'jesttest'`, () => {
  //     expect(component.title).toEqual('jesttest');
  //   });

  //   it('should render title', () => {
  //     const fixture = TestBed.createComponent(AppComponent);
  //     fixture.detectChanges();
  //     const compiled = fixture.nativeElement as HTMLElement;
  //     expect(compiled.querySelector('.content span')?.textContent).toContain(
  //       'jesttest app is running!'
  //     );
  //   });
});
