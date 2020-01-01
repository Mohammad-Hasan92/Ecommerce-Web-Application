import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';


const modules = [MatButtonModule];

@NgModule({
    imports: [
        modules
    ],
    exports: [
        modules
    ],

})

export class MaterialModule {}
