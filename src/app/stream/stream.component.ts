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
  providers: [ConfirmationService, MessageService]
})
export class StreamComponent implements OnInit {

  validationErrors = [];
  validatingErrosBlock = false;

  streams: Stream[];
  streamID: number;
  streamTableCols = [];

  videosArray: any;

  newStreamForm: any;

  dialogState: string;
  display = false;
  

  constructor(private streamService: StreamService,private videoService: VideosService,private confirmationService: ConfirmationService,
              private messageService: MessageService) {

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

   /**
   * on init : we get the streams List using the streamService , and then we display the data to the user
   */
  ngOnInit() {
    this.streamService.getStream().subscribe(
      data => {
        this.streams = data;
      },
      err => {
        this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP GET Streams failed, please check the API" });
      }
    );
    this.videoService.getVideosInfo().subscribe(
      data => {
        this.videosArray = data;
        this.selectOptionsValues();
      },
      err => {
        this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP GET Videos failed, please check the API: " + err.message });
      }
    );
  }
  
  /**
   * @function showDialog :Display the new/Edit Video Dialog
   * @param streamID: if the streamID  is  undefined, it means that we are in an create  state , otherwise , we are in a edit state .
   */

  showDialog(streamID) {
    this.validatingErrosBlock = false;
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

   /**
   * @function saveStream : if the Form fields are valid , we create the Stream Object and then we use the streamService to create/update the stream 
   */
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
            this.messageService.add({ key: 'topLeftMessages', severity: 'success', summary: 'Success Message', detail: 'Stream added successfully ' });
            this.reloadStreamTable();
          },
          err => {
            this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP save Stream failed, please check the API" + err.message });
          }
        );
        this.display = false;
        this.newStreamForm.reset();
      }
      else {
        this.streamService.editStream(this.streamID, stream).subscribe(
          data => {
            this.messageService.add({ key: 'topLeftMessages', severity: 'success', summary: 'Success Message', detail: 'Stream Edited successfully ' });
            this.reloadStreamTable();
          },
          err => {
            this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "updating Stream failed: " + err.message });
          }
        );
        this.display = false;
      }
    }
  }


  /**
   * @function getStreamByID : we get a stream by its ID 
   */
  getStreamByID() {
    this.streamService.getStreamByID(this.streamID).subscribe(
      data => {
        this.fillEditForm(data);
      },
      err => {
        this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP GET StreamByID failed, please check the API: " + err.message });
      }
    );
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

  /**
   * @function ConfirmDeleteStream : delete a stream  by its ID.
   * @param id : stream ID.
   */
  ConfirmDeleteStream(id: number) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this stream ?',
      header: 'Delete Confirmation',
      accept: () => {
        this.streamService.deleteStream(id).subscribe(
          data => {
            this.reloadStreamTable();
            this.messageService.add({ key: 'topLeftMessages', severity: 'info', summary: '', detail: "Stream Deleted Successfully" });
          },
          err => {
            this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP GET StreamByID failed, please check the API: " + err.message });
          }
        );
      },
      reject: () => { }
    });
  }

  /**
   * @function reloadStreamTable : when we create/Edit a stream , we need to reload the data so we can have like a real Time datatable. 
   */
  reloadStreamTable() {
    this.streamService.getStream().subscribe(
      data => {
        this.streams = data;
      },
      err => {
        this.messageService.add({ key: 'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: "HTTP GET Streams failed, please check the API: " + err.message });
      }
    );
  }

  fillEditForm(data) {
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

   /**
   * @function validFields: validate the create/Edit Form.
   */
  validateFields() {
    this.validationErrors = [];
    let ValidForm = true;
    if (this.newStreamForm.getRawValue().lcn == null) {
      this.validationErrors.push({ severity: 'error', summary: 'LCN', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().usi == null) {
      this.validationErrors.push({ severity: 'error', summary: 'USI', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().name == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Name', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().description == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Description', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().videofile == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Videofile', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().tsid_sid_onid == null) {
      this.validationErrors.push({ severity: 'error', summary: 'tsid_sid_onid', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().address == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Address', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }
    if (this.newStreamForm.getRawValue().port == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Port', detail: 'field is required' });
      this.validatingErrosBlock = true;
      ValidForm = false;
    }

    return ValidForm;

  }


}