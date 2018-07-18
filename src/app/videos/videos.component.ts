import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video';
import { VideosService } from '../../services/videos.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Message } from '../../../node_modules/primeng/primeng';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  msgs: Message[] = [];
  videos: Video[];
  videosTableCols = [
    {field: 'filename' }, { field : 'audio' }, { field : 'subtitle' }, { field : 'pmt' }, { field : 'color' },
    { field : 'resolution' }, { field :  'ocs' }, { field : 'csa5' },  { field : 'format' }, { field : 'enabled' },
    { field : 'description' }, { field : ' status' },
  ];
  newVideoForm = new FormGroup ({
    filename    : new FormControl({value: '', disabled: true}),
    description : new FormControl({value: '', disabled: false}),
    color       : new FormControl({value: false , disabled: false}),
    resolution  : new FormControl({value: '', disabled: false}),
    ocs         : new FormControl({value: false , disabled: false}),
    csa5        : new FormControl({value: false , disabled: false}),
    format      : new FormControl({value: '16/9', disabled: false}),
    enabled     : new FormControl({value: false, disabled: false}),
  });

  display = false;
  uploded = false;
  uploadError = false;
  constructor( private videoService: VideosService) { }

  ngOnInit() {

    this.videoService.getVideos()
      .subscribe(data => {
        this.videos = data;
      }, err => {
        console.log(err);
      });
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

    let video: Video = new Video(filename, description, color, resolution, ocs, csa5, format, enabled);
    this.videoService.saveVideo(video)
      .subscribe(
        data => {
          this.reloadVideoTable();
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Video successfully added'});
          console.log(data);
        },
        err => {
           console.log(err);
        }
      );
    this.display = false;
  }

  // ***** Upload functions
  onSelect(event) {
    let videoToUpload: File = event.files[0];
    this.newVideoForm.patchValue({filename : videoToUpload.name });
  }
  onClear() {
    this.newVideoForm.patchValue({filename : '' });
    this.uploded = false;
    this.uploadError = false;
  }
  onRemove(event) {
    this.newVideoForm.patchValue({filename : '' });
    this.uploded = false;
    this.uploadError = false;
  }

  uploadVideo(event, uploadForm) {
    let videoToUpload: File = event.files[0];
    this.videoService.uploadVideo(videoToUpload)
      .subscribe(
        data => {
          this.uploded = true;
        },
        err => {
          this.uploadError = true;
        }
      );
  }


  reloadVideoTable() {
    this.videoService.getVideos()
    .subscribe(
        data => {
            this.videos = data;
        }, err => {
            console.log(err);
        }
    );
  }
  showDialog() {
    this.display = true;
  }
}
