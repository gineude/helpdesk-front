import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private _titulo: string = '';

  constructor() { }

  get titulo(): string {
    return this._titulo;
  }

  set titulo(titulo: string) {
    this._titulo = titulo;
  }
}
