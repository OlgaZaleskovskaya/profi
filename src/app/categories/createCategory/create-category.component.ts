import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../category.model';


@Component({
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']

})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  currentCategory: Category;
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentCategory = data;
  }
  ngOnInit(): void {
    if (this.currentCategory) {
      this.categoryForm = new FormGroup({
        'category': new FormControl(this.currentCategory.name, Validators.required),
        'subCategories': new FormArray([])
      });
      this.categoryForm.setControl('subCategories', this.setSubCategories());
    } else {
      this.categoryForm = new FormGroup({
        'category': new FormControl('', Validators.required),
        'subCategories': new FormArray([])
      })
    }
  }

  private setSubCategories(): FormArray {
    const subCategoryArray = new FormArray([]);
    this.currentCategory.tags.forEach(
      (item) => subCategoryArray.push(new FormControl(item))
    )
    return subCategoryArray;
  }

  onAddSubCategory() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.categoryForm.get('subCategories')).push(control);
  }

  onSubmit() {
    if (!this.currentCategory) {
      const category = this.categoryForm.controls.category.value;
      const subCategories = this.categoryForm.controls.subCategories.value;
      this.dialogRef.close({ category: category, subCategories: subCategories });
    } else {
      const updatedCategory = {
        ...this.currentCategory,
        category: this.categoryForm.controls.category.value,
        subcategories: this.categoryForm.controls.subCategories.value
      };
      this.dialogRef.close({ category: updatedCategory });
    }
  }

  onRemoveItem(i: number){
    const subcategoriesArray = <FormArray>this.categoryForm.controls["subCategories"];
    subcategoriesArray.removeAt(i);
  }


}
