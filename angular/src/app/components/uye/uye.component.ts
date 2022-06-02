import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from './../../services/api.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {
  uyeler: Uye[];
  displayedColumns=['uyeAdSoyad','uyeEposta','uyeParola','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UyeDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;


  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.UyeListele();  
  }
    UyeListele(){
        this.apiServis.UyeListele().subscribe((d: Uye[])=>{
          this.uyeler = d;
          this.dataSource= new MatTableDataSource(this.uyeler);
          this.dataSource.sort=this.sort;
          this.dataSource.paginator=this.paginator;
        });
    }

    Filtrele(e){
      var deger = e.target.value;
      this.dataSource.filter = deger.trim().toLowerCase();
      if (this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
    }

    Ekle(){
      var yeniKayit: Uye = new Uye();
      this.dialogRef = this.matDialog.open(UyeDialogComponent,{
        width : '400px',
        data : {
          kayit : yeniKayit,
          islem : 'ekle'
      }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d){
        this.apiServis.UyeEkle(d).subscribe((s:Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListele();
          }
        });
      }
      });
    }

    Duzenle(kayit:Uye){
      this.dialogRef = this.matDialog.open(UyeDialogComponent,{
        width : '400px',
        data : {
        kayit : kayit,
        islem : 'duzenle'
        }
     });
     this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      kayit.uyeAdSoyad=d.uyeAdSoyad;
      kayit.uyeEposta=d.uyeEposta;
      kayit.uyeParola=d.uyeParola;

      this.apiServis.UyeDuzenle(d).subscribe((s:Sonuc) =>{
        this.alert.AlertUygula(s);
      });
    }
    });
    }

    Sil(kayit: Uye){
      this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
        width:'500px'
      }); 
      this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.uyeAdSoyad + "İsimli Üye Silinecektir. Onaylıyor Musunuz?"

      this.ConfirmDialogRef.afterClosed().subscribe(d=>{
        if (d) {
          this.apiServis.UyeSil(kayit.uyeId).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.UyeListele();
            }
          });
        }
      });
    }
  }
