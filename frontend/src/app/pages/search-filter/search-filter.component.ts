import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {

  @Output() search = new EventEmitter<any>();
  searchForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      name: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  ngOnInit(): void {}

  onSearch(): void {
    this.search.emit(this.searchForm.value);
  }

}
