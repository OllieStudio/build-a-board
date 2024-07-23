import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService, DatabaseService } from '@ollieestudio/fire-lib';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Build-A-Board';

  constructor(public config:ConfigService, public router:Router, public zone:NgZone){
    config.setAuthConfig(environment.firebase,['/home'],[''],'/home/register','/home/login', '',this.router );
    config.setDatabaseConfig(environment.firebase);
    config.setGeoConfig(environment.firebase);
    config.setMessagingConfig(environment.firebase);
    config.setSmsConfig("emais.sms", "");
    config.setDataPath("");

  }
}
