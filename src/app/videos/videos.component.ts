import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Video } from '../../models/video';
import { VideosService } from '../../services/videos.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Message, ConfirmationService, MessageService } from '../../../node_modules/primeng/primeng';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class VideosComponent implements OnInit {

  /* 
    Messages
  */
  msgs: Message[] = [];
  validationErrors: Message[] = [];
  uploadMessages: Message[] = [];


  videos: Video[];
  videoID: number;
  videosTableCols: any;


  newVideoForm: any;

  /*
    Upload Variables 
  */
  uploded = false;
  uploadError = false;

  /*
    Dialof Variables
  */
  dialogState: string;
  display = false;

  constructor(
    private videoService: VideosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.videosTableCols = [
      { field: 'filename' },{ field: 'audio' },{ field: 'subtitle' },{ field: 'pmt' },{ field: 'color' },{ field: 'resolution' },
      { field: 'ocs' },{ field: 'csa5' },{ field: 'format' },{ field: 'enabled' },{ field: 'description' },{ field: ' status' }
    ];
    this.newVideoForm = new FormGroup({
      filename: new FormControl({ value: '', disabled: true }),
      description: new FormControl({ value: '', disabled: false }),
      color: new FormControl({ value: false, disabled: false }),
      resolution: new FormControl({ value: 'HD', disabled: false }),
      ocs: new FormControl({ value: false, disabled: false }),
      csa5: new FormControl({ value: false, disabled: false }),
      format: new FormControl({ value: '16/9', disabled: false }),
      enabled: new FormControl({ value: false, disabled: false })
    });
  }

  ngOnInit() {
    this.videoService.getVideos().subscribe(
      data => {
        this.videos = data;
      },
      err => {
        this.messageService.add({key:'topLeftMessages', severity: 'error', summary: 'HTTP Error ', detail: " HTTP GET Videos Error, please check the API" });
      }
    );
  }

  showDialog(videoID) {
    if (videoID === undefined) {
      this.dialogState = 'create';
      this.newVideoForm.reset();
      this.display = true;
    } else {
      this.videoID = videoID;
      this.dialogState = 'edit';
      this.getVideoByID();
      this.display = true;
    }
  }
  saveVideo() {
    if (this.validFields()) {
      let filename = this.newVideoForm.getRawValue().filename;
      let description = this.newVideoForm.getRawValue().description;
      let color = this.newVideoForm.getRawValue().color;
      let ocs = this.newVideoForm.getRawValue().ocs;
      let csa5 = this.newVideoForm.getRawValue().csa5;
      let format = this.newVideoForm.getRawValue().format;
      let resolution = this.newVideoForm.getRawValue().resolution;
      let enabled = this.newVideoForm.getRawValue().enabled;

      let video: Video = new Video(filename,description,color,resolution,ocs,csa5,format,enabled);
      if (this.dialogState === 'create') {
        this.videoService.saveVideo(video).subscribe(
          data => {
            this.reloadVideoTable();
            this.msgs = [];
            this.msgs.push({severity: 'success',summary: 'Video successfully added'});
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'HTTP Error ', detail: " HTTP Post Video Error, please check the API" });
          }
        );
        this.display = false;
        this.newVideoForm.reset();
      } else {
        this.videoService.editVideo(this.videoID, video).subscribe(
          data => {
            this.reloadVideoTable();            
            this.msgs = [];
            this.msgs.push({severity: 'success',summary: 'Video Edited successfully '});
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'HTTP Error ', detail: " HTTP Update Video Error, please check the API" });
          }
        );
        this.display = false;
        this.newVideoForm.reset();
      }
    }
  }

  validFields() {
    this.validationErrors = [];
    let ValidForm = true;
    if (this.newVideoForm.getRawValue().filename == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Name', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newVideoForm.getRawValue().description == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Description', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newVideoForm.getRawValue().resolution == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Resolution', detail: 'field is required' });
      ValidForm = false;
    }
    if (this.newVideoForm.getRawValue().format == null) {
      this.validationErrors.push({ severity: 'error', summary: 'Format', detail: 'field is required' });
      ValidForm = false;
    }
    return ValidForm;
  }

  reloadVideoTable() {
    this.videoService.getVideos().subscribe(
      data => {
        this.videos = data;
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'HTTP Error ', detail: " HTTP GET Videos Error, please check the API" });
      }
    );
  }

  getVideoByID() {

    this.videoService.getVideoByID(this.videoID).subscribe(
      data => {
        this.fillEditFields(data);
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'HTTP Error ', detail: " HTTP GET Videos By ID Error, please check the API" });
      }
    );
  }

  fillEditFields(data) {
    this.newVideoForm.patchValue({ filename: data.filename });
    this.newVideoForm.patchValue({ description: data.description });
    this.newVideoForm.patchValue({ color: data.color });
    this.newVideoForm.patchValue({ ocs: data.ocs });
    this.newVideoForm.patchValue({ csa5: data.csa5 });
    this.newVideoForm.patchValue({ format: data.format });
    this.newVideoForm.patchValue({ resolution: data.resolution });
    this.newVideoForm.patchValue({ enabled: data.enabled });
  }

 
  ConfirmDeleteVideo(id: number) {
    this.confirmationService.confirm({
      message: 'By deleting this Video, you are going to delete every stream related to it, do you want to proceed?',
      header: 'Delete Confirmation',
      accept: () => {
        this.videoService.deleteVideo(id).subscribe(
          data => {
            this.reloadVideoTable();
            this.msgs = [];
            this.msgs.push({severity: 'success',summary: 'Video successfully deleted'});
          },
          err => {
            this.messageService.add({ severity: 'error', summary: 'HTTP Error ', detail: " HTTP DELETE Video Error, please check the API" });
          }
        );
      },
      reject: () => {}
    });

  }
  // ***** Upload & Validation Upload functions
  changeFileName(event) {
    let videoToUpload: File = event.files[0];
    this.newVideoForm.patchValue({ filename: videoToUpload.name });
  }
  clear() {
    this.newVideoForm.patchValue({ filename: '' });
    this.uploded = false;
    this.uploadError = false;
  }
  removeUploadedFile(event) {
    this.newVideoForm.patchValue({ filename: '' });
    this.uploded = false;
    this.uploadError = false;
  }
  uploadVideo(event, uploadForm) {
    let videoToUpload: File = event.files[0];
    if (this.checkExtenstion(videoToUpload.name)) {
      this.videoService.uploadVideo(videoToUpload).subscribe(
        data => {
          this.uploded = true;
          this.uploadMessages = [];
          this.uploadMessages.push({severity: 'Info',summary: 'Video successfully uploaded'});
        },
        err => {
          this.msgs = [];
          this.uploadMessages.push({severity: 'error',summary: 'HTTP Upload Videp Error , Please check the API'});
        });
    } else {
      this.msgs = [];
      this.uploadMessages.push({severity: 'error',summary: 'Check the extension of the file ( TS ) '});
    }

  }
  checkExtenstion(filename) {
    let allowedExtensions = ['png', 'jpg', 'ts'];
    let validFile = true;
    let fileExtension = filename.split('.').pop();
    if (this.isInArray(allowedExtensions, fileExtension)) {
      validFile = true;
    } else {
      validFile = false;
    }
    return validFile;
  }

  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }

}
