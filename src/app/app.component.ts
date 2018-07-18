import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
          label: 'Table Stream',
          // icon: 'fa fa-folder-open',
          routerLink: '/stream'
      },
      {
          label: 'Eit',
          routerLink: '/eit'
          // icon: 'fa fa-info-square',
      },
      {
        label: 'Video',
       //  icon: 'fa fa-video',
        routerLink: '/videos'
      },
      {
        label: 'Login',
        // icon: 'fa fa-user',
      }
    ];
  }
}
