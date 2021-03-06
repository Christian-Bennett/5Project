import { Component, Renderer2 } from '@angular/core';
import { pathToFileURL } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Universicality';

  constructor(private renderer: Renderer2)
  {
    this.renderer.setStyle(document.body, 'margin', '0');
    this.renderer.setStyle(document.body, 'height', '100%');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-image', 'url("../assets/images/Dashboard.jpg")');

  }
}
