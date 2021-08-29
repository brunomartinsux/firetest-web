import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMenuComponent } from './test-menu.component';

describe('TestMenuComponent', () => {
  let component: TestMenuComponent;
  let fixture: ComponentFixture<TestMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
