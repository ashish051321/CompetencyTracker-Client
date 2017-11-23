import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssociateComponent } from './new-associate.component';

describe('NewAssociateComponent', () => {
  let component: NewAssociateComponent;
  let fixture: ComponentFixture<NewAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
