import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {PaperService} from "./paper.service";
import {Paper} from "../models/paper";
import {NgForm} from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import {Observable, Subscription} from "rxjs";
import {FormControl} from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { formatDate } from '@angular/common';
import {TypeEnum} from "../models/type-enum";
import {AuthenticationService} from "../services/authentication.service";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  subscriptions: Subscription[] = []

  authForm = new FormGroup({
    Username: new FormControl(),
    Password: new FormControl()
    }
  )

  editForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    contact_person: new FormControl(),
    institute: new FormControl(),
    division: new FormControl(),
    paid: new FormControl(),
    withPartner: new FormControl(),
    paperCode: new FormControl(),
    imageUrl: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    type: new FormControl()
  });

  addForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    contact_person: new FormControl(),
    institute: new FormControl(),
    division: new FormControl(),
    paid: new FormControl(),
    withPartner: new FormControl(),
    paperCode: new FormControl(),
    imageUrl: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    type: new FormControl()
  });

  searchForm = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    //contact_person: new FormControl(),
    institute: new FormControl(),
    // division: new FormControl(),
    // paid: new FormControl(),
    // withPartner: new FormControl(),
    // startDate: new FormControl(),
    // endDate: new FormControl(),
    // type: new FormControl()
  });


  //for the Dropdown in the add and change modal
  divisionDropdownValues = ["Finance & Accounting", "Management & Marketing", "Supply Chain & Information Management", "Wirtschaftsinformatik"]
  instituteHashMap = new Map<string, string[]>([
    ["Finance & Accounting", ["Betriebliche Finanzwirtschaft", "Betriebswirtschaftliche Steuerlehre", "Controlling und Consulting", "Management Accounting", "Public und Nonprofit Management", "Unternehmensrechnung und Wirtschaftsprüfung"]],
    ["Management & Marketing", ["Personalführung und Veränderungsmanagement", "Innovationsmanagement", "Internationales Management", "Organisation", "Strategisches Management", "Unternehmensgründung und Unternehmensentwicklung"]],
    ["Supply Chain & Information Management", ["Digital Business", "Produktions- und Logistikmanagement", "Wirtschaftsinformatik - Communications Engineering", "Information Engineering", "Software Engineering"]],
    ["Wirtschaftsinformatik", ["Software Engineering", "Data & Knowledge Engineering", "Communications Engineering", "Information Engineering"]],
  ]);

  instituteDropDownValues: string[] = [];

  typeDropDownValues: string[] = ["Bachelorarbeit", "Masterarbeit", "Doktorarbeit"];

  //class to save all paper form the backend
  papers: Paper[];

  //select the deleted Paper
  public delPaper: Paper;
  public curPaper: Paper;

  isValidated = false;

  //injecting the PaperService
  constructor(private paperService: PaperService, public translate: TranslateService, public authService: AuthenticationService) {
    translate.addLangs(['en', 'de']);
    translate.setDefaultLang('de');
  }

  lang: string;

  //override the given Constructor
  ngOnInit() {
    this.subscriptions.push(this.editForm.get("division")?.valueChanges.subscribe(x => {
        let values = this.instituteHashMap.get(x);
        if(values !== undefined) {
          this.instituteDropDownValues = values;
        }
      }) as Subscription);

    this.subscriptions.push(this.addForm.get("division")?.valueChanges.subscribe(x => {
      let values = this.instituteHashMap.get(x);
      if(values !== undefined) {
        this.instituteDropDownValues = values;
      }
    }) as Subscription);
    this.getPapers();

    this.searchForm.valueChanges.subscribe(console.log)
  }

  auth(){}

  login() {
    console.log("login");
    this.authService.login().subscribe(res => console.log(res))

  }

  isLoggedIn():boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    console.log("logout");
    this.authService.logout();
  }

  public getPapers(): void {
    //subscribe to get notfied
    this.paperService.getPapers().subscribe(
      //code for best case (getting a paper)
      (response: Paper[]) => {
        this.papers = response;
      },
      //code for when an error comes along
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchPaper(key: string): void{
    //container to store all Matches
    const findings: Paper [] = [];

    //loop over all papers an check if. -1 no match found in the indexOf function.
    for (const paper_i of this.papers) {
      if (paper_i.title.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.contact_person.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.description.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.division.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.institute.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      )  {
        findings.push(paper_i);
      }
    }
  //only show the results
    this.papers = findings;

    //case nothing was found or the field is empty --> reset to show all Papers
    if (findings.length === 0 || !key) {
      this.getPapers();
    }
  }

  public searchPaperDetail(key: string): void{
    //container to store all Matches
    const findings: Paper [] = [];

    //loop over all papers an check if. -1 no match found in the indexOf function.
    for (const paper_i of this.papers) {
      if (paper_i.title.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.contact_person.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.description.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.division.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
        || paper_i.institute.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1
      )  {
        findings.push(paper_i);
      }
    }
    //only show the results
    this.papers = findings;

    //case nothing was found or the field is empty --> reset to show all Papers
    if (findings.length === 0 || !key) {
      this.getPapers();
    }
  }

  public editPaper(paper: Paper) {
    this.editForm.setValue(paper);
    this.onOpenModal("update");
  }

  public addPaper() {
    this.addForm.reset();
    this.onOpenModal("add");
  }


  // Handling the different Modals. Argument Paper so you can have Modals and functions (add or delte or edit for the specifix paper
  //mode gets passed to the function know which one to open
  public onOpenModal(mode: string, paper?: Paper): void {

    //get acces to the div with the id mainContainer which is the whole page
    const container = document.getElementById('mainContainer');
    //creates a button that when clicked opens the  modal
    const button = document.createElement('button');
    //default is submit button is needed (see dokumentation boostrap modal
    button.type = 'button';
    //style so not displayed since button are in the template already
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal');

    //TODO Make a switch statement
    // #because the are IDs (html)
    if(mode === 'update') {
      //set the active (Paper that was clicked on) to this paper -- can be binded in the html form
      button.setAttribute('data-target', '#updatePaperModal');
    }
    else if(mode === 'delete') {
      if (paper !== undefined) {
        this.delPaper = paper;
      }
      button.setAttribute('data-target', '#deletePaperModal');
    }
    else if (mode === "add") {
      button.setAttribute('data-target', '#addPaperModal');
    }
    else if (mode === "view") {
      if (paper !== undefined) {
        this.curPaper = paper;
      }
      button.setAttribute('data-target', '#viewPaperModal');
    }

    // !-Operator ist used to surpress error since we know the specific Object exists
    container!.appendChild(button);
    button.click();
  }

  //gets the data that a User filled into the Form Element (a Modal)
  public onNewPaper(): void {
    if (this.addForm.valid) {
      let paper = this.addForm.value;
      //close the Modal automatically after the User clicks submit
      const closeButton = document.getElementById('close-add-paper-form');
      closeButton!.click();
      //subscribe --> waiting for this to happen (Listener)
      this.paperService.addPapers(paper).subscribe(
        //when no error execute the response part when its an error execute the error part
        (response: Paper) => {
          //Todo delete later
          console.log(response);
          this.getPapers()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  //updates a paper
  public onUpdatePaper(): void {
    if (this.editForm.valid) {
      let paper = this.editForm.value;
      this.paperService.updatePapers(paper).subscribe(
        (response: Paper) => {
          console.log(response);
          //reload the page to show changes
          this.getPapers()
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  //deletes a paper
  public onDeletePaper(paperId: number): void {
    this.paperService.deletePapers(paperId).subscribe(
      (response: void) => {
        console.log(response);
        //reload the page to show changes
        this.getPapers()
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  //changing between the languages (de|en)
  switchLang(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }

  public getDate(): string {
    if (this.curPaper.startDate === null) {
      return "";
    }
    console.log(this.curPaper.startDate.getDate().toString());
    return this.curPaper.startDate.getDate().toString();
  }

  //for forms with angular TODO
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }


}

//For the translation in aws
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}


