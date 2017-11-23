import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadAssociateComponent } from './bulk-upload-associate.component';

describe('BulkUploadAssociateComponent', () => {
  let component: BulkUploadAssociateComponent;
  let fixture: ComponentFixture<BulkUploadAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkUploadAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkUploadAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
