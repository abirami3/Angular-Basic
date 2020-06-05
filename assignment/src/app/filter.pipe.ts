import { Pipe, PipeTransform } from '@angular/core';
import { MAT_DRAWER_DEFAULT_AUTOSIZE_FACTORY } from '@angular/material';
@Pipe({
    name: 'filters'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {

        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        let filteredList = [];
       for(let i=0;i<items.length;i++){
           if(items[i]){
            if (items[i]['project_name'].toString().toLowerCase().indexOf(searchText) > -1 ||items[i]['project_manager'].toString().toLowerCase().indexOf(searchText) > -1  )
            {
              filteredList.push(items[i]);
              break;
            }
           }
       }
       console.log(filteredList)
        return filteredList;
    }
}