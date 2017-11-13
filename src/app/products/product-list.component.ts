import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService} from './product.service';


@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{
    pageTitle: string = "Gigov Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    
    filteredProducts: IProduct[];
    
    _listFilter: string;
        get listFilter(): string {
            return this._listFilter;
        }
        set listFilter(value: string) {
            this._listFilter = value;
            this.filteredProducts = this.listFilter ? this.performFilter(this._listFilter) : this.products;
        }
    
    products: IProduct[] = [];
    
    constructor(private _productService: ProductService) {
        
    // this._listFilter = 'cart';
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
}

    ngOnInit(): void {
        console.log('In OnInit');
        this._productService.getProducts()
            .subscribe(
                products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                error => this.errorMessage = <any>error
            );
        
        this.filteredProducts = this.products;
    }
    
    performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
}