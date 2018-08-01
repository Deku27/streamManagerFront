import { Component, OnInit } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from '../../services/stream.service';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { VideosService } from '../../services/videos.service';
import {
  ConfirmationService,
  Message,
  MessageService
} from '../../../node_modules/primeng/primeng';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css'],
  providers: [ConfirmationService , MessageService]
})
export class StreamComponent implements OnInit {

  /* 
      Different messages for the user 
        - msgs : 
        - validationErrors : 
  */
  msgs: Message[] = [];
  validationErrors = [];


  streams: Stream[];
  streamID: number;
  streamTableCols = [];
  videosArray: any;
 

  /* new stream Form */
  newStreamForm: any;

  /* new Stream Dialog */
  dialogState: string; 
  display = false;


  constructor(
    private streamService: StreamService,
    private videoService: VideosService,
    private confirmationService: ConfirmationService,
    private messageService:MessageService

  ) {
    this.newStreamForm = new FormGroup({
      lcn: new FormControl({ value: '', disabled: false }),
      usi: new FormControl({ value: '', disabled: false }),
      name: new FormControl({ value: '', disabled: false }),
      description: new FormControl({ value: '', disabled: false }),
      videofile: new FormControl({ value: '', disabled: false }),
      tsid_sid_onid: new FormControl({ value: '', disabled: false }),
      enable: new FormControl({ value: false, disabled: false }),
      address: new FormControl({ value: '', disabled: false }),
      port: new FormControl({ value: '', disabled: false })
    });

    this.streamTableCols = [
      { field: 'eit' },
      { field: 'lcn' },
      { field: 'usi' },
      { field: 'name' },
      { field: 'videofile' },
      { field: 'enabled' },
      { field: 'status' },
      { field: 'action' },
      { field: 'tsid:sid:onid' },
      { field: 'address' },
      { field: 'port' }
    ];
  }

  ngOnInit() {
    this.streamService.getStream().subscribe(
      data => {
        this.streams = data;
      },
      err => {
        console.log(err.message);
      }
    );
    this.videoService.getVideosInfo().subscribe(
      data => {
        this.videosArray = data;
        this.selectOptionsValues();
      },
      err => {
        this.messageService.add({key: 'topLeftMessages' , severity:'error', summary:'HTTP Error ', detail:"GET Streams Error: " + err.message });
      }
    );
  }

  saveStream(value: string) {
    if (this.validateFields()) {

      let lcn = this.newStreamForm.getRawValue().lcn;
      let usi = this.newStreamForm.getRawValue().usi;
      let name = this.newStreamForm.getRawValue().name;
      let description = this.newStreamForm.getRawValue().description;
      let videofile = this.newStreamForm.getRawValue().videofile.filename;
      let videoid = this.newStreamForm.getRawValue().videofile.idvideo;
      let tsid = this.newStreamForm.getRawValue().tsid_sid_onid.split(':')[0];
      let sid = this.newStreamForm.getRawValue().tsid_sid_onid.split(':')[1];
      let onid = this.newStreamForm.getRawValue().tsid_sid_onid.split(':')[2];
      let enable = this.newStreamForm.getRawValue().enable;
      let address = this.newStreamForm.getRawValue().address;
      let port = this.newStreamForm.getRawValue().port;

      let stream: Stream = new Stream(
        lcn, usi, name, description, videofile, enable, address, port, tsid, sid, onid, videoid
      )

      if (this.dialogState === 'create') {
        this.streamService.saveStream(stream).subscribe(
          data => {
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              summary: 'Stream added successfully '
            });
            this.reloadStreamTable();
          },
          err => {
            this.messageService.add({severity:'error', summary:'HTTP Error ', detail:"Saving Stream Error: " + err.message });
          }
        );
        this.display = false; 
        this.newStreamForm.reset();
      }
      else {
        this.streamService.editStream(this.streamID, stream).subscribe(
          data => {
            this.msgs.push({
              severity: 'success',
              summary: 'Stream Edited successfully '
            });
            this.reloadStreamTable();
          },
          err => {
            console.log(err);
          }
        );
        this.display = false;
      }
    }
  }

  getStreamByID() {
    this.streamService.getStreamByID(this.streamID).subscribe(
      data => {
        this.fillEditForm(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  showDialog(streamID) {
    if (streamID === undefined) {
      this.dialogState = 'create';
      this.newStreamForm.reset();
      this.display = true;
    } else {
      this.streamID = streamID;
      this.dialogState = 'edit';
      this.getStreamByID();
      this.display = true;
    }
  }

  selectOptionsValues() {
    for (let i = 0; i < this.videosArray.length; i++) {
      delete this.videosArray[i].description;
      delete this.videosArray[i].audio;
      delete this.videosArray[i].color;
      delete this.videosArray[i].csa5;
      delete this.videosArray[i].enabled;
      delete this.videosArray[i].format;
      delete this.videosArray[i].ocs;
      delete this.videosArray[i].pmt;
      delete this.videosArray[i].resolution;
      delete this.videosArray[i].status;
      delete this.videosArray[i].subtitle;
    }
  }

  ConfirmDeleteStream(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this stream ?',
      header: 'Delete Confirmation',
      accept: () => {
        this.streamService.deleteStream(id).subscribe(
          data => {
            this.reloadStreamTable();
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              summary: 'Stream successfully deleted'
            });
          },
          err => {
            console.log(err);
          }
        );
      },
      reject: () => {
        //  this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }

  reloadStreamTable() {
    this.streamService.getStream().subscribe(
      data => {
        this.streams = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  fillEditForm(data) {
    console.log(data);
    let tsid_sid_onid = data.tsid + ':' + data.sid + ':' + data.onid;
    let video = { idvideo: data.video.idvideo, filename: data.video.filename };
    this.newStreamForm.patchValue({ lcn: data.lcn });
    this.newStreamForm.patchValue({ usi: data.usi });
    this.newStreamForm.patchValue({ name: data.name });
    this.newStreamForm.patchValue({ description: data.description });
    this.newStreamForm.patchValue({ videofile: video });
    this.newStreamForm.patchValue({ tsid_sid_onid: tsid_sid_onid });
    this.newStreamForm.patchValue({ enable: data.enable });
    this.newStreamForm.patchValue({ address: data.address });
    this.newStreamForm.patchValue({ port: data.port });
  }

  validateFields() {
    this.validationErrors = [];
    let ValidForm = true;
    if (this.newStreamForm.getRawValue().lcn == null) {
      this.validationErrors.push({ severity: 'error', summary: 'LCN', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().usi == null) {
      this.validationErrors.push({ severity: 'error', summary: 'USI', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().name == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Name', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().description == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Description', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().videofile == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Videofile', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().tsid_sid_onid == null) {
      this.validationErrors.push({ severity: 'error', summary: 'tsid_sid_onid', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().address == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Address', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().port == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Port', detail: 'field is required' });
      ValidForm = false;
    }

    return ValidForm;

  }

  
}