import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IDetailsResult } from '../../detail/idetails-result';
import { IMasterRouterState } from './i-master-router-state';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  public count = 1;
  private childValue: IDetailsResult;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log('in constructor');
    router.events
      .pipe(
        // tap(event => console.log('router event and state: ', event, this.router.getCurrentNavigation().extras.state)),
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.getCurrentNavigation().extras.state),
        filter(state => !!state && !!state.detailsResult),
        map((state: IMasterRouterState) => state.detailsResult)
      )
      .subscribe(this.handleDetailsResult);
  }

  public get show(): boolean {
    return !(this.route && this.route.firstChild && (this.route.firstChild.routeConfig.path === 'detail'));
  }

  public get valueFromChild(): object {
    return this.childValue;
  }

  ngOnInit() {
    console.log('master on init');
  }

  // Arrow function to preserve this context on callback.
  private handleDetailsResult = (detailsResult: IDetailsResult) => {
    this.count += 1;
    this.childValue = detailsResult;
    console.log('currentNavigation state', this.router.getCurrentNavigation().extras.state);
  };

}
