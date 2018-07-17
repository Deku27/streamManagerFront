import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';

import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {CheckboxModule, FileUploadModule, InputTextModule, MenubarModule, MenuItemContent,
  CardModule, DropdownModule, MessageModule, MessagesModule, InputMaskModule, ConfirmDialogModule,
   ConfirmationService,
   GrowlModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StreamComponent } from './stream/stream.component';
import { VideosService } from '../services/videos.service';
import { StreamService } from '../services/stream.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
const appRoutes: Routes = [
 /* {
    path:'videos',
    component: ListVideoComponent
  },
 */
  {
    path: 'stream',
    component: StreamComponent
  },
  {
    path: '',
    redirectTo: '/stream',
    pathMatch: 'full'
  },
];
@NgModule({
  declarations: [AppComponent, StreamComponent],
  imports: [
    HttpClientModule, RouterModule.forRoot(appRoutes), BrowserModule, BrowserAnimationsModule , ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CheckboxModule,
    FileUploadModule,
    TableModule,
    MenubarModule,
    CardModule,
    FormsModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    InputMaskModule,
    AngularFontAwesomeModule,
    ConfirmDialogModule,
    GrowlModule
  ],
  providers: [VideosService , StreamService],
  bootstrap: [AppComponent],
  /*entryComponents: [NewVideoComponent]*/
})
export class AppModule { }
