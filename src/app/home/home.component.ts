import { animate,keyframes,query, style, transition, trigger,stagger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transition: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transition: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transition: 'translateY(0)', offset: 1}),
          ]))]),{optional: true}),

          query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transition: 'translateY(0)', offset: 0}),
              style({opacity: .5, transition: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transition: 'translateY(-75%)', offset: 1}),
            ]))]),{optional: true})

        ])
      ])
  ]
})
export class HomeComponent implements OnInit {
  
  itemCount: number = 4;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals: any = ['My first life goal','My second life goal','My third life goal',];

  constructor(private _data: DataService) { }

  ngOnInit(): void {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
  }
  removeItem(i:any){
    this.goals.splice(i, 1);
  }

}
