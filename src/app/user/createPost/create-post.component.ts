import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

import { FormGroup, FormControl, Validators, FormArray, NgForm, FormGroupDirective } from '@angular/forms';

import { Category } from 'src/app/categories/category.model';
import { MatSelectChange } from '@angular/material/select';
import { mimeType } from './mime-type.validator';
import { maxImgQuantityValidator } from './maxImgQuantity.validator';

interface SelectedCategory {
  categoryName: string, tags: string[];
}

@Component({
  selector: 'app-create-post-component',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})

export class CreatePostComponent implements OnInit, OnDestroy {
  @Output() onPostCreated = new EventEmitter<{
    title: string,
    content: string,
    tags: string[],
    image: File
  }>();
  @Input() categories: Category[];
  // @ViewChild('myForm') myForm;
  errorState = false;
  currentCategory: Category;
  currentSubcategories: { _id: string, id: string, name: string }[];
  selectedCategory: SelectedCategory;
  addedCategory: SelectedCategory;
  selectedCategories: SelectedCategory[];
  selectedTags: string[];


  imagePreview: string;
  imagePreviews: string[];
  form: FormGroup;
  private mode = 'create';
  isLoading: boolean;

  files = [];

  maxImageQuantity = 5;

  constructor(private store: Store<fromApp.AppState>
  ) { }


  ngOnInit(): void {
    this.selectedTags = [];
    this.imagePreviews = [];
    this.currentCategory = null;
    this.selectedCategory = null;
    this.addedCategory = null;
    this.selectedCategories = [];
    this.isLoading = false;
    this.form = new FormGroup({
      category: new FormControl('', { validators: [Validators.required] }),
      subcategory: new FormControl(null, { validators: [Validators.required] }),
      title: new FormControl('', {
        //   validators: [Validators.required, Validators.minLength(1)]
      }),
      content: new FormControl('', {
        //validators: [Validators.required, Validators.minLength(1)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        //  asyncValidators: [mimeType]
      }),
      images: new FormControl(null, {
     /*    validators: [maxImgQuantityValidator(this.maxImageQuantity)], */
        //  asyncValidators: [mimeType]

      })
    });



    /*   add later */
    if (this.mode == 'edit') {
      this.form.setValue({ title: "title" })
    }
  };

  // get category() { return this.form.get('category'); }



  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.files.push(file); //files

    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();

    this.form.patchValue({ images: this.files });
    this.form.get('images').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.imagePreviews.push(this.imagePreview);
    };
    reader.readAsDataURL(file);

  };

  onCategorySelect(event: MatSelectChange) {
    this.currentCategory = event.value;
    this.selectedCategory = { categoryName: this.currentCategory.name, tags: [] };
    this.selectedCategories.push({ ... this.selectedCategory });
  }

  onSubcategorySelect(event: MatSelectChange) {
    this.currentSubcategories = event.value;
    const tags = this.currentSubcategories.map(tag => tag.name);
    this.selectedCategories[this.selectedCategories.length - 1].tags = tags;
  }

  onAddCategory() {
    this.selectedCategory = null;
    this.form.get('category').reset();
    this.form.get('subcategory').reset();
    this.form.get('category').markAsUntouched;
  }

  onCancelAddCategory() {
    this.selectedCategories = null;
    this.onAddCategory();
  }

  onSavePost(f: any) {
    if (this.form.invalid) {
      return;
    }
    this.selectedCategories.forEach(item => {
      this.selectedTags = [...this.selectedTags, ...item.tags]
    });
    const post = {
      title: this.form.value.title,
      content: this.form.value.content,
      tags: [...this.selectedTags],
      image: this.form.value.image,
      images: this.form.value.images,
    };
    this.onPostCreated.emit(post);
    f.resetForm();
    this.form.markAsUntouched();
  }

  onReset() {
    this.selectedCategories = [];
    this.selectedCategory = null;
    this.form.reset();
    this.form.markAsUntouched();
  }

  onCancelCreatePost() {
    this.onReset();
    this.onPostCreated.emit(null);
  }

  ngOnDestroy(): void {
    //  this.authStatusSu.b.unsubscribe();
  }


}





