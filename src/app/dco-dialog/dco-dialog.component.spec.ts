import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcoDialogComponent } from './dco-dialog.component';

describe('DcoDialogComponent', () => {
  let component: DcoDialogComponent;
  let fixture: ComponentFixture<DcoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
