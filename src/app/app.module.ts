import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {CheckboxModule, FileUploadModule, InputTextModule, MenubarModule, MenuItemContent, CardModule,
  DropdownModule, MessageModule, MessagesModule, InputMaskModule, ConfirmDialogModule, GrowlModule,
   TabViewModule, FieldsetModule, RadioButtonModule, InputTextareaModule, ToggleButtonModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

// App Components
import { StreamComponent } from './stream/stream.component';
import { VideosComponent } from './videos/videos.component';
import { EitComponent } from './eit/eit.component';

// App Services
import { VideosService } from '../services/videos.service';
import { StreamService } from '../services/stream.service';

// App Routes
const appRoutes: Routes = [
  {
    path: 'stream',
    component: StreamComponent
  },
  {
    path: 'eit',
    component: EitComponent
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: '',
    redirectTo: '/stream',
    pathMatch: 'full'
  },
];
@NgModule({
  declarations: [AppComponent, StreamComponent, VideosComponent, EitComponent],
  imports: [
    HttpClientModule, RouterModule.forRoot(appRoutes), BrowserModule, BrowserAnimationsModule , ReactiveFormsModule,
    ButtonModule,DialogModule,InputTextModule,CheckboxModule,FileUploadModule,  TableModule,MenubarModule,CardModule,FormsModule,DropdownModule,MessageModule,
    MessagesModule,InputMaskModule,AngularFontAwesomeModule,ConfirmDialogModule,GrowlModule,TabViewModule,FieldsetModule,RadioButtonModule,InputTextareaModule,
    ToastModule,NgxJsonViewerModule,ToggleButtonModule
  ],
  providers: [VideosService , StreamService],
  bootstrap: [AppComponent],
})
export class AppModule { }
