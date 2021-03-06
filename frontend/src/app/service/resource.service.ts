import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { RESOURCES_URL } from "../util";

import { Resource } from 'app/model/resource.model';

@Injectable()
export class ResourceService {

  authCreds: string;

  constructor(private http: Http) {
  }

  setAuthHeaders(authCreds: string) {
    this.authCreds = authCreds;
  }

  getResource(id: number) {
    return this.http.get(RESOURCES_URL + '/' + id)
      .map(response => response.json())
      .catch(error => Observable.throw('Server error'))
  }

  getAllResources(type?: string, page?: number) {
    let url = RESOURCES_URL + '?type=' + type + '&page=' + page;
    return this.http.get(url)
      .map(response => response.json().content)
      .catch(error => Observable.throw('Server error'));
  }

  getAllListResources() {
    let url = RESOURCES_URL + '/all';
    return this.http.get(url)
      .map(response => response.json())
      .catch(error => Observable.throw('Server error'));
  }

  getPageResources(page?: number) {
    let url = (page) ? RESOURCES_URL + '?page=' + page : RESOURCES_URL;
    return this.http.get(url)
      .map(response => response.json().content)
      .catch(error => Observable.throw('Server error'));
  }

  searchResources(name: string, page: number) {
    return this.http.get(RESOURCES_URL + '?name=' + name + '&page=' + page)
      .map(response => response.json().content)
      .catch(error => Observable.throw('Server error'));
  }

  updateResource(resource: Resource) {
    let body = JSON.stringify(resource);

    this.authCreds = localStorage.getItem("creds");

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Authorization', 'Basic ' + this.authCreds);

    return this.http.put(RESOURCES_URL + '/' + resource.id, body, { headers: headers })
      .map(response => response.json())
      .catch(error => Observable.throw('Server error'));
  }

  createResource(resource: Resource) {
    let body = JSON.stringify(resource);

    this.authCreds = localStorage.getItem("creds");

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Authorization', 'Basic ' + this.authCreds);
    return this.http.post(RESOURCES_URL, body, { headers: headers })
      .map(response => response.json())
      .catch(error => Observable.throw('Server error'))
  }

  updateFile(formData: FormData, id: number) {
    let headers: Headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + this.authCreds);
    return this.http.put(RESOURCES_URL + '/' + id + '/upload', formData, { headers: headers })
      .map(response => console.log("Success. The file has been successfully added to server directories."))
      .catch(error => Observable.throw('Server error'));
  }

  deleteResource(id: number) {
    this.authCreds = localStorage.getItem("creds");

    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-Requested-With', 'XMLHttpRequest');
    headers.append('Authorization', 'Basic ' + this.authCreds);

    return this.http.delete(RESOURCES_URL + '/' + id, { headers: headers })
      .map(response => response.json())
      .catch(error => Observable.throw('Server error'));
  }

  getResourcesTypes() {
    let url = 'https://localhost:8443/api/resourcetypes';
    return this.http.get(url)
      .map(response => response.json().content)
      .catch(error => Observable.throw('Server error'));
  }
}
