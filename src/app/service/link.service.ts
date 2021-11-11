import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor() { }

  modifyLink(href: string): string {
    return href.replace('http://localhost:8080', '');
  }
}
