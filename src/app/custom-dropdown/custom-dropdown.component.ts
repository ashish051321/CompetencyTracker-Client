import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.css']
})
export class CustomDropdownComponent {

  constructor() { }

  @Input() Itemlist;
  
  selectedItem = "--Select--";

  updateDropdown(item){
      console.log(item);
      this.selectedItem = item;
  }

}
