import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-sms-layout',
  imports: [Navbar, RouterOutlet, Sidebar],
  templateUrl: './sms-layout.html',
})
export default class SmsLayout {}
