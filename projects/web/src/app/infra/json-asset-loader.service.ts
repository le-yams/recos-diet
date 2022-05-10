import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JsonAssetLoaderService {

  constructor(private http: HttpClient) {
  }

  load<T>(name: string): Promise<T> {
    const url = location.origin + '/assets/' + name + '.json?no-cache=' + new Date().getTime();
    return this.http.get<T>(url).toPromise();
  }
}
