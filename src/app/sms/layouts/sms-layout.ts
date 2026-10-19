import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sms-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './sms-layout.html',
})
export default class SmsLayout {}
