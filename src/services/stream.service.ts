import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { Stream } from '../models/stream';
import { environment } from '../environments/environment';


@Injectable()
export class StreamService {
  apiUrl = environment.apiUrl;
  constructor ( public http: HttpClient) {}

   /** 
   * @function getStream : Service to get all streams
  */
  getStream() {
      return this.http.get(this.apiUrl+'eit')
           .pipe(map(res => <Stream[]> res));
  }
  /** 
   * @function getStreamByID :Service to get a stream by its ID
   * @param id : the stream ID
  */
  getStreamByID(id: number){
      return this.http.get(this.apiUrl+'eit/'+ id)
            .pipe(map(res => <Stream> res));
  }

  /** 
   * @function saveStream :Service to save a stream 
   * @param stream : the stream object
  */
  saveStream(stream: Stream) {
    return this.http.post(this.apiUrl+'eit/', stream)
          .pipe(map(res => res));
  }
  
  /** 
   * @function editStream :Service to edit a stream 
   * @param id : the stream id
   * @param stream :  the stream object
  */
  editStream(id: number, stream: Stream) {
    return this.http.put(this.apiUrl+'eit/'+ id , stream)
      .pipe(map(res => res));
  }


  /** 
   * @function deleteStream :Service to delete a stream 
   * @param id : the stream ID
  */
  deleteStream(id: number) {
    return this.http.delete(this.apiUrl+'eit/'+ id)
      .pipe(map(res => res));
  }

}
