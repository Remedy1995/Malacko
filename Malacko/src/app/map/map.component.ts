import { Component, OnInit } from '@angular/core';
import { Person } from 'models/person.model';
import { myData } from 'data/data';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor() { }
  person: Person[]=[];//person model
  filteredData:Person[]=[];
  inputtext!:string;
  showText:boolean=false;

         ngOnInit(): void {
          this.person=myData;
           this.filteredData=myData;
           this.person=this.filteredData;
          
        }
       
     get filterText(){
      if(this.inputtext===undefined || this.inputtext===""){
        this.person=this.filteredData;
        this.showText=false;
      }
      return this.inputtext;
    
     }
   
    set filterText(value:string){
    this.inputtext=value;
    console.log(value)
    this.searchByEmail(value);
     }
    
     searchByEmail(variable:string){
      let result= this.filteredData.filter((p:any)=>{
        if((p.gender===variable)===false){
         console.log(this.filteredData)
           this.person=this.filteredData;
           this.showText=true;

        }
        this.showText=false;
       return p.gender===variable; 
       
    })
      console.log(result)
        if(result.length<1){
          this.person=this.filteredData;
          this.showText=true;
        //let clear the array to sero
       }
       else{
        this.person=result;
        this.showText=false;
       }
  }
  
    }
  

