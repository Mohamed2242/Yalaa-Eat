import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private Name$ = new BehaviorSubject<string>("");
  private Email$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
  }

  public getNameFromStore(){
    return this.Name$.asObservable();
  }

  public setNameForStore(name:string){
    this.Name$.next(name)
  }

  public getEmailFromStore(){
    return this.Email$.asObservable();
  }

  public setEmailForStore(email:string){
    this.Email$.next(email)
  }
}
