import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Video } from '../../models/video';
import { VideosService } from '../../services/videos.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Message, ConfirmationService } from '../../../node_modules/primeng/primeng';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  providers: [ConfirmationService]

  // encapsulation: ViewEncapsulation.None,
})
export class VideosComponent implements OnInit {
  msgs: Message[] = [];
  videos: Video[];
  videosTableCols: any;
  newVideoForm: any;
  display = false;
  uploded = false;
  uploadError = false;

  dialogState: string;
  videoID: number;

  constructor(private videoService: VideosService, private confirmationService: ConfirmationService) {
    this.videosTableCols = [
      { field: 'filename' },
      { field: 'audio' },
      { field: 'subtitle' },
      { field: 'pmt' },
      { field: 'color' },
      { field: 'resolution' },
      { field: 'ocs' },
      { field: 'csa5' },
      { field: 'format' },
      { field: 'enabled' },
      { field: 'description' },
      { field: ' status' }
    ];
    this.newVideoForm = new FormGroup({
      filename: new FormControl({ value: '', disabled: true }),
      description: new FormControl({ value: '', disabled: false }),
      color: new FormControl({ value: false, disabled: false }),
      resolution: new FormControl({ value: '', disabled: false }),
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
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }


  saveVideo() {
    let filename = this.newVideoForm.getRawValue().filename;
    let description = this.newVideoForm.getRawValue().description;
    let color = this.newVideoForm.getRawValue().color;
    let ocs = this.newVideoForm.getRawValue().ocs;
    let csa5 = this.newVideoForm.getRawValue().csa5;
    let format = this.newVideoForm.getRawValue().format;
    let resolution = this.newVideoForm.getRawValue().resolution;
    let enabled = this.newVideoForm.getRawValue().enabled;

    let video: Video = new Video(
      filename,
      description,
      color,
      resolution,
      ocs,
      csa5,
      format,
      enabled
    );
    if (this.dialogState === 'create'){
      this.videoService.saveVideo(video).subscribe(
        data => {
          this.reloadVideoTable();
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Video successfully added'
          });
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
      this.display = false;
      this.newVideoForm.reset();
    }else{
      this.videoService.editVideo(this.videoID, video).subscribe(
        data => {
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Video Edited successfully '
          });
          this.reloadVideoTable();
        },
        err => {
          console.log(err);
        }
      );
      this.display = false;
    }

  }

  getVideoByID() {
    this.videoService.getVideoByID(this.videoID).subscribe(
      data => {
        this.fillEditForm(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  // ***** Upload functions
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
    this.videoService.uploadVideo(videoToUpload).subscribe(
      data => {
        this.uploded = true;
      },
      err => {
        this.uploadError = true;
      }
    );
  }

  ConfirmDeleteVideo(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'By deleting this Video, you are going to delete every stream related to it, do you want to proceed?',
      header: 'Delete Confirmation',
      accept: () => {
        this.videoService.deleteVideo(id).subscribe(
          data => {
            this.reloadVideoTable();
            this.msgs = [];
            this.msgs.push({
              severity: 'success',
              summary: 'Video successfully deleted'
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
  reloadVideoTable() {
    this.videoService.getVideos().subscribe(
      data => {
        this.videos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  fillEditForm(data){
    this.newVideoForm.patchValue({ filename: data.filename });
    this.newVideoForm.patchValue({ description: data.description });
    this.newVideoForm.patchValue({ color: data.color });
    this.newVideoForm.patchValue({ ocs: data.ocs });
    this.newVideoForm.patchValue({ csa5: data.csa5  });
    this.newVideoForm.patchValue({ format: data.format });
    this.newVideoForm.patchValue({ resolution: data.resolution });
    this.newVideoForm.patchValue({ enabled: data.enabled });
  }
}
