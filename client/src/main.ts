import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent} from './app/app.component';
import { UsuariosComponent } from './app/usuarios/usuarios.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
