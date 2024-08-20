import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ItemSnapshot } from './creator.service';
import { ComponentService } from './component.service';
import { GameDataService } from './gamedata.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public currentSnapshot: ItemSnapshot = {} as ItemSnapshot;
  public currentIndex: number;
  private history: BehaviorSubject<ItemSnapshot[]> = new BehaviorSubject<ItemSnapshot[]>([]);
  private snapshotChanges: Subject<ItemSnapshot> = new Subject<ItemSnapshot>();

  constructor(private gamedataservice:GameDataService) {
    this.snapshotChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(800),
      )
      .subscribe((snapshot: ItemSnapshot) => {
        snapshot.timestamp = ~~(Date.now()); 
        const history = this.history.getValue();
        const updatedHistory = [...history, snapshot];
        this.currentSnapshot = snapshot;
        this.currentIndex = history.length;
        this.history.next(updatedHistory);
        console.log(updatedHistory)
      });
  }

  public addItemSnapshot(data?:any): void {
    this.snapshotChanges.next(this.componenteToSnapshot(data));
  }
 
  public updateItemSnapshot(update: any): void {
    this.snapshotChanges.next({...this.currentSnapshot, ...update});
  }

  public getHistory(): Observable<ItemSnapshot[]> {
    return this.history.asObservable();
  }

  public getPreviousItemSnapshot(): void {
    const history = this.history.getValue();
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentSnapshot = history[this.currentIndex];
    }
  }
  
  public getNextItemSnapshot(): void {
    const history = this.history.getValue();
    if (this.currentIndex < history.length-1) {
      this.currentIndex++;
      this.currentSnapshot = history[this.currentIndex];
    }
  }

  public disablePrevButton():boolean{
    return this.currentIndex <= 0;
  }

  public disableNextButton():boolean{
    return this.currentIndex >= this.history.getValue().length-1;
  }

  componenteToSnapshot(data: any): ItemSnapshot {
      let snapshot:ItemSnapshot = {} as ItemSnapshot;
      snapshot.id = data?.id;
      snapshot.template = data?.template.replace(/\n/g,'');
      snapshot.timestamp = ~~(Date.now());
      snapshot.gameid = this.gamedataservice.game?.id;
      return snapshot;
  }
}
