import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Fooditem from 'src/app/models/fooditem';
import { SearchService } from 'src/app/search.service';
import { FormControl } from '@angular/forms';
import { Observable, observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.css']
})
export class FoodViewComponent implements OnInit {

  //form control instance used for searching
  searchControl = new FormControl('');    //intial value is empty string as this will be updated when user enters something to search for...
  //array of food items, initially empty
  fooditems: Fooditem[] = [];
  //food item (on click display info)
  fooditem: Fooditem | undefined;
  //for saving fooditem name user is viewing in further detail
  userSearchFood: string = "";
  foodName: string | undefined;

  //link a search service instance on creation
  constructor(
    private searchService: SearchService,       //for using the seearch service we created
    private route: ActivatedRoute,              //for getting the current route
    private router: Router                      //for redirecting the user to another route
  ) { }

  //prevents access to ng things before its laoded on the page
  ngOnInit() {
    this.searchControl.valueChanges.subscribe((word: string) => {
      this.userSearchFood = word;
      console.log(`search word changing: ${word}`);
    });
  }
  //TODO: add error handling for non existant food items
  onSearch() {
    if (this.userSearchFood == "") {
      //subscription displays database results and will update if there are any changes to the database files
      this.searchService.getFoods().subscribe((fooditems: any) => {
        this.fooditems = fooditems;
      })
    } else {
      this.searchService.getFood(this.userSearchFood).subscribe((fooditem: any) => {
        this.fooditems = [];
        this.fooditems.push(fooditem);
      })
    }
    //using the search bar i want to filter the above results (which is all foods) down to one that reflects the users search
  }

  onMoreDetails() {
    this.route.params.subscribe((params: Params) => {
      this.foodName = params.foodname;
      if (!this.foodName) return;
      this.searchService.getFood(this.foodName).subscribe((fooditem: any) => this.fooditem = fooditem);
    });
  }
}
