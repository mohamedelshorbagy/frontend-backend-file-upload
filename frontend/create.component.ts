import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {
  image = null;
  loading: boolean = false;
  status: string = '';
  message: string = ''
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }


  chooseFile(event) {
    this.image = event.target.files[0];
  }

  createService(data) {
    const fd = new FormData();
    fd.append('image',this.image);
    fd.append('name', data.value.name);
    this.http.post('/api/service/createService',fd)
      .subscribe(res => {
        this.loading = true;
      if (res['success'] === true) {
        setTimeout(() => {
          this.loading = false;
          this.status = 'success';
          this.message = res['message'];
          this.router.navigate(['/home/services']);
        }, 2000)

      } else {
        this.loading = false;
        this.status = 'error';
        this.message = 'Something Went Wrong!';
      }
      })

  }

}
