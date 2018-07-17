import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { Stream } from '../models/stream';


@Injectable()
export class StreamService {

   constructor ( public http: HttpClient) {
   }
   getStream() {
      return this.http.get('http://localhost:8080/eit')
           .pipe(map(res => <Stream[]> res));
   }

   saveStream(stream: Stream) {
    return this.http.post('http://localhost:8080/eit', stream)
          .pipe(map(res => res));

  }


}
