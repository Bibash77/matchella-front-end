import {HttpHeaders} from '@angular/common/http';
import {ApiConfig} from "./ApiConfig";
import {LocalStorageUtil} from "./utils/local-storage-util";

export class ApiUtils {
  public static getRequest(api: string) {
    const fullApi = `${ApiConfig.URL}/${api}`;
    const at = LocalStorageUtil.getStorage().at;

    return {
      url: fullApi,
      header: new HttpHeaders({
        Authorization: 'Bearer ' + at,
        'Content-Type': 'application/json'
      })
    };
  }

  public static getRequestUnauthenticated(api: string) {
    const fullApi = `${ApiConfig.URL}/${api}`;

    return {
      url: fullApi,
      header: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
