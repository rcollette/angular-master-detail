import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { IMasterRouterState } from '../master/i-master-router-state';
import { IDetailsResult } from './idetails-result';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        tap(event => console.log('child router event and state: ', event, this.router.getCurrentNavigation().extras.state)),
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.getCurrentNavigation().extras.state),
        filter(state => !!state && !!state.my),
        map((state: IMasterRouterState) => state.detailsResult)
      ).subscribe(() => console.log('an event'));
  }

  ngOnInit() {
    console.log('detail on init');
  }

  public close(): Promise<boolean> {
    const detailsResult = {
      time: new Date()
    } as IDetailsResult;
    // TODO - I'm not thrilled that the component now has to be aware that it is only used as a child.
    return this.router.navigate(['../'], {relativeTo: this.route, state: {detailsResult}});
  }
}
