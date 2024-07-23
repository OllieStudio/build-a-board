import { Injectable } from '@angular/core';
import { Website } from 'components/crm/banners/interfaces/website';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
website: Website = {} as Website;

  constructor() { }
}
