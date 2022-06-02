import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { EmlakDialogComponent } from './../dialogs/emlak-dialog/emlak-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { ApiService } from './../../services/api.service';
import { Emlak } from './../../models/Emlak';
import { Component, OnInit, ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-emlak',
  templateUrl: './emlak.component.html',
  styleUrls: ['./emlak.component.scss']
})
export class EmlakComponent implements OnInit {
  emlak: Emlak[];
  dataSource: any;
  displayedColumns=['emlakAdi','emlakFiyat','emlakAciklama','islemler']
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<EmlakDialogComponent>;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public  alert:MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.EmlakListele();
  }
  EmlakListele(){
    this.apiServis.EmlakListele().subscribe((d: Emlak[]) =>{
      this.emlak= d;
      this.dataSource = new MatTableDataSource(d);
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
    var yeniKayit: Emlak = new Emlak();
      this.dialogRef = this.matDialog.open(EmlakDialogComponent,{
        width : '400px',
        data : {
          kayit : yeniKayit,
          islem : 'ekle'
      }
      });
      this.dialogRef.afterClosed().subscribe(d=>{
        if (d){
          this.apiServis.EmlakEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.EmlakListele();
            }
          });
        }
          });
  }

  Duzenle(kayit: Emlak){
    this.dialogRef = this.matDialog.open(EmlakDialogComponent,{
      width : '400px',
      data : {
        kayit : kayit,
        islem : 'duzenle'
    }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        d.emlakId=kayit.emlakId
        this.apiServis.EmlakDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.EmlakListele();
          }
        });
      }
    });
  }

  Sil(kayit: Emlak){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    }); 
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.emlakAdi + "İsimli İlan Silinecektir. Onaylıyor Musunuz?"
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.EmlakSil(kayit.emlakId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.EmlakListele();
          }
        });
      }
    });

  }

}
