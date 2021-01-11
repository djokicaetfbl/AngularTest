import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent{

  @Input() message: string; // ovo input znaci da je atribut message setable from outside, odnosno da mu mozemo podesiti vrijednost s vama, (vidljiv je vanjskom svijetu :D)
  @Output() close = new EventEmitter<void>();

  onClose() {
      this.close.emit();
  }

}
