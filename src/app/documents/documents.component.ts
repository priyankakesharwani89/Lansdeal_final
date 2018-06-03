import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { HttpClient, HttpEventType } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';
import { map } from 'rxjs/operators';
import { PropertyService } from '../services/property.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocumentService } from '../services/document.service';
import { Document } from 'models/document';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. 
      By the default, it's set to 'image/*'. */
  @Input() accept = 'pdf/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter();
  properties = [];
  propertyId: string;
  document: FormGroup;
  documents: Document[];
  dataLoading = false;
  private files: Array<FileUploadModel> = [];

  constructor(private router: Router, private _http: HttpClient, private documentService: DocumentService, private changeRef: ChangeDetectorRef, private propertyService: PropertyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataLoading = true;
    this.documents = [];
    this.properties = [];
    this.documentService.getDocumentList('547039586626').on('value', (snapshot) => {
      const json = snapshot.toJSON();
      if (json) {
        Object.keys(json).forEach((key) => {
          console.log('Key : ' + key + ', Value : ' + json[key])
          this.documents.push(json[key]);
        });
      }
      this.propertyService.getPropertyList('547039586626').on('value', (snapshot) => {
        const json = snapshot.toJSON();
        if (json) {
          Object.keys(json).forEach((key) => {
            console.log('Key : ' + key + ', Value : ' + json[key])
            this.properties.push(json[key]);
          });
        }

      this.dataLoading = false;
      this.changeRef.detectChanges();
      });
    });
    this.document = this.fb.group({
      propertyId: [''],
      file: '',
      fileType: '',
      eSigned: ['']
    })

  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    const base64textString = btoa(binaryString);
    this.document.controls.file.setValue(base64textString);
  }
  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];

        this.document.controls.fileType.setValue(file.type);
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });

        if (fileUpload.files && file) {
          var reader = new FileReader();

          reader.onload = this._handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
        }
      }

    };
    fileUpload.click();
  }
  getImageLink(fileType) {
    const type = fileType.split('/')[1];
    return '/assets/img/'+type+'.png';
  }
  cancelFile(file: FileUploadModel) {
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    file.canRetry = false;
  }
  submit() {
    this.document.controls.eSigned.setValue(false);
    this.uploadFile(this.document.controls.file.value);
  }
  uploadFile(file) {
    this.documentService.uploadInFirebase('547039586626', this.document.value).then((response) => {
      this.router.navigate(['documents']);
    });
  }
  eSign(document: Document){
    this.documentService.uploadFile(document).subscribe((response) => {
       document.eSigned =  true;
    });
  }
  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

}

export class FileUploadModel {
  data: File;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;

}
