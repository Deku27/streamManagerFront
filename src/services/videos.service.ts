import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Video } from '../models/video';
import { Observable } from '../../node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class VideosService {
    constructor ( public http: HttpClient) {
    }
    getVideos() {
        return this.http.get('http://localhost:8080/videos')
            .pipe(map(res => <Video[]> res));

    }

    getVideosInfo() {
      return this.http.get('http://localhost:8080/getVideosInfo')
      .pipe(map(res => res));
    }


    saveVideo(video: Video) {
      return this.http.post('http://localhost:8080/videos', video)
          .pipe(map(res => res));

    }

    deleteVideo(id: number) {
      return this.http.delete('http://localhost:8080/video/' + id)
      .pipe(map(res => res));
    }


    uploadVideo(fileToUpload: File): Observable<string> {
      const endpoint = 'http://localhost:8080/uploadVideo';
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http
        .post(endpoint, formData, {reportProgress: true, responseType: 'text'}).
          pipe(
              map(res => res),
              catchError(
                  (err: HttpErrorResponse) => {
                    return Observable.throw(err.statusText);
                 }
              )
          );
    }


 }
