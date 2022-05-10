import {Component, Input} from '@angular/core';
import {ProductDetail} from '@recos-diet/domain';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  @Input()
  product!: ProductDetail;

  constructor() {
  }

}
