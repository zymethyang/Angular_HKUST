import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating, FormType } from '../shared/rating';
import { Comment } from '../shared/comment';
import { visibility } from '../animations/app.animation';
import { flyInOut,expand } from '../animations/app.animation';



@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss'],
    host: {
        '[@flyInOut]': 'true',
        'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        visibility(),
        expand()
    ]
})
export class DishdetailComponent implements OnInit {
    dishIds: number[];
    prev: number;
    next: number;
    dish: Dish;
    errMess: string;
    ratingForm: FormGroup;
    rating: Rating;
    dishcopy = null;
    visibility = 'shown';
    formErrors = {
        'author': '',
        'rating': '',
        'comment': ''
    };

    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL) {
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
        this.dishcopy.save()
            .subscribe(dish => { this.dish = dish; console.log(this.dish); });
    }
    ngOnInit() {

        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
        this.route.params
            .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
            .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
            errmess => { this.dish = null; this.errMess = <any>errmess; });
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
