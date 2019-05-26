import { CredenciaisDTO } from "../models/Credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwthelper : JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storageService: StorageService) {

    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    successfulLogin(authorizationValue: string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwthelper.decodeToken(tok).sub
        }
        this.storageService.setLocalUser(user);
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
        {
            observe: 'response',
            responseType: 'text'
        })
    }

    logout() {
        this.storageService.setLocalUser(null);
    }

}