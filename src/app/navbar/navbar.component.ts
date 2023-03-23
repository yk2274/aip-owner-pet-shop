import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Sidebar } from '../interface/sidebar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuItems: Sidebar[] = [
    { linkId: 1, linkName: 'Owner', linkUrl: 'owner' },
    { linkId: 2, linkName: 'Pet', linkUrl: 'pet' },
  ];

  //default item
  selectedItem?: Sidebar;
  
  onSelect(item: Sidebar): void {
    this.selectedItem = item;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
