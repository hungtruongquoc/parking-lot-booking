import {HttpClient} from '@angular/common/http';
import {GenericHttpService} from '@core/services/generic-http.service';
import {Spot} from '@core/store/Spot';
import {environment} from '@environments/environment';
import {SpotAdapter} from '@core/services/spot-adapter';
import {Injectable} from '@angular/core';

@Injectable()
export class SpotService extends  GenericHttpService<Spot>{

  constructor(private http: HttpClient) {
    super(http, environment.apiUrl, 'spots', new SpotAdapter());
  }

  public getAll() {
    debugger;
    return super.getAll();
  }
}
