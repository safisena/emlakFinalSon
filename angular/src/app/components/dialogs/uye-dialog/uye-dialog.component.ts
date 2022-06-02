import { Uye } from './../../../models/Uye';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik : string;
  islem : string;
  frm : FormGroup;
  yeniKayit : Uye;
  
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="Üye Ekle"
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="Üye Düzenle"
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      uyeAdSoyad:[this.yeniKayit.uyeAdSoyad],
      uyeEposta:[this.yeniKayit.uyeEposta],
      uyeParola:[this.yeniKayit.uyeParola]
    });
  }

}
