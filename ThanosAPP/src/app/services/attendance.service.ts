import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';  // URL de JSONPlaceholder para los usuarios

  constructor(private http: HttpClient) {}

  // 
  registerAttendance(userId: number): Observable<any> {
    const attendanceData = {
      userId: userId,
      timestamp: new Date().toISOString()  // Simular la fecha y hora de asistencia
    };
    
    return this.http.post(this.apiUrl, attendanceData);
  }
}
