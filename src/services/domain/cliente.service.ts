import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/Cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { LocalUser } from "../../models/local_user";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storageService: StorageService) {

    }

    findByEmail(email: string) : Observable<ClienteDTO>{
        let user = this.storageService.getLocalUser();
        let parametros = new HttpParams().set('value', email);
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + user.token);
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email`, {params: parametros, headers: headers});
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

}