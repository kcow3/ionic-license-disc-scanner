import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  private scanResultText: string = "";
  public licenseDisk: LicenseDisk;

  constructor(
    public alertController: AlertController,
    public barcodeScanner: BarcodeScanner
  ) {}

  public performScan() {
    this.barcodeScanner
      .scan({
        formats: "PDF_417",
        showTorchButton: true,
        prompt: "Get disk in area",
      })
      .then((barcodeData) => {
        this.scanResultText = barcodeData.text;
        this.licenseDisk = new LicenseDisk(barcodeData.text);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
}

class LicenseDisk {
  No: string; //5
  LicenceNo: string; //6
  VehRegNo: string; //7
  Description: string; //8
  Make: string; //9
  Model: string; //10
  Colour: string; //11
  VIN: string; //12
  DateOfExpiry: string; //14

  constructor(barcodeEncodedString: string) {
    var parts = barcodeEncodedString.split("%");
    this.No = parts[5];
    this.LicenceNo = parts[6];
    this.VehRegNo = parts[7];
    this.Description = parts[8];
    this.Make = parts[9];
    this.Model = parts[10];
    this.Colour = parts[11];
    this.VIN = parts[12];
    this.DateOfExpiry = parts[14];
  }
}
