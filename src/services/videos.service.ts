import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { Observable } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class VideosService {
  apiUrl = environment.apiUrl;
  constructor(public http: HttpClient) {}

  /** 
   * @function getVideos : Service to save a Video
  */
  getVideos() {
    return this.http
      .get(this.apiUrl+'videos')
      .pipe(map(res => <Video[]>res));
  }

  /**
   *  @function getVideosInfo :Service to get the informations about the videos
  */
  getVideosInfo() {
    return this.http
      .get(this.apiUrl+'getVideosInfo')
      .pipe(map(res => res));
  }

  /**
   *  @function getVideoByID : Service to get the video by its id 
   * @param id: video ID
  */
  getVideoByID(id: number) {
    return this.http
      .get(this.apiUrl+'video/'+ id)
      .pipe(map(res => <Video>res));
  }


  /**
   *  @function saveVideo :Service to save a video
   *  @param video : Video Object
   */ 
  saveVideo(video: Video) {
    return this.http
      .post(this.apiUrl+'videos', video)
      .pipe(map(res => res));
  }

 /**
  *  @function editVideo :Service to edit a video
  * @param id: Video ID
  * @param video : Video Object
  */
  editVideo(id: number, video: Video) {
    return this.http
      .put(this.apiUrl+'video/'+ id, video)
      .pipe(map(res => res));
  }


  /**
  *  @function deleteVideo :Service to delete a video
  * @param id: Video ID
  */
  deleteVideo(id: number) {
    return this.http
      .delete(this.apiUrl+'video/' + id)
      .pipe(map(res => res));
  }


  /**
  * @function uploadVideo: Service to upload a video file
  * @param fileToUpload: The Video File
  */
  uploadVideo(fileToUpload: File): Observable<string> {
    const endpoint = this.apiUrl+'uploadVideo';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, { reportProgress: true, responseType: 'text' })
      .pipe(
        map(res => res),
        catchError((err: HttpErrorResponse) => {
          return Observable.throw(err.statusText);
        })
      );
  }
}
