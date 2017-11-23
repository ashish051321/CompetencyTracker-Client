import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatelistComponent } from './associatelist.component';

describe('AssociatelistComponent', () => {
  let component: AssociatelistComponent;
  let fixture: ComponentFixture<AssociatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
