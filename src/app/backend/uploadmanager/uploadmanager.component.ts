import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadmanager',
  templateUrl: './uploadmanager.component.html',
  styleUrls: ['./uploadmanager.component.css']
})
export class UploadmanagerComponent implements OnInit {
  isHovering: boolean = false
  files: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
      this.isHovering = event;
  }

  onDrop(files: FileList) {
      for (let i = 0; i < files.length; i++) {
          console.log('uploadManager adding file: ', files.item(i));
          this.files.push(files.item(i));
      }
  }

}
