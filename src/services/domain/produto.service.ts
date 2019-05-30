import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { CategoriaDTO } from "../../models/Categoria.dto";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findByCategoria(categoriaId: string) : Observable<ProdutoDTO[]> {
        let params = new HttpParams().set('categorias', categoriaId);
        return this.http.get<ProdutoDTO[]>(
            `${API_CONFIG.baseUrl}/produtos`,
            {params: params});
    }
}