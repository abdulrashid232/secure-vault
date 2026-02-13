import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-design-system-demo',
  imports: [CommonModule, Button, Input, Card],
  templateUrl: './design-system-demo.html',
  styleUrl: './design-system-demo.css'
})
export class DesignSystemDemoComponent {
  // Demo data/logic if needed
}
