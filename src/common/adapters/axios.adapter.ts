import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (err) {
      throw new Error('GET: This is an error message - Check logs');
    }
  }
  async post<T>(url: string, body: any): Promise<T> {
    try {
      const { data } = await this.axios.post<T>(url, body);
      return data;
    } catch (error) {
      throw new Error('POST: This is an error message - Check logs');
    }
  }
  async patch<T>(url: string, body: any): Promise<T> {
    try {
      const { data } = await this.axios.patch<T>(url, body);
      return data;
    } catch (error) {
      throw new Error('PATCH: This is an error message - Check logs');
    }
  }
  async delete<T>(url: string): Promise<T> {
    try {
      await this.axios.delete<T>(url);
      return;
    } catch (error) {
      throw new Error('DELETE: This is an error message - Check logs');
    }
  }
}
