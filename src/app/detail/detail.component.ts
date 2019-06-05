import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { IDetailsResult } from './idetails-result';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  private detailsState: IDetailsState;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        tap(event => console.log('child router event and state: ', event, this.router.getCurrentNavigation().extras.state)),
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.getCurrentNavigation().extras.state),
        filter((state: IDetailsState) => !!state && !!state.count)
      ).subscribe(this.handleState);
  }

  public get state(): IDetailsState {
    return this.detailsState;
  }

  ngOnInit() {
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

  // Must be an arrow function to preserve this context.
  private handleState = (state: IDetailsState) => {
    console.log('handling state in child.', state);
    this.detailsState = state;
  };
}
