import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDetailsResult } from '../idetails-result';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private detailsState: IDetailsState;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  public get state(): IDetailsState {
    return this.detailsState;
  }

  ngOnInit() {
    this.detailsState = this.location.getState() as IDetailsState;
    console.log('detail init');
    // return to master if I have no state (i.e. we deep linked here.)
    if (!this.state) {
      console.log('no state.');
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  public close(): Promise<boolean> {
    const detailsResult = {
      time: new Date()
    } as IDetailsResult;
    // TODO - I'm not thrilled that the component now has to be aware that it is only used as a child.
    return this.router.navigate(['../'], {relativeTo: this.route, state: {detailsResult}});
  }

}
