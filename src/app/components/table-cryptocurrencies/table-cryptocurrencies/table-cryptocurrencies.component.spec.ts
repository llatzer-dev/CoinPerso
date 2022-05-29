import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCryptocurrenciesComponent } from './table-cryptocurrencies.component';

describe('TableCryptocurrenciesComponent', () => {
  let component: TableCryptocurrenciesComponent;
  let fixture: ComponentFixture<TableCryptocurrenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCryptocurrenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCryptocurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
