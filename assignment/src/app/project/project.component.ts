import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms'
import { Project } from '../project';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  project_id: string;
  isReadOnly: boolean;
  project: any;
  date: any;
  start_date = new Date();
  myForm: FormGroup;

  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private router: Router,
    private datepipe: DatePipe) {
    this.myForm = builder.group({
      project_name: [''],
      project_code: [''],
      project_manager: [''],
      project_start_date: [''],
      project_end_date: [''],
      project_budget: [''],
      project_description: [''],
      team_members: this.builder.array([])
    })
    this.route.params.subscribe(params => this.project_id = params.id);
  }

  ngOnInit() {
    this.dataService.getProject(this.project_id).subscribe(
      (data: Project) => {
        this.project = data;
        // this.project.project_start_date = this.datepipe.transform(this.project.project_start_date, 'yyyy-MM-dd');
        this.date = this.datepipe.transform(this.project.project_start_date, 'yyyy-MM-dd');
        this.project.project_end_date = this.datepipe.transform(this.project.project_end_date, 'yyyy-MM-dd');
        this.myForm = this.builder.group({
          id: this.project_id,
          project_name: [this.project['project_name'], [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[A-Z]{1}[a-z]{3,}$')
          ]],
          project_code: [this.project['project_code'], [
            Validators.required,
            Validators.maxLength(5),
            Validators.pattern('^[PJ][A-Z]{4}$')
          ]],
          project_manager: [this.project['project_manager'], [
            Validators.required,
            Validators.maxLength(40),
            Validators.pattern('^[A-Z]{1}[a-z]{3,} [A-Z]{1}$')
          ]],
          project_start_date: [this.project['project_start_date'], [
            Validators.required
          ]],
          project_end_date: [this.project['project_end_date'], [
            Validators.required
          ]],
          project_budget: [this.project['project_budget'], [
            Validators.required
          ]],
          project_description: [this.project['project_description'], [
            Validators.maxLength(1000)
          ]],
          team_members: this.builder.array([
          ])
        });
        this.isReadOnly = true;
        this.display(this.project.team_members);
      });

  }

  doEdit() {
    this.isReadOnly = false;
  }

  get teamArray() {
    return this.myForm.get('team_members') as FormArray;
  }

  display(team_members: any) {
    for (let i = 0; i < team_members.length; i++) {
      let member = this.builder.group({
        member_id: [team_members[i].member_id, [
          Validators.required,
          Validators.pattern('^[A][C][E][0-9]{3}$')
        ]],
        member_name: [team_members[i].member_name, [
          Validators.required,
          Validators.pattern('^[A-Z]{1}[a-z]{3,} [A-Z]{1}$')
        ]]
      })

      this.teamArray.push(member);
    }
  }
  addMembers() {
    let member = this.builder.group({
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

  updateProject() {
    this.project = this.myForm.value;
    this.project.project_start_date = this.datepipe.transform(this.project.project_start_date, 'dd-LLL-yyyy');
    this.project.project_end_date = this.datepipe.transform(this.project.project_end_date, 'dd-LLL-yyyy');
    this.dataService.updateProject(this.myForm.value).subscribe(
      data => {
        this.project = data;
        this.router.navigateByUrl('/');
      }
    )
  }

  deleteProject() {
    if (confirm("Are you sure to delete the Project Detail?")) {
      this.project = this.myForm.value;
      this.dataService.deleteProject(this.project).subscribe(data => {
        this.router.navigateByUrl('/');
      }

      );
    }
  }
}
