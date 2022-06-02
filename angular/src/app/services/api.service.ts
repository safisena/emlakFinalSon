import { Foto } from './../models/Foto';
import { Emlak } from './../models/Emlak';
import { Kategori } from './../models/Kategori';
import { Uye } from './../models/Uye';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:30385/api/";
  siteUrl = "http://localhost:30385/";
constructor(
  public http: HttpClient
) { }

tokenAl(kadi:string,parola:string){
  var data = "username="+kadi+"&password="+parola+"grant_type=password";
  var reqHeader = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"});
  return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
}

UyeListele(){
  return this.http.get(this.apiUrl+"uyelistele");
}
UyeById(uyeId:number){
  return this.http.get(this.apiUrl+"uyebyid/"+uyeId);
}
UyeEkle(uye: Uye){
  return this.http.post(this.apiUrl+"uyeekle", uye);
}
UyeDuzenle(uye: Uye){
  return this.http.put(this.apiUrl+"uyeduzenle", uye);
}
UyeSil(uyeId:number){
  return this.http.delete(this.apiUrl+"uyesil/"+uyeId);
}

EmlakListele(){
  return this.http.get(this.apiUrl+"emlaklistele");
}
EmlakById(emlakId:number){
  return this.http.get(this.apiUrl+"emlakbyid/"+emlakId);
}
EmlakEkle(emlak: Emlak){
  return this.http.post(this.apiUrl+"emlakekle", emlak);
}
EmlakDuzenle(emlak: Emlak){
  return this.http.put(this.apiUrl+"emlakduzenle", emlak);
}
EmlakSil(emlakId:number){
  return this.http.delete(this.apiUrl+"emlaksil/"+emlakId);
}

KategoriListele(){
  return this.http.get(this.apiUrl+"kategorilistele");
}
KategoriById(kategoriId:string){
  return this.http.get(this.apiUrl+"kategoribyid/"+kategoriId);
}
KategoriEkle(kat: Kategori){
  return this.http.post(this.apiUrl+"kategoriekle", kat);
}
KategoriDuzenle(kat: Kategori){
  return this.http.put(this.apiUrl+"kategoriduzenle", kat);
}
KategoriSil(kategoriId:string){
  return this.http.delete(this.apiUrl+"kategorisil/"+kategoriId);
}

FotoListele(){
  return this.http.get(this.apiUrl+"fotolistele");
}
FotoById(fotoId:string){
  return this.http.get(this.apiUrl+"fotobyid/"+fotoId);
}
FotoEkle(foto: Foto){
  return this.http.post(this.apiUrl+"fotoekle", foto);
}
FotoDuzenle(foto: Foto){
  return this.http.put(this.apiUrl+"fotoduzenle", foto);
}
FotoSil(fotoId:string){
  return this.http.delete(this.apiUrl+"fotosil/"+fotoId);
}

}
