import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      public produtoService: ProdutoService,
      public cartService: CartService) {
  }

  ionViewDidLoad() {
    /*this.item = {
      id: "1",
      nome: "Mouse",
      preco: 80.59
    }*/
    let produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId)
    .subscribe(response => {
      this.item = response;
      this.getImageUrlIfExist();
    },
    error => {});
  }

  getImageUrlIfExist() {
    this.produtoService.getImageFromBucket(this.item.id)
    .subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`; 
    },
    error => {})
  }

  addToCart() {
    this.cartService.addProduto(this.item);
    this.navCtrl.setRoot('CartPage');
  }
}
