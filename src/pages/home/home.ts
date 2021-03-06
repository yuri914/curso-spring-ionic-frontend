import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {email: "", senha: ""};

  constructor(public navCtrl: NavController, public menu: MenuController, public authService: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authService.refreshToken().subscribe(response => {
      let token = response.headers.get("Authorization");
      this.authService.successfulLogin(token);
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      let token = response.headers.get("Authorization");
      this.authService.successfulLogin(token);
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
