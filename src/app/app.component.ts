import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpRequest} from "@angular/common/http";
import {PaperService} from "./paper.service";
import {Paper} from "./paper";
import {NgForm} from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  //class to save all paper form the backend
  papers: Paper[];

  //needed for example to know which Paper is currently edited
  public curPaper: Paper;

  //selecet the delted Paper
  public delPaper: Paper;

  //injecting the PaperService
  constructor(private paperService: PaperService, public translate: TranslateService) {
    translate.addLangs(['en', 'nl']);
    translate.setDefaultLang('en');
  }

  lang: string

  //override the given Constructor
  ngOnInit() {
    this.getPapers();
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

  // Handling the different Modals. Argument Paper so you can have Modals and functions (add or delte or edit for the specifix paper
  //mode gets passed to the function know which one to open
  public onOpenModal(paper: Paper, mode: string): void {

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
      this.curPaper = paper;
      button.setAttribute('data-target', '#updatePaperModal');
    }
    if(mode === 'delete') {
      this.delPaper = paper;
      button.setAttribute('data-target', '#deletePaperModal');
    }

    // !-Operator ist used to surpress error since we know the specific Object exists
    container!.appendChild(button);
    button.click();
  }


//case no paper as Input (for the add function)
  public onOpenModalNoInput(mode: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addPaperModal');
    const container = document.getElementById('mainContainer');
    container!.appendChild(button);
    button.click();
  }

  //gets the data that a User filled into the Form Element (a Modal)
  public onNewPaper(addForm: NgForm): void {
    //close the Modal automatically after the User clicks submit
    const closeButton = document.getElementById('close-add-paper-form');
    closeButton!.click();
    //subscribe --> waiting for this to happen (Listener)
    this.paperService.addPapers(addForm.value).subscribe(
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

  //updates a paper
  public onUpdatePaper(paper: Paper): void {
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


  switchLang(lang: string) {
    console.log(lang);
    this.translate.use(lang);
  }

}
