import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "@app/_helpers";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "@app/_services";
import {CardCreateService} from "@app/card-creation/card-create.service";
import {CardType} from "@app/_models/card-type";
import {Card} from "@app/_models/Card";

@Component({
  selector: 'app-card-creation',
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.less']
})
export class CardCreationComponent implements OnInit {
  form: FormGroup
  cardType:CardType;
  loading = false;
  submitted = false;
  image = null;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private alertService: AlertService,
               private cardService: CardCreateService) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      detailBody: ['', Validators.required],
      maxAllowedMatch: [1],
      cardType:[CardType.DATING]
    });
  }

  handleUpload(event) {
    console.log("asds" , event);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
      console.log(this.image);
    };

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
    if(this.form.invalid) {
      this.submitted = false;
      return;
    }
    const val = this.form.value;
    const  data = new Card();
    data.cardType = val.cardType;
    data.detailBody = val.detailBody;
    data.title = val.title;
    data.maxAllowedMatch = val.maxAllowedMatch;
    data.cardImage = this.image;
    data.cardExpiryDate = new Date();

    this.cardService.register(data).subscribe(value => {

    }, error => {
      this.submitted = false;
      console.log(error);
      this.alertService.error("error while submission");
    })
  }
}
