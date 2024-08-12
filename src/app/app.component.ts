import { Component, NgZone } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService, ConfigService, DatabaseService } from '@ollieestudio/fire-lib';
import { environment } from 'src/environments/environment';
import { Usuario } from './services/interfaces/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Build-A-Board';

  constructor(private auth:AuthService<Usuario>, public config:ConfigService, public router:Router, public zone:NgZone){
    config.setAuthConfig(environment.firebase,['/home', '/login'],['/creator'],'/login','/login', '',this.router );
    config.setDatabaseConfig(environment.firebase);
    config.setGeoConfig(environment.firebase);
    config.setMessagingConfig(environment.firebase);
    config.setSmsConfig("emais.sms", "");
    config.setDataPath("");

    this.auth.stateGuard();
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/creator') {
          this.auth.stateObservable.subscribe((user:any)=>{
            if(user == null){
              this.router.navigate(['/login']);
            }else{
              this.auth.User = user;
            }
          })
        }
      }
    });
    

  }
}
