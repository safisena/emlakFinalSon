import { Emlak } from './../../../models/Emlak';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UyeDialogComponent } from '../uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-emlak-dialog',
  templateUrl: './emlak-dialog.component.html',
  styleUrls: ['./emlak-dialog.component.css']
})
export class EmlakDialogComponent implements OnInit {
  dialogBaslik : string;
  islem : string;
  frm : FormGroup;
  yeniKayit : Emlak;
  
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<EmlakDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="İlan Ekle"
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="İlan Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      emlakAdi:[this.yeniKayit.emlakAdi],
      emlakFiyat:[this.yeniKayit.emlakFiyat],
      emlakAciklama:[this.yeniKayit.emlakAciklama]
    });
  }

}
