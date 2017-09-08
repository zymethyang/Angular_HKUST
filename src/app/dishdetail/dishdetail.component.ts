import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, FormType } from '../shared/rating';
import { Comment } from '../shared/comment';

const DISH = {
    name: 'Uthappizza',
    image: '/assets/images/uthappizza.png',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
    comments: [
        {
            rating: 5,
            comment: "Imagine all the eatables, living in conFusion!",
            author: "John Lemon",
            date: "2012-10-16T17:57:28.556094Z"
        },
        {
            rating: 4,
            comment: "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
            author: "Paul McVites",
            date: "2014-09-05T17:57:28.556094Z"
        },
        {
            rating: 3,
            comment: "Eat it, just eat it!",
            author: "Michael Jaikishan",
            date: "2015-02-13T17:57:28.556094Z"
        },
        {
            rating: 4,
            comment: "Ultimate, Reaching for the stars!",
            author: "Ringo Starry",
            date: "2013-12-02T17:57:28.556094Z"
        },
        {
            rating: 2,
            comment: "It's your birthday, we're gonna party!",
            author: "25 Cent",
            date: "2011-12-02T17:57:28.556094Z"
        }
    ]
};

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    dishIds: number[];
    prev: number;
    next: number;
    dish: Dish;
    ratingForm: FormGroup;
    rating: Rating;
    formErrors = {
        'author': '',
        'rating': '',
        'comment': ''
    };

    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder) {
        this.createForm();
    }

    createForm(): void {
        this.ratingForm = this.fb.group({
            author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            rating: [5, Validators.required],
            comment: ['', Validators.required],
            date: ''
        });
        this.ratingForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged(); // (re)set validation messages now
    }
    onValueChanged(data?: any) {
        if (!this.ratingForm) { return; }
        const form = this.ratingForm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    validationMessages = {
        'author': {
          'required': 'Name is required.',
          'minlength': 'Name must be at least 2 characters long.',
          'maxlength': 'Name cannot be more than 25 characters long.'
        },
        'rating': {
          'required': 'Rating is required.',
          'pattern': 'Rating must contain only numbers.'
        },
        'comment': {
            'required': 'Comment is required.',
            'minlength': 'Name must be at least 2 characters long.'
          },
      };
      onSubmit() {
        this.rating = this.ratingForm.value;
        this.rating.date = new Date().toISOString();
        console.log(this.rating);
        this.ratingForm.reset({
          author: '',
          rating: 5,
          comment: '',
        });
        this.dish.comments.push(this.rating);
      }
    ngOnInit() {

        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params
            .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
            .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    }

    setPrevNext(dishId: number) {
        let index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
        this.location.back();
    }

}
