import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentAddUserComponent } from './dialog-content-add-user.component';

describe('DialogContentAddUserComponent', () => {
  let component: DialogContentAddUserComponent;
  let fixture: ComponentFixture<DialogContentAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogContentAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
