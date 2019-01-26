import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { STORAGE_KEYS } from '../../config/storage_keys.config';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {

  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}
