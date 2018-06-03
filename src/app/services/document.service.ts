import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Document } from 'models/document';

@Injectable()
export class DocumentService {
  fileUploadUrl = 'https://ext.digio.in:444/v2/client/document/upload';
  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  documents: Document[];
  documentDataDbPath = '/documents';
  getDocumentList(aadhaarNumber) {

    return this.db.database.ref()
      .child(this.documentDataDbPath + '/' + aadhaarNumber)
  }
  uploadInFirebase(aadhaarNumber, document) {
    let id = 'Document_1'
    this.documents = [];
    this.getDocumentList(aadhaarNumber).on('value', (snapshot) => {
      const json = snapshot.toJSON();
      if (json) {
        Object.keys(json).forEach((key) => {
          console.log('Key : ' + key + ', Value : ' + json[key])
          this.documents.push(json[key]);
        });
      }
      if (this.documents) {
        const lastDocument = this.documents[this.documents.length - 1];
        const lastId = parseInt(lastDocument.documentId.split('_')[1]);
        id = 'Document_' + (lastId + 1)
      }
    });

    document.documentId = id;
    let propObj = {

    };
    return this.db.list(this.documentDataDbPath + '/' + aadhaarNumber).push(document);
  }
  uploadFile(document: Document) {

    const authorization = 'Basic AIWSZ62Y2LYPJV75Z3MKLH2KRNJ9WZQN:B75C5W21NB16NBDYOXSX3A61MYWVVDWN';
    return this.http.post(this.fileUploadUrl,
      {
        "signers": [{
          "identifier": "gorthyravikiran@gmail.com",
          "aadhaar_id": "547039586626",
          "reason": "Document document"
        }],
        "expire_in_days": 10,
        "display_on_page": "all",
        "file_name": "test.pdf",
        "file_data": document.file
      }
      ,
      {
        headers: {
          "Authorization": "Basic " + btoa('AIWSZ62Y2LYPJV75Z3MKLH2KRNJ9WZQN' + ":" + 'B75C5W21NB16NBDYOXSX3A61MYWVVDWN'), 'content-type': 'application/json' }
      })
  }
}
