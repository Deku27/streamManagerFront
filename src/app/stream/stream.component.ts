import { Component, OnInit } from '@angular/core';
import { Stream } from '../../models/stream';
import { StreamService } from '../../services.ts/stream.service';
import { FormGroup, FormControl } from '../../../node_modules/@angular/forms';
import { Video } from '../../models/video';
import { VideosService } from '../../services.ts/videos.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  streams: Stream[];
  videosArray: any;
  streamTableCols: any[];
  display = false;

  newStreamForm = new FormGroup ({
    lcn             : new FormControl({value: '', disabled: false}),
    usi         	  : new FormControl({value: '', disabled: false}),
    name        	  : new FormControl({value: '' , disabled: false}),
    description 	  : new FormControl({value: '', disabled: false}),
    videofile   	  : new FormControl({value: '' , disabled: false}),
    tsid_sid_onid   : new FormControl({value: '' , disabled: false}),
    enable      	  : new FormControl({value: false , disabled: false}),
    address     	  : new FormControl({value: '', disabled: false}),
    port 		  	    : new FormControl({value: '', disabled: false}),

  });

  constructor(private streamService: StreamService , private videoService: VideosService) { }


  ngOnInit() {
    this.streamService.getStream()
    .subscribe(
        data => {
            this.streams = data;
        }, err => {
            console.log(err);
        }
    );
    this.videoService.getVideosInfo()
        .subscribe(data => {
          this.videosArray = data;
          this.selectOptionsValues();
        }, err => {
          // console.log(err)
    });
    this.streamTableCols = [
      { field : 'eit'}, { field : 'lcn'} , { field : 'usi'}, { field : 'name' }, { field : 'videofile' }, { field : 'enabled' },
      { field : 'status' } , { field : 'action' }, { field : 'tsid:sid:onid' } , { field : 'address' } , { field : 'port'} ,
      { field : 'show' },
    ];
  }


  showDialog() {
    this.display = true;
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

  saveStream(value: string) {
    let streams = [...this.streams];
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

    let stream: Stream = new Stream(lcn, usi, name, description, videofile, enable, address,
      port, tsid, sid, onid, videoid);

      this.streamService.saveStream(stream)
        .subscribe(
          data => {
            console.log(data);
            streams.push(stream);
            this.streams = streams;
          },
          err => {
            console.log(err);
          }
        );
      this.display = false;
  }






}
