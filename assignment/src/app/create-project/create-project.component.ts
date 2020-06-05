import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  myForm: FormGroup;
  start_date = new Date();
  date: any;
  project: any;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {

    this.myForm = this.formBuilder.group({
      project_name: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[A-Z]{1}[a-z]{3,}')
      ]],
      project_code: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern('[PJ][A-Z]{4}')
      ]],
      project_manager: ['', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern('[A-Z]{1}[a-z]{3,} [A-Z]{1}')
      ]],
      project_start_date: ['', [
        Validators.required
      ]],
      project_end_date: ['', [
        Validators.required
      ]],
      project_budget: ['', [
        Validators.required
      ]],
      project_description: ['', [
        Validators.maxLength(1000)
      ]],
      team_members: this.formBuilder.array([])
    })

    this.myForm.get('project_start_date').valueChanges.subscribe(
      (date: any) => {
        this.date = date;
      });


  }
  goBack() {
    if (this.myForm.dirty) {
      if (confirm("Unsaved Changes. Are you want to continue ?")) {
        this.router.navigateByUrl("/");
      }
    }
    else {
      this.router.navigateByUrl("/");
    }
  }

  reset() {
    if (this.myForm.dirty) {
      if (confirm("Are you sure to reset all the fields?")) {
        this.myForm.reset();
      }
    }
  }

  get teamArray() {
    return this.myForm.get('team_members') as FormArray;
  }

  addMembers() {
    let member = this.formBuilder.group({
      member_id: ['', [
        Validators.required,
        Validators.pattern('^[A][C][E][0-9]{3}$')
      ]],
      member_name: ['', [
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{3,} [A-Z]{1}$')
      ]]
    })

    this.teamArray.push(member);
  }

  deleteMembers(i) {
    this.teamArray.removeAt(i);
  }

  createProject() {
    this.project = this.myForm.value;
    this.project.project_start_date = this.datepipe.transform(this.project.project_start_date, 'dd-LLL-yyyy');
    this.project.project_end_date = this.datepipe.transform(this.project.project_end_date, 'dd-LLL-yyyy');
    this.dataService.createProject(this.project).subscribe(data => {
      this.router.navigateByUrl('/');
    }
    )
  }

  get project_name() {
    return this.myForm.get('project_name');
  }

  get project_code() {
    return this.myForm.get('project_code');
  }
  get project_manager() {
    return this.myForm.get('project_manager');
  }
  get project_budget() {
    return this.myForm.get('project_budget');
  }
  get project_start_date() {
    return this.myForm.get('project_start_date');
  }
  get project_end_date() {
    return this.myForm.get('project_end_date');
  }
  get project_description() {
    return this.myForm.get('project_description');
  }
}
