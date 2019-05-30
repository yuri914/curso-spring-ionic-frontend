import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  categoriaId: string;
  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams
      , public produtoService: ProdutoService) {
    this.categoriaId = navParams.get("categoriaId");
  }

  ionViewDidLoad() {
    /*this.produtoService.findByCategoria(this.categoriaId)
      .subscribe(response => {
        this.items = response;
      },
      error => {});*/
      this.items = [
        {
          id: "1",
          nome: 'Mouse',
          preco: 80.99
        },
        {
          id: "2",
          nome: 'Teclado',
          preco: 100.00
        }
      ]
    };

}
