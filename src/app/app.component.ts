import { Component, OnInit } from '@angular/core';
import { Owner } from './interface/owner';
import { OwnerService } from './service/owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';

  constructor() { } 
  
}
